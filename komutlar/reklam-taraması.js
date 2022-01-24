const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
let botid = ('784517399314432050')
exports.run = (bot, message, args) => {
  
  if (!message.member.hasPermission("KICK_MEMBERS")) {const embed = new Discord.MessageEmbed()
  .setDescription(`Ne yazık ki bu komutu kullanmaya yetkin yok.`)
 .setColor("BLUE")
   .setFooter(bot.user.username, bot.user.avatarURL())
  
message.channel.send(embed)  
  return }

    const members = message.guild.members.cache.filter(member => member.user.presence.activites && /(FREE|Free|free|DM|.gg|www.|.xyz|discord|http|.com|.net|.org|invite|İnstagram|Facebook|watch|Youtube|youtube|facebook|instagram)/g.test(member.user.presence.activites.name));
    const memberss = message.guild.members.cache.filter(member => member.user.username && /(FREE|Free|free|.gg|DM|discord|http|.com|.net|.org|invite|İnstagram|Facebook|watch|Youtube|youtube|facebook|instagram)/g.test(member.user.username));
    const embed = new Discord.MessageEmbed()
        .addField('Oynuyor Mesajında reklam olanlar', members.map(member => `${member} = ${member.user.presence.activites.name}`).join("\n") || "Yok!")
        .addField('Kullanıcı adında reklam olanlar', memberss.map(member => `${member} = ${member.user.username}`).join("\n") || "Yok!")
        .setColor("BLUE")
             .setFooter(bot.user.username, bot.user.avatarURL())
             .setImage('https://cdn.discordapp.com/attachments/833436840790589441/855173045286862868/banner.png')
    message.channel.send({embed})
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['reklam-ara', 'reklamara', 'reklamtaraması'],
    permLevel: 1,
  kategori: 'moderasyon'
}

exports.help = {
    name: 'reklam-taraması',
    description: 'Kullanıcıların oynuyorlarını denetler.',
    usage: 'reklam-taraması'
}