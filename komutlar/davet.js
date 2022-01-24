const Discord = require("discord.js");

module.exports.run = async (client, message) => {
  
  const embed = new Discord.MessageEmbed()
    .setColor("BLUE")
    .addField(`Botu Sunucunuza Davet Edin !`, `[Tıkla](https://discord.com/oauth2/authorize?client_id=784517399314432050&scope=bot&permissions=8)`)
.setFooter(client.user.username, client.user.avatarURL())

  message.channel.send(embed);
};

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['davet'],
  permLevel: 0,
  kategori: "sunucu"
};

module.exports.help = {
  name: "davet",
  description: "davet",
  usage: "davet"
};
