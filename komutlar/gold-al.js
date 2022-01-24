const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");
const client = new Discord.Client();

exports.run = async (client, message, args) => {

  const Hayir = client.emojis.cache.get("847903511269343232");
  const Evet = client.emojis.cache.get("847903511269343232");
  message.react("847903511269343232");
  let GoldPlayer = args[0];
  if (!GoldPlayer) return message.channel.send(Hayir + " Bir ID Girmelisin");
  message.react("847903511269343232");
  db.delete(`Gold_${GoldPlayer}`);
  message.channel.send(
    Evet +
      ` **\`\`${GoldPlayer}\`\`** ID'sine Sahip <@${GoldPlayer}> Artık Gold Üye Değil!`
  );
  message.react("847903511269343232");
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["gold-al"],
  permLevel: 4,
  kategori: "sahip"
};
exports.help = {
  name: "gold-kapat",
  description: "Gold Üye He ? :D",
  usage: "gold-Kapat"
};