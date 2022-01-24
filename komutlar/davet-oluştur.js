const Discord = require(`discord.js`)
let botid = ('784517399314432050')
exports.run = async (bot, message, args) => {
  try {
    let invite = await message.channel.createInvite({
      maxAge: args.age * 60,
      maxUses: args.uses
    });
      const sunucubilgi = new Discord.MessageEmbed()
    .setColor("BLUE")
    .setTimestamp()
        .setDescription(`Davet kodu oluşturuldu! (https://discord.gg/${invite.code})`)
      .setFooter(bot.user.username, bot.user.avatarURL())
    return message.channel.send(sunucubilgi).catch(e => {
return
    });
  }
  catch (e) {
return
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['davetoluştur'],
  permLevel: 0
};

exports.help = {
  name: 'davet-oluştur',
  description: 'davet-oluştur',
  usage: 'davet-oluştur'
};