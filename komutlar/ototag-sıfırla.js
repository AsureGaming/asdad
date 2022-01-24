const Discord = require("discord.js");
const db = require("quick.db");
let botid = ('784517399314432050')
module.exports.run = async (bot, message, args) => {
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "e?";
  if (!message.member.hasPermission("KICK_MEMBERS")) {
    const embed = new Discord.MessageEmbed()
      .setDescription(`Ne yazık ki bu komutu kullanmaya yetkin yok.`)
      .setColor("BLUE");

    message.channel.send(embed);
    return;
  }
let role = await db.fetch(`ototag_${message.guild.id}`);
  if (!role) {
    return message.channel.send(
      new Discord.MessageEmbed()
        .setDescription(`Ototag zaten ayarlanmamış!`)
        .setColor("BLUE")
    );
  }

  const embed = new Discord.MessageEmbed()
    .setColor("BLUE")
    .setDescription(`Ototag başarıyla sıfırlandı!`);
  message.channel.send(embed);

  db.delete(`ototagk_${message.guild.id}`);
  db.delete(`ototag_${message.guild.id}`);
    db.delete(`ototagmsj_${message.guild.id}`);
};

module.exports.conf = {
  aliases: ["ototag sıfırla"],
  permLevel: 2,
  enabled: true,
  guildOnly: true,
  kategori: "moderasyon"
};

module.exports.help = {
  name: "oto-tag-sıfırla",
  description: "Etiketlenen şahsa etiketlenen rolü alırsınız.",
  usage: "oto-tag"
};
