const Discord = require("discord.js");
const db = require("quick.db");
let botid = ('784517399314432050')
module.exports.run = async (client, message, args) => {
  let prefix = args.slice(0).join(" ");
  if (!prefix) {
    const embed = new Discord.MessageEmbed()
      .setColor("BLUE")
      .setDescription(`Lütfen bir prefix belirtiniz!`)
      .setImage('https://cdn.discordapp.com/attachments/833436840790589441/855173045286862868/banner.png')
      .setFooter(client.user.username, client.user.avatarURL);

    message.channel.send(embed);
    return;
  }
  const embed = new Discord.MessageEmbed()
      .setColor("BLUE")
      .setDescription(`Prefix; \`${prefix}\` olarak ayarlandı!`)
      .setImage('https://cdn.discordapp.com/attachments/833436840790589441/855173045286862868/banner.png')
      .setFooter(client.user.username, client.user.avatarURL);

    message.channel.send(embed);
  db.set(`prefix_${message.guild.id}`, prefix)
};

module.exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 3,
  kategori: "sunucu"
};

module.exports.help = {
  name: "prefix",
  description: "prefix",
  usage: "prefix"
};
