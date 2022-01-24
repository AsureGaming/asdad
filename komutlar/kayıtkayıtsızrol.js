const Discord = require('discord.js')
const db = require('quick.db');
let botid = ('784517399314432050')
exports.run = async (client, message, args) => {
  
   if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new Discord.MessageEmbed()
                                                                                 .setColor("BLUE")
                                                                            .setTitle(`İzin Hatası`)
                                                                      .setDescription('Bu komutu kullanmak için `Yönetici` iznine sahip olmanız gerekir.'))
                                                                                   
if(args[0] === "kapat") {
db.delete(`kayıtsızrol_${message.guild.id}`)
  message.channel.send(new Discord.MessageEmbed()
                      .setColor('BLUE')
                      .setDescription(`Kayıtsız Rolü Başarıyla Kapatıldı!`))

} else {
  let kayıtsızrol = message.mentions.roles.first() || message.guild.roles.cache.get(args.join(' '))
let ilkRole;
  let ikirole;
  if (!kayıtsızrol) return message.channel.send(new Discord.MessageEmbed()
                                              .setColor('BLUE')
                                              .setDescription(`Kayıtsız Rolünü Belirlemelisiniz.`))
  else ilkRole = message.mentions.roles.first().id
  let kayıtszrol = await db.set(`kayıtsızrol_${message.guild.id}`, ilkRole)
  if (!message.guild.roles.cache.get(ilkRole)) return message.channel.send(new Discord.MessageEmbed()
                                              .setColor('BLUE')
                                              .setDescription(`Etiketlediğiniz Rol Bulunamadı.\nEtiketlediğiniz Rolün Etiketlenebilirliğinin Aktif Olduğundan Emin Olunuz..`))

 message.channel.send(new Discord.MessageEmbed()
                      .setColor('BLUE')
                      .addField('Durum', `:white_check_mark: Başarılı!`)
                      .addField(`Ayarlanan Kayıtsız Rolü`, `${kayıtsızrol}`)
                      .addField(`Rolü Ayarlayan`, `<@${message.author.id}>`)
                      .setTimestamp())
}}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['kayitsiz-rol', 'kayıtsızrol', 'kayıtsız-rol'],
    permLevel: 0
}

exports.help = {
    name: 'kayıtsız-rol',
    description: 'Sunucuya Yeni Gelen Üyeye Verilecek Rolü Belirler.',
    usage: 'kayıtsız-rol'
}
