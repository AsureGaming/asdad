const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db');
let botid = ('784517399314432050')
exports.run = async(client, message, args) => {
const balance = await db.fetch(`ktbalance_${message.author.id}_d0ru`)
    const embed = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setAuthor(`${message.author.username} puanın karşında!`, message.author.avatarURL())
        .setDescription(`•               \` ${balance  || 0}\` \n`)
        .setFooter(`${client.user.username} ` + 'Kelime tahmini sistemi', client.user.avatarURL() )
        .setImage('https://cdn.discordapp.com/attachments/833436840790589441/855173045286862868/banner.png')
    return message.channel.send(embed);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['ktpuan'],
  permLevel: 0,
};

exports.help = {
  name: 'kt-puan',
  description: 'd0ru ya aittir aksini iddia edene hakkım haramdır.',
  usage: 'kt-puan'
};