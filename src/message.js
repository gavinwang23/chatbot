const { Message } = require("wechaty")
const { postMsgToBot } = require("./baiduBot")

async function myMessage(bot, msg){
    if (msg.self()) return

    console.log("======================================================================")
    console.log(`from: ${ msg.talker() }`)
    console.log(`to: ${ msg.to() }`)
    console.log(`text: ${ msg.text() }`)
    console.log("======================================================================")

    if (msg.type() == bot.Message.Type.Text && !msg.room()) {
        await postMsgToBot(msg.text(), callback => {
            console.log(callback)
            msg.say(callback)
        })
        // msg.say(res)
    }
}

module.exports = {
    myMessage
}
