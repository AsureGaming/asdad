const Discord = require("discord.js");

module.exports.run = async (client, message) => {
  
  const embed = new Discord.MessageEmbed()
    .setColor("BLUE")
    .addField(`Sitemizi İnceleyin !`, `[Tıkla](https://gullubot.ga)`)
    .setImage('https://cdn.discordapp.com/attachments/833436840790589441/855173045286862868/banner.png')
.setFooter(client.user.username, client.user.avatarURL)

  message.channel.send(embed);
};

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['site'],
  permLevel: 0,
  kategori: "sunucu"
};

module.exports.help = {
  name: "site",
  description: "site",
  usage: "site"
};
