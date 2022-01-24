const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

let botid = ('784517399314432050') //bu yere botun id'sini yapıştırın.
//eğer botunuz dbl(discord bot list) de yoksa Bota Oy Ver (Vote) olmucaktır.

exports.run = (client, message, args) => {
    const embed = new Discord.MessageEmbed()
        .setAuthor(`${client.user.username} `, client.user.avatarURL)
        .setColor('BLUE')
        .setTitle(`${client.user.username} - Bot Komutları Listesi`)
        .setDescription(` • | **${ayarlar.prefix}bot-bilgi** : Botun Bilgilerini Listelersiniz.\n • | **${ayarlar.prefix}** : Sunucudaki Yetkili Ekibiyle Özel Olarak Oda Oluşturursunuz.\n • | **${ayarlar.prefix}yapımcım** : Kodlayan Yapımcıyı ve YouTube Kanalını Görürsünüz.\n • | **${ayarlar.prefix}satınal** : Bot Satın Almak İçin Paneli Görüntülersiniz.\n`)  
        .addField(`» Linkler`, `[Bot Davet Linki](https://discord.com/oauth2/authorize?client_id=784517399314432050&scope=bot&permissions=8) **|** [Destek Sunucusu](https://discord.gg/RvPfmr6CCx) **|** [Web Sitemiz](https://ewing.ga/)`)
        .setFooter(`Ewing | Bot Sürümü : v4.4.4 | Varsayılan Prefix : ${ayarlar.prefix}`, client.user.avatarURL)
        .setImage('https://cdn.discordapp.com/attachments/833436840790589441/855173045286862868/banner.png')
    return message.channel.send(embed);
  
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['bot'],
  permLevel: 0,
};

exports.help = {
  name: 'bot',
  description: '',
  usage: ''
};