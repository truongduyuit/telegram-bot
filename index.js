const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')

const CronJob = require('cron').CronJob;
const SERVER_URL = "https://38c2-171-252-153-5.ngrok.io"
const TOKEN = "5478388041:AAG1TfNj--np-MBOwi5DcIgD-gm9iSKaLsw";
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`
const URI = `/webhook/${TOKEN}`
const WEBHOOK_URL = SERVER_URL + URI

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.text({ defaultCharset: 'utf-8' }))

const init = async () => {
    const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`)
    console.log(res.data)
}

const channelWebhookId = "-1001767668653"
const channels = {
    "-1001713291712": {
        id: "-1001713291712",
        delay: 5000
    },
    "-1001667666076": {
        id: "-1001667666076",
        delay: 10000
    },
}

let isRunJobs = false
let signals = []
let nextSignals = []

app.post(URI, async (req, res) => {
    const tradingviewWebhookText = req.body

    Object.keys(channels).map(channel => {
        if (typeof tradingviewWebhookText === "string") {
            isRunJobs ? nextSignals.push({
                channelId: channels[channel].id,
                createdAt: Date.now(),
                message: tradingviewWebhookText
            }) : signals.push({
                channelId: channels[channel].id,
                createdAt: Date.now(),
                message: tradingviewWebhookText
            })
        } else {
            const { chat, text } = req.body.channel_post;
            if (chat.id.toString() === channelWebhookId) {
                isRunJobs ? nextSignals.push({
                    channelId: channels[channel].id,
                    createdAt: Date.now(),
                    message: text
                }) : signals.push({
                    channelId: channels[channel].id,
                    createdAt: Date.now(),
                    message: text
                })
            }
        }
    })

    return res.send()
})

const job = new CronJob(
    // '* * * * * *',
    '*/5 * * * * *',
    async function () {
        isRunJobs = true
        console.log("cron start: ", signals.length)
        await Promise.all(signals.map(async s => {
            const { channelId, createdAt, message } = s
            const { delay } = channels[channelId]

            try {
                if (Date.now() - createdAt >= delay) {
                    await axios.post(`${TELEGRAM_API}/sendMessage`, {
                        chat_id: channelId,
                        text: message
                    })
                } else {
                    nextSignals.push(s)
                }

            } catch (error) {
                nextSignals.push(s)
            }
        }))

        signals = nextSignals
        nextSignals = []
        isRunJobs = false
    },
    null,
    true,
    'America/Los_Angeles'
);

job.start()

app.listen(process.env.PORT || 5000, async () => {
    console.log('🚀 app running on port', process.env.PORT || 5000)
    await init()
})