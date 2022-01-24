const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

let botid = ('784517399314432050') //bu yere botun id'sini yapıştırın.
//eğer botunuz dbl(discord bot list) de yoksa Bota Oy Ver (Vote) olmucaktır.

exports.run = (client, message, args) => {
    const embed = new Discord.MessageEmbed()
        .setAuthor(`${client.user.username} `, client.user.avatarURL)
        .setColor('BLUE')
        .setTitle(`${client.user.username} - Bot Satın Alma Yardım Menüsü`)
        .setDescription(` • | • Merhabalar, Sizlere 2 Senelik Tecrübe Sunuyoruz !\n\n  • | • Sizde Discord Botu Satın Almak İstiyorsanız **e?canlıdestek** yazarak veya destek sunucumuza gelerek bizimle iletişim kurabilirsiniz.\n\n • | • Fiyatlar İçin Sitemize Göz Atın : [SİTEMİZ](https://ewing.ga/)\n`)  
        
        .addField(`» Linkler`, `[Bot Davet Linki](https://discord.com/oauth2/authorize?client_id=784517399314432050&scope=bot&permissions=8) **|** [Destek Sunucusu](https://discord.gg/RvPfmr6CCx) **|** [Web Sitemiz](https://ewing.ga/)`)//websiteniz yoksa  **|** [Web Sitesi]() yeri silebilirsiniz
        .setFooter(`${message.author.username} Tarafından İstendi.`, message.author.avatarURL())
        .setImage('https://cdn.discordapp.com/attachments/833436840790589441/855173045286862868/banner.png')
    return message.channel.send(embed);
  
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['satınal'],
  permLevel: 0,
};

exports.help = {
  name: 'diskoyardım',
  description: '',
  usage: ''
};