const { Telegraf } = require('telegraf')

// channel token: 5478388041:AAG1TfNj--np-MBOwi5DcIgD-gm9iSKaLsw
// channel id: -1001713291712

const bot = new Telegraf('5478388041:AAG1TfNj--np-MBOwi5DcIgD-gm9iSKaLsw')
bot.command("start", ctx => {
    const startMessage = "Bot xin chào bạn !"
    bot.telegram.sendMessage(ctx.chat.id, startMessage, {
        reply_markup: {
            keyboard: [
                [
                    { text: "Thêm nhóm ➕" },
                    { text: "Xóa nhóm ❌" },
                ],
                [
                    { text: "Gửi tín hiệu 🔔" },
                    { text: "Cài đặt ⚙️" },
                ]
            ],
            resize_keyboard: true
        }
    })
})

bot.hears("Thêm nhóm ➕", ctx => {

    ctx.reply("ok")
})

bot.launch()