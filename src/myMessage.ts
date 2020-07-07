/*
 * @Descripttion: 
 * @version: 
 * @Author: wangjunwei
 * @Date: 2020-07-05 08:28:46
 * @LastEditors: wangjunwei
 * @LastEditTime: 2020-07-07 10:26:25
 */ 

const { Message } = require("wechaty")
// node-request请求模块包
const request = require("request")
// 请求参数解码
const urlencode = require("urlencode")

module.exports = bot =>{
    return async function myMessage(msg){
        if (msg.self()) return

        console.log("=============================")
        console.log(`msg : ${msg}`)
        console.log(
            `from: ${msg.from() ? msg.from().name() : null}: ${
            msg.from() ? msg.from().id : null
            }`
        )
        console.log(`to: ${msg.to()}`)
        console.log(`text: ${msg.text()}`)
        //console.log(`isRoom: ${msg.room()}`)
        console.log("=============================")


        if (msg.type() == Message.Type.Text) {
            await msg.say("reply test by myBot")
        }
    }

}