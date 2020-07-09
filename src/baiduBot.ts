/*
 * @Descripttion: 百度机器人对接
 * @version: 
 * @Author: wangjunwei
 * @Date: 2020-07-07 13:47:16
 * @LastEditors: wangjunwei
 * @LastEditTime: 2020-07-09 19:20:43
 */ 
var https = require('https');
var request = require("request")
var qs = require('querystring');
const config2 = require('./config.ts')
const myMessage2 = require('./myMessage.ts')

//获取token
const param = qs.stringify({
    'grant_type': 'client_credentials',
    'client_id': config2.baidu_apikey,
    'client_secret': config2.baidu_secretkey
});

var baidutoken = ''
console.log('准备百度token')
async function baiduToken(){
    var baidutoken = await requestToken()
    return baidutoken
}
//baidutoken = baiduToken()

console.log("baidutoken:" + baidutoken)

//请求聊天接口参数准备
var token = qs.stringify({
    'access_token': "24.4c44f0798b8a45186012c9f367e1d151.2592000.1596845829.282335-21168496"
});
var options = {
    hostname: 'aip.baidubce.com',
    path: '/rpc/2.0/unit/service/chat?' + token,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    }
};
console.log("百度bot准备好了")



/**
 * @description: 获取百度token
 * @param 
 * @return {Promise} 
 */
function requestToken(){
    return new Promise((resolve, reject) => {
        var data2 = ''
        var access_token = ''
        https.get(
            {
                hostname: 'aip.baidubce.com',
                path: '/oauth/2.0/token?' + param,
                agent: false
            },
            function (res) {
                res.on('data', (d) => {
                    data2 += d
                    access_token = JSON.parse(data2).access_token
                    console.log(access_token)
                    resolve(access_token)
                })
                // 在标准输出中查看运行结果
                //res.pipe(process.stdout);
            }
        );
    })
}




/**
 * @description: 机聊天器人接口
 * @param {String} info
 * @return {Promise}
 */
module.exports = function requestBot(info){
    return new Promise((resolve, reject) => {
        //resolve("hello test")
        var data = ''
        var rpcResult = ''
        var send = ''
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
                    resolve(send)
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
