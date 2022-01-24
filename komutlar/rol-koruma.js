const db = require("quick.db");
const Discord = require("discord.js");
let botid = ('784517399314432050')
exports.run = async (client, message, args) => {
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "e?";
let kanal = message.mentions.channels.first()
if(!kanal){
  const embed = new Discord.MessageEmbed()
    .setColor("BLUE")
  .setFooter(client.user.username, client.user.avatarURL)
  .setDescription(`Lütfen log kanalını etiketleyiniz!`)
  message.channel.send(embed)
  return
}
  db.set(`rolk_${message.guild.id}`, kanal.id)
  const embed = new Discord.MessageEmbed()
  .setColor("BLUE")
  .setFooter(client.user.username, client.user.avatarURL)
  .setDescription(`Log kanalı; ${kanal} olarak ayarlandı!`)
  .setImage('https://cdn.discordapp.com/attachments/833436840790589441/855173045286862868/banner.png')
  message.channel.send(embed)
  return
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["rol-k"],
  permLevel: 3,
  kategori: "sunucu"
};

exports.help = {
  name: "rol-koruma",
  description: "Rol koruma",
  usage: "rol-koruma"
};