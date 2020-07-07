/*
 * @Descripttion: 
 * @version: 
 * @Author: wangjunwei
 * @Date: 2020-07-05 08:28:46
 * @LastEditors: wangjunwei
 * @LastEditTime: 2020-07-07 21:45:18
 */ 

const { Message } = require("wechaty")
// node-request请求模块包
//const request = require("request")
// 请求参数解码
const urlencode = require("urlencode")
const baiduBot = require('./baiduBot.ts')
//import baiduBot from './baiduBot.ts'
var https = require('https');
var request = require("request")
var qs = require('querystring');
var param = qs.stringify({
    'access_token': '24.0656ee5c202b325588145f78fe24430b.2592000.1596689746.282335-21168496'
});
var options = {
    hostname: 'aip.baidubce.com',
    path: '/rpc/2.0/unit/service/chat?' + param,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    }
};

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
        console.log(`isRoom: ${msg.room()}`)
        console.log("=============================")


        if (msg.type() == Message.Type.Text && !msg.room()) {
            let res = await requestRobot(msg.text())
            //await msg.say("reply test by myBot")
            await msg.say(res)
        }   
    }

}








/**
 * @description: 机聊天器人接口2
 * @param {String} info
 * @return {Promise}
 */
function requestRobot(info){
    return new Promise((resolve, reject) => {
        //resolve("hello test")
        var data = ''
        var rpcResult = ''
        var send = '1'
        var req = https.request(
            options,
            function (res) {
                res.on('data', (d) => {
                    data += d
                })
                //console.log(JSON.parse(data))
                res.on('end',function(){
                    rpcResult = JSON.parse(data)
                    //console.log(data)
                     //console.log(rpcResult)
                    send=rpcResult.result.response_list[0].action_list[0].say
                    //打印回复的消息
                    //console.log(send)
                    resolve(send+"___Send by MyBot")
                })
                req.on('error',function (e){
                    console.log(new Error('problem with request:' + e.message));
                })
            }
     
        );
        var postData = {
            'log_id': 'UNITTEST_10000',
            'version': '2.0',
            'service_id': 'S31458',
            'session_id': '',
            'request': {
                'query': info,
                'user_id': '88888'
            }
        };
        // 携带数据发送https请求
        req.write(JSON.stringify(postData));
        req.end();
        //console.log(send)
    })
}