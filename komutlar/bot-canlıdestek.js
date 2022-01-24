const Discord = require('discord.js');

exports.run = async(client, message, args) => {
   
  let isEnabled;
  message.channel.send(` **Canlı Destek Talebiniz işleme alınmıştı,yetkili ekibimiz birazdan sizinle ilgilenecektir.**<a:yukleniyor:703842036373258340>`);
  let chan = message.channel;
  let destekKanal = "858726539503599696";/// buraya canlı destek mesajı atılacak kanal idisi
  const embed = new Discord.MessageEmbed()
      .addField('Dikkat', `Canlı Destek Talebi`)
      .setColor("RED")
      .addField(`Bilgiler`, `Sunucu: ${message.guild.name} \n Kanal: ${message.channel.name} \n Destek İsteyen: ${message.author.tag}`)
      .setFooter("Ewing | Canlı Destek")
  client.channels.cache.get(destekKanal).send(embed);
  const collector = client.channels.cache.get(destekKanal).createMessageCollector(message => message.content.startsWith(''), {
    time: 0
  })
  client.channels.cache.get(destekKanal).send(` **<@774591026940739585> Destek çağrısına bağlanmak için \`bağlan\`, iptal etmek için \`iptal\` yazınız. **`)
  collector.on('message', (message) => {
    if (message.content === 'iptal') collector.stop('aborted')
    if (message.content === 'bağlan') collector.stop('success')
  })
  collector.on('end', (collected, reason) => {
    if (reason === 'time') return message.channel.send(` **Canlı destek talebiniz zaman aşımına uğradı.**`)
    if (reason === 'aborted') {
      message.channel.send(`**Canlı destek talebiniz yetkili tarafından reddedildi.**`)
      client.channels.cache.get(destekKanal).send(`** Canlı destek talebi reddedildi.**`)
    }
    if (reason === 'success') {
      client.channels.cache.get(destekKanal).send(`** Canlı destek talebi kabul edildi. İptal etmek için \`iptal\` yazınız.**`)
      chan.send(`**  ${message.author}, canlı destek talebiniz yetkili tarafından kabul edildi. İptal etmek için \`iptal\` yazınız.**`)
      isEnabled = true
      client.on('message', message => {
        function contact() {
          if (isEnabled === false) return
          if (message.author.id === client.user.id) return
          if (message.content.startsWith('iptal')) {
            message.channel.send(`** Canlı destek talebini iptal ettiniz.\n Ewing Bot olarak sizlere iyi bir hizmet sağlayabildiysek ne mutlu bize,iyi günler.**`)
            if (message.channel.id === chan.id)
              client.channels.cache.get(destekKanal).send(`** Canlı destek talebi kullanıcı tarafından iptal edildi.**`)
            if (message.channel.id === destekKanal) 
              chan.send(` Canlı destek talebiniz yetkili tarafından iptal edildi.\n Ewing Bot olarak sizlere iyi bir hizmet sağlayabildiysek ne mutlu bize,iyi günler.**`)
            return isEnabled = false
          }
          if (message.channel.id === chan.id) 
            client.channels.cache.get(destekKanal).send(`**Talepte Bulunan Kişi : ${message.author.tag}** : ${message.content}`)
          if (message.channel.id === destekKanal) 
            chan.send(`**Yetkili :** ${message.content}`)
        }
        contact(client)
      })
    }
  })
}

  exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['canlı', 'canlıdestek'],
  permLevel: 0
};

exports.help = {
  name: 'canlıdestek',
  description: 'Yetkililerle canlı desteğe geçersiniz.',
  usage: 'canlıdestek'
};