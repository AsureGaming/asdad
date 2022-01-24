const Discord = require("discord.js");
const db = require("quick.db");
let botid = ('784517399314432050')
module.exports.run = async (bot, message, args) => {
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "e?";
  if (!message.member.hasPermission("KICK_MEMBERS")) {
    const embed = new Discord.MessageEmbed()
      .setDescription(`Ne yazık ki bu komutu kullanmaya yetkin yok.`)
      .setColor("BLUE")
      .setFooter(bot.user.username, bot.user.avatarURL());

    message.channel.send(embed);
    return;
  }
  let rMember =
    message.guild.member(message.mentions.users.first()) ||
    message.guild.members.cache.get(args[0]);
  if (!rMember)
    return message.channel.send(
      new Discord.MessageEmbed()
        .setDescription(
          `Lütfen bir kullanıcı giriniz!\nÖrnek: ${prefix}rol-al <@Kullanıcı> <Rol>`
        )
        .setFooter(bot.user.username, bot.user.avatarURL())
        .setColor("BLUE")
    );
  let role =
    message.mentions.roles.first() ||
    message.guild.roles.cache.find(rol => rol.name === args[1]);

  if (!role)
    return message.channel.send(
      new Discord.MessageEmbed()
        .setDescription(
          `Lütfen bir rol belirtiniz!\nÖrnek: ${prefix}rol-al <@Kullanıcı> <Rol>`
        )
        .setFooter(bot.user.username, bot.user.avatarURL())
        .setColor("BLUE")
    );
  if (!rMember.roles.cache.has(role.id))
    return message.channel.send(
      new Discord.MessageEmbed()
        .setDescription("Kullanıcı zaten bu role sahip değil!")
        .setColor("BLUE")
        .setFooter(bot.user.username, bot.user.avatarURL())
    );
  await rMember.roles.remove(role.id);
  message.channel.send(
    new Discord.MessageEmbed()
      .setDescription(
        `${rMember} adlı şahıstan \`${role.name}\` adlı rol alındı!`
      )
      .setColor("BLUE")
      .setFooter(bot.user.username, bot.user.avatarURL())
      .setImage('https://cdn.discordapp.com/attachments/833436840790589441/855173045286862868/banner.png')
  );
};

module.exports.conf = {
  aliases: ["rolal"],
  permLevel: 2,
  enabled: true,
  guildOnly: true,
  kategori: "moderasyon"
};

module.exports.help = {
  name: "rol-al",
  description: "rol-al",
  usage: "rol-al"
};
