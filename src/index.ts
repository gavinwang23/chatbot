/*
 * @Descripttion: 
 * @version: 
 * @Author: wangjunwei
 * @Date: 2020-07-04 21:05:33
 * @LastEditors: wangjunwei
<<<<<<< HEAD
 * @LastEditTime: 2020-07-06 11:02:49
=======
 * @LastEditTime: 2020-07-06 16:13:43
>>>>>>> 4c97b7e8675fb1b0d0196fdf4adb5e2f49d85c86
 */ 

//import { Wechaty } from 'wechaty'
const { Wechaty } = require('wechaty')
//import { PuppetPadplus } from 'wechaty-puppet-padplus'
const { PuppetPadplus } = require('wechaty-puppet-padplus')
<<<<<<< HEAD
const config = require('./config')
=======
//const config = require('./config.ts')
>>>>>>> 4c97b7e8675fb1b0d0196fdf4adb5e2f49d85c86
let token = "puppet_padplus_0d3505e8f7001abe"

const bot = new Wechaty({
    puppet: new PuppetPadplus({
      token: token
    }),
    name: "俊伟"
  })
  

//Wechaty.instance()
bot
.on('scan', (qrcode, status) => console.log(`Scan QR Code to login: ${status}\nhttps://wechaty.github.io/qrcode/${encodeURIComponent(qrcode)}`))
.on('login',            user => console.log(`User ${user} logined`))
.on('message',       message => console.log(`Message: ${message}`))
.start()