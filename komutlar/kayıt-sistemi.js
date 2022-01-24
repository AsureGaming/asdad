const Discord = require('discord.js');
const botadi = "Ewing"
const ayarlar = require('../ayarlar.json');
let botid = ('784517399314432050')
var prefix = ayarlar.prefix;

exports.run = function(client, message) {
const embed = new Discord.MessageEmbed()
.setColor("BLUE")
.setTitle(`${botadi} | Kayıt Sistemi`)
.setTimestamp()
.addField('Üye Kayıt', `Üyeleri Kayıt Yaparsınız.\nKullanım: **${ayarlar.prefix}üye <@Kişi> <İsim> <Yaş>**`)
.addField('Bayan Kayıt', `Bayanları Kayıt Yaparsınız.\nKullanım: **${ayarlar.prefix}bayan <@Kişi> <İsim> <Yaş>**`)
.addField('Kayıtsız Rol Ayarla', `Kayıtsız Rolünu Ayarlarsınız.\nKullanım: **${ayarlar.prefix}kayıtsız-rol <@rol>**`)
.addField('Kayıtlı Rol Ayarla', `Kayıt Edildikten Sonra Verilen Rolü Ayarlarsınız.\nKulanım: **${ayarlar.prefix}kayıtlı-rol <@rol>**`)
.addField('Yetkili Rol Ayarla', `Kayıtı Yapan Rolu Belirler.\nKullanım: **${ayarlar.prefix}yetkili-rol <@rol>**`)
.setFooter(`${botadi} | Kayıt Sistemi`, client.user.avatarURL)
.setTimestamp()

message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: ['kayıtsistemi', 'kayıt-yardım'], 
  permLevel: 0 
};

exports.help = {
  name: 'kayıt-sistemi',
  description: 'Tüm komutları gösterir.',
  usage: 'yardım'
};