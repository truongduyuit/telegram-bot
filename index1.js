const { Telegraf } = require('telegraf')

// channel token: 5478388041:AAG1TfNj--np-MBOwi5DcIgD-gm9iSKaLsw

// channel 1 id: -1001713291712
// channel 2 id: -1001767668653

const channelIds = ["-1001713291712", "-1001767668653"]

const bot = new Telegraf('5478388041:AAG1TfNj--np-MBOwi5DcIgD-gm9iSKaLsw')
bot.telegram.getUpdates(1000, 10, 0).then(data => console.log(data[0]))
bot.launch();


// bot.command("send", (ctx) => {
//     const { text } = ctx.message
//     const message = text.split("/send")[1]

//     for (let i = 0; i < channelIds.length; i++) {
//         if (ctx.updateType === "message") {
//             bot.telegram.sendMessage(channelIds[i], message)
//         } else {
//             bot.telegram.sendMessage(channelIds[i], message)
//         }
//     }
// })


// bot.command("start", ctx => {
//     const startMessage = "Bot xin chào bạn !"
//     bot.telegram.sendMessage(ctx.chat.id, startMessage, {
//         reply_markup: {
//             keyboard: [
//                 [
//                     { text: "Thêm nhóm ➕" },
//                     { text: "Xóa nhóm ❌" },
//                 ],
//                 [
//                     { text: "Gửi tín hiệu 🔔" },
//                     { text: "Cài đặt ⚙️" },
//                 ]
//             ],
//             resize_keyboard: true
//         }
//     })
// })

// bot.hears("Thêm nhóm ➕", ctx => {

//     ctx.reply("ok")
// })