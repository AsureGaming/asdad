const Discord = require('discord.js');
let botid = ('784517399314432050')
exports.run = (client, message, args) => {
 message.delete();
    message.guild.channels.create(`talep-${message.author.username}`, 'text').then(ch => {
        ch.createOverwrite(message.member.roles.first(),{
            VIEW_CHANNEL: false,
        }).catch()
        message.guild.roles.cache.forEach((role) => {
            if (role.hasPermission("KICK_MEMBERS")) {
                ch.createOverwrite(role,{
                    VIEW_CHANNEL: true,
                }).catch()
                ch.createOverwrite(message.author.id,{
                    VIEW_CHANNEL: true,
                }).catch()
            }
        })
        const embed = new Discord.MessageEmbed()
        .setTitle(`» Hey ${message.author.username} !`)
        .setAuthor("» Ewing | Destek Sistemi")
        .setDescription("**Yetkili Arkadaşlar Sizinle İlgilenecektir.\nDestek Talebini İptal Etmek İçin \`[e?kapat]\` Yazabilirsin!**")
        .setFooter(' Ewing | Destek Sistemi', client.user.avatarURL)
        .setImage('https://cdn.discordapp.com/attachments/833436840790589441/855173045286862868/banner.png')
        .setTimestamp()
        ch.send(embed).catch()
        ch.send("@everyone")
        ch.send("@here")
        ch.awaitMessages((msg)=> {
            if (msg.content === "e?kapat") {
                ch.send("`Talebiniz iptal ediliyor!`").then(()=>{
                    setTimeout(()=> {
                        ch.delete().catch()
                    },1000)
                });
            }
        },{time:86400000})
    })
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['talep'],
  permLevel: 0
};
exports.help = {
  name: 'talep',
  description: 'Destek talebi açar.',
  usage: 'c+talep'
};