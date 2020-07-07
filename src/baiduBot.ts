/*
 * @Descripttion: 
 * @version: 
 * @Author: wangjunwei
 * @Date: 2020-07-07 13:47:16
 * @LastEditors: wangjunwei
 * @LastEditTime: 2020-07-07 16:15:56
 */ 
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
var data = ''
var rpcResult = ''
var req = https.request(
    options,
    function (res) {
        // 在标准输出中查看运行结果
        //res.pipe(process.stdout);
        //let resu = JSON.parse(body);
        //console.log(res.write)
        //console.log('请求头:', res.headers);
        //console.log('data:', process.stdout);
        res.on('data', (d) => {
            //process.stdout.write(d);
            data += d
            //console.log(JSON.parse(d))
          })
        //console.log(JSON.parse(data))
        res.on('end',function(){
            rpcResult = JSON.parse(data)
            //console.log(data)
            //console.log(rpcResult)
            let x1=rpcResult.result.response_list
            
            console.log(rpcResult.result.response_list) //从这里取出来
        })
    }
    //return 
);
var postData = {
    'log_id': 'UNITTEST_10000',
    'version': '2.0',
    'service_id': 'S31458',
    'session_id': '',
    'request': {
        'query': '你好',
        'user_id': '88888'
    }
};
// 携带数据发送https请求
req.write(JSON.stringify(postData));
//let send = req()
//console.log(res.data)
req.end();