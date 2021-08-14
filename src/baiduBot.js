var https = require('https')
var qs = require('querystring')

const param = qs.stringify({
    'grant_type': 'client_credentials',
    'client_id': 'H6PR2Rl8I9GLt6igymw1O4HA',
    'client_secret': 'mGoHw0vvUG3yHyEHlsQHZQlhrY1Uy6YM'
});

// 获取token
async function getToken() {
    https.get({
        hostname: 'aip.baidubce.com',
        path: `/oauth/2.0/token?${param}`,
        agent: false
      }, (res) => {
        res.on('data', (data) => {
            console.log(data.toString())
            return data.toString().access_token
        })
      });
}

// 对话服务
async function postMsgToBot(msg, callback) {
    var param = qs.stringify({
        'access_token': '24.51b6ba30b4593cb34c627f8e8c007099.2592000.1631516865.282335-24697814'
    });
    var req = https.request({
        hostname: 'aip.baidubce.com',
        path: `/rpc/2.0/unit/service/v3/chat?${param}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    }, (res) => {
        res.on('data', (data) => {
            data = JSON.parse(data)
            const resMsg = data.result.context.SYS_PRESUMED_HIST[1]
            callback(resMsg)
        })
    })
    var postData = {
        'version': '3.0',
        'service_id': 'S56653',
        'session_id': '',
        'log_id': 'UNITTEST_10000',
        'request': {
            'query': msg,
            'terminal_id': '88888'
        }
    };
    // 携带数据发送https请求
    req.write(JSON.stringify(postData));
    req.end();
}

module.exports = {
    postMsgToBot
}
