const Discord = require("discord.js");
const db = require("quick.db");
let botid = ('784517399314432050')
module.exports.run = async (bot, message, args) => {
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "e?";

  const embed = new Discord.MessageEmbed()
    .setColor("BLACK")
    .setDescription(`Davetleriniz stoklandı!`)
  .setFooter(bot.user.username, bot.user.avatarURL())
  message.channel.send(embed);
//HAVASI YOK BUNUN
};

module.exports.conf = {
  aliases: ["davetstokla"],
  permLevel: 0,
  enabled: true,
  guildOnly: true,
  kategori: "moderasyon"
};

module.exports.help = {
  name: "davet-stokla",
  description: "davet-stokla",
  usage: "davet-stokla"
};
