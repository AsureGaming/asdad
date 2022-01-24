const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

let botid = ('784517399314432050') //bu yere botun id'sini yapıştırın.
//eğer botunuz dbl(discord bot list) de yoksa Bota Oy Ver (Vote) olmucaktır.

exports.run = (client, message, args) => {
    const embed = new Discord.MessageEmbed()
        .setAuthor(`${client.user.username} `, client.user.avatarURL)
        .setColor('BLUE')
        .setTitle(`${client.user.username} - Yardım Menüsü`)
        
        .setDescription(` • | **${ayarlar.prefix}davetsistemi** : Davet Sistemi Hakkında Bütün Bilgileri Listelersiniz.\n • | **${ayarlar.prefix}moderasyon** : Yetkililerin Kullanabileceği Komutları Listelersiniz.\n • | **${ayarlar.prefix}sistem** : Kullanabileceğiniz Gelişmiş Sistem Komutlarını Listelersiniz.\n • | **${ayarlar.prefix}bot** : Bot Hakkında Ve Diğer Kategori Komutlarını Görürsünüz.\n • | **${ayarlar.prefix}premium** : Premium Komutlarını Listelersiniz.\n • | **${ayarlar.prefix}oyunlar** : \`( YENİ )\`Discord Üzerinden Oynanabilen Basit Oyunları Listelersiniz.\n • | **${ayarlar.prefix}kayıtsistemi** : \`( YENİ )\`Ayarlanabilir Gelişmiş Kayıt Sisteminin Komutlarını Listelersiniz.`)  
        .addField(`» Linkler`, `[Bot Davet Linki](https://discord.com/oauth2/authorize?client_id=784517399314432050&scope=bot&permissions=8) **|** [Destek Sunucusu](https://discord.gg/RvPfmr6CCx) **|** [Web Sitemiz](https://ewing.ga/)`)
        .setFooter(`Ewing | Bot Sürümü : v4.4.4 | Varsayılan Prefix : ${ayarlar.prefix}`, client.user.avatarURL)
        .setImage('https://cdn.discordapp.com/attachments/833436840790589441/855173045286862868/banner.png')
    return message.channel.send(embed);
  
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yardım','y','help','h'],
  permLevel: 0,
};

exports.help = {
  name: 'yardım',
  description: '',
  usage: ''
};