const { Wechaty } = require('wechaty')
const { myMessage } = require('./message')

async function main () {
  const bot = new Wechaty()
  bot
    .on('scan', (qrcode, status) => console.log(`Scan QR Code to login: ${status}\nhttps://wechaty.js.org/qrcode/${encodeURIComponent(qrcode)}`))
    .on('login',            user => console.log(`User ${user} logged in`))
    // .on('message',       message => console.log(`Message: ${message}`))
    .on('message',       message => myMessage(bot, message))
  await bot.start()
}

main()
  .catch(console.error)