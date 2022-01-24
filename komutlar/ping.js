const Discord = require("discord.js");
let botid = ('784517399314432050')
module.exports.run = async (client, message) => {
  
  const embed = new Discord.MessageEmbed()
    .setColor("BLUE")
    .addField(`Ping`, "5 ms")
    .setImage('https://cdn.discordapp.com/attachments/833436840790589441/855173045286862868/banner.png')
.setFooter(client.user.username, client.user.avatarURL)

  message.channel.send(embed);
};

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  kategori: "sunucu"
};

module.exports.help = {
  name: "ping",
  description: "ping",
  usage: "ping"
};
