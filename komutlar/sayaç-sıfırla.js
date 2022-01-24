const Discord = require("discord.js");
const db = require("quick.db");
let botid = ('784517399314432050')
module.exports.run = async (bot, message, args) => {
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "e?";
  if (!message.member.hasPermission("KICK_MEMBERS")) {
    const embed = new Discord.MessageEmbed()
      .setDescription(`Ne yazık ki bu komutu kullanmaya yetkin yok.`)
      .setColor("BLUE")
      .setFooter(bot.user.username, bot.user.avatarURL())

    message.channel.send(embed);
    return;
  }

  let kontrol = await db.fetch(`sayaçhedef_${message.guild.id}`);

  if (!kontrol) {
    const embed = new Discord.MessageEmbed()
        .setDescription(`Sayaç zaten ayarlanmamış!`)
        .setColor("BLUE")
      .setFooter(bot.user.username, bot.user.avatarURL())
     message.channel.send(embed);
    return
  }
else{
  message.channel.send(
    new Discord.MessageEmbed()
      .setDescription(`Sayaç başarıyla sıfırlandı!`)
      .setColor("BLUE")
      .setFooter(bot.user.username, bot.user.avatarURL())
      .setImage('https://cdn.discordapp.com/attachments/833436840790589441/855173045286862868/banner.png')
  );
  db.delete(`sayaçhedef_${message.guild.id}`);
  db.delete(`sayaçkanal_${message.guild.id}`);
}
};

module.exports.conf = {
  aliases: ["sayaç sıfırla"],
  permLevel: 2,
  enabled: true,
  guildOnly: true,
  kategori: "moderasyon"
};

module.exports.help = {
  name: "sayaç-sıfırla",
  description: "Etiketlenen şahsa etiketlenen rolü alırsınız.",
  usage: "oto-rol"
};
