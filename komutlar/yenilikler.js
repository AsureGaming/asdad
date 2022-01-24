const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

let botid = ('784517399314432050') //bu yere botun id'sini yapıştırın.
//eğer botunuz dbl(discord bot list) de yoksa Bota Oy Ver (Vote) olmucaktır.

exports.run = (client, message, args) => {
    const embed = new Discord.MessageEmbed()
        .setAuthor(`${client.user.username} `, client.user.avatarURL)
        .setColor('BLUE')
        .setTitle(`${client.user.username} - Yapılan Yenilikler`)
        .setDescription(` **• \`${ayarlar.prefix}yardım\` Menüsü Düzenlendi,Tüm Komutların Açıklaması Eklendi.\n• Ayarlanabilir Kayıt Sistemi Eklendi : \`${ayarlar.prefix}kayıtsistemi\`\n• Bazı Oyunlar Eklendi : \`${ayarlar.prefix}oyunlar\` \n• Bazı Komut Bugları Düzeltildi.\n• Botun Gecikme Süresi Azaltıldı.\n\n• Ewing v0.2 Sürümüyle Karşınızda ${ayarlar.prefix}**`)  
        
.addField(`» Linkler`, `[Bot Davet Linki](https://discord.com/oauth2/authorize?client_id=784517399314432050&scope=bot&permissions=8) **|** [Destek Sunucusu](https://discord.gg/RvPfmr6CCx) **|** [Web Sitemiz](https://ewing.ga/)`)        .setFooter(`Ewing | Bot Sürümü : v0.2 | Varsayılan Prefix : ${ayarlar.prefix}`, client.user.avatarURL)
.setImage('https://cdn.discordapp.com/attachments/833436840790589441/855173045286862868/banner.png')
  return message.channel.send(embed);
  
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yenilikler','yeni'],
  permLevel: 4,
};

exports.help = {
  name: 'yenilik',
  description: '',
  usage: ''
};