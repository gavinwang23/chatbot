/*
 * @Descripttion: 
 * @version: 
 * @Author: wangjunwei
 * @Date: 2020-07-04 21:05:33
 * @LastEditors: wangjunwei
 * @LastEditTime: 2020-07-06 23:07:58
 */ 

//import { Wechaty } from 'wechaty'
const { Wechaty } = require('wechaty')
//import { PuppetPadplus } from 'wechaty-puppet-padplus'
const { PuppetPadplus } = require('wechaty-puppet-padplus')
//const config = require('./config.ts')
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