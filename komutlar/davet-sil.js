const Discord = require("discord.js");
const db = require("quick.db");
let botid = ('784517399314432050')
module.exports.run = async (bot, message, args) => {
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "e?";
  if (!message.member.hasPermission("KICK_MEMBERS")) {
    const embed = new Discord.MessageEmbed()
      .setDescription("```Ne yazık ki bu komutu kullanmaya yetkin yok.```")
      .setColor("BLUE")
.setFooter(bot.user.username, bot.user.avatarURL())
    message.channel.send(embed);
    return;
  }

  let u = message.mentions.users.first();
let m = args.slice(1).join(" ")
  if (!u) {
    return message.channel.send(
      new Discord.MessageEmbed()
        .setDescription("Lütfen daveti silinecek kişiyi etiketleyiniz!")
        .setColor("BLUE")
      .setFooter(bot.user.username, bot.user.avatarURL())
    );
  }
    if (!m) {
    return message.channel.send(
      new Discord.MessageEmbed()
        .setDescription("Lütfen silinecek davet sayısını giriniz.")
        .setColor("BLUE")
      .setFooter(bot.user.username, bot.user.avatarURL())
    );
  }
  const embed = new Discord.MessageEmbed()
    .setColor("BLUE")
    .setDescription(`${u} Adlı şahstan; ${m} davet silindi!`)
  .setFooter(bot.user.username, bot.user.avatarURL())
  message.channel.send(embed);

  db.add(`davet_${message.author.id}_${message.guild.id}`, -m);
};

module.exports.conf = {
  aliases: ["davetsil"],
  permLevel: 2,
  enabled: true,
  guildOnly: true,
  kategori: "moderasyon"
};

module.exports.help = {
  name: "davet-sil",
  description: "davet-sil",
  usage: "davet-sil"
};
