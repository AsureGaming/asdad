const moment = require('moment')
const Discord = require('discord.js')
module.exports = client => {
  
  const aktiviteListesi = [
`Life with Ewing beautiful!`,
`Hayat Ewing ile güzel!`,
`Davet Sistemi!✨`,
`Moderasyon Sistemi!✨`,
`Otorol Sistemi!✨`,
`Oyun Sistemi!✨`,
`Premium Sistemi!✨`,
`Sistem Sistemi!✨`,
`Koruma Sistemi!✨`,
`Ototag Sistemi!✨`,
`Sayaç Sistemi!✨`,
`Version: v4.4.4⭐`
  ]

  client.user.setStatus('online')

  setInterval(() => {
    const Aktivite = Math.floor(Math.random() * (aktiviteListesi.length - 1))
    client.user.setActivity(aktiviteListesi[Aktivite])
  }, 6000)
   console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Oyun ismi ayarlandı!`);
}