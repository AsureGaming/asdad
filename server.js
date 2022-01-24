///////////////////////////////////////////////////////////////////////////////

const Discord = require("discord.js");
const { Client, Util } = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const ayarlar = require("./ayarlar.json");
const { promisify } = require("util");
const chalk = require("chalk");
require("./util/eventLoader")(client);
const moment = require("moment");
const db = require("quick.db");
const ms = require("ms");
const DBL = require('dblapi.js');

const log = message => {
  console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Komut - ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.on("message", async message => {
  if (message.author.id == "774591026940739585") {
    if (message.content === "fgir") {
      client.emit(
        "guildMemberAdd",
        message.member || (await message.guild.members.fetch(message.author))
      );
    }
  } else {
    return;
  }
});

client.on("message", async message => {
  if (message.author.id == "774591026940739585") {
    if (message.content === "fcık") {
      client.emit(
        "guildMemberRemove",
        message.member || (await message.guild.members.fetch(message.author))
      );
    }
  } else {
    return;
  }
});



//////////////////////////////////////////////////////////////////////////////
client.on("channelDelete", async channel => {
  let kanal = await db.fetch(`kkk_${channel.guild.id}`);
  if (!kanal) return;
  const entry = await channel.guild
    .fetchAuditLogs({ type: "CHANNEL_DELETE" })
    .then(audit => audit.entries.first());
  if (entry.executor.id == client.user.id) return;
  if (entry.executor.hasPermission("ADMINISTRATOR")) return;
  channel.guild.channels.create(channel.name, "text", [
    {
      id: channel.guild.id
    }
  ]);

  const embed = new Discord.MessageEmbed()
    .setTitle(`Bir kanal silindi!`)
    .addField(`Silen`, entry.executor.tag)
    .setColor("BLUE")
    .addField(`Silinen Kanal`, channel.name);
  client.channels.cache.get(kanal).send(embed);
});

client.on("channelCreate", async channel => {
  let kanal = await db.fetch(`kkk_${channel.guild.id}`);
  if (!kanal) return;
  const entry = await channel.guild
    .fetchAuditLogs({ type: "CHANNEL_CREATE" })
    .then(audit => audit.entries.first());
  if (entry.executor.id == client.user.id) return;
  if (entry.executor.hasPermission("ADMINISTRATOR")) return;
  channel.delete();
  const embed = new Discord.MessageEmbed()
    .setTitle(`Bir kanal açıldı!`)
    .setColor("BLUE")
    .addField(`Açan`, entry.executor.tag)
    .addField(`Açılan Kanal`, channel.name);
  client.channels.cache.get(kanal).send(embed);
});

client.on("roleDelete", async role => {
  let kanal = await db.fetch(`rolk_${role.guild.id}`);
  if (!kanal) return;
  const entry = await role.guild
    .fetchAuditLogs({ type: "ROLE_DELETE" })
    .then(audit => audit.entries.first());
  if (entry.executor.id == client.user.id) return;
  if (entry.executor.hasPermission("ADMINISTRATOR")) return;
  role.guild.roles.create({
    name: role.name,
    color: role.hexColor,
    permissions: role.permissions
  });

  const embed = new Discord.MessageEmbed()
    .setTitle(`Bir rol silindi!`)
    .addField(`Silen`, entry.executor.tag)
    .addField(`Silinen Rol`, role.name);
  client.channels.cache.get(kanal).send(embed);
});

client.on("roleCreate", async role => {
  let kanal = await db.fetch(`rolk_${role.guild.id}`);
  if (!kanal) return;
  const entry = await role.guild
    .fetchAuditLogs({ type: "ROLE_CREATE" })
    .then(audit => audit.entries.first());
  if (entry.executor.id == client.user.id) return;
  if (entry.executor.hasPermission("ADMINISTRATOR")) return;
  role.delete();
  const embed = new Discord.MessageEmbed()
    .setTitle(`Bir rol açıldı!`)
    .addField(`Açan`, entry.executor.tag)
    .addField(`Açılan Rol`, role.name);
  client.channels.cache.get(kanal).send(embed);
});
//////////////////////////////////////////////////////////////////////////////
client.on("message", async message => {
  const a = message.content.toLowerCase();
  if (
    a === "slam" ||
    a === "sa" ||
    a === "selamun aleyküm" ||
    a === "selamın aleyküm" ||
    a === "selam" ||
    a === "slm"
  ) {
    let i = await db.fetch(`saas_${message.guild.id}`);
    if (i === "acik") {
      const embed = new Discord.MessageEmbed()
        .setColor("BLUE")
        .setDescription(
          `:wave: **Aleyküm Selam, Hoşgeldin Dostum! ^-^**`
        )

      message.channel.send(embed).then(msg => msg.delete(5000));
    }
  }
});

client.on("guildMemberAdd", async member => {
  db.fetch(`dm_${member.guild.id}`).then(i => {
    if (i == "acik") {
      const msj = new Discord.MessageEmbed()
        .setColor("BLUE")
        .setDescription(
          `<@${member.user.id}> sunucuya hoşgeldin!\nKuralları Okumayı Unutma !\nKomutlarımı görmek için: !yardım\nEğer beni eklemek istersen: [[Tıkla!]](https://discord.com/oauth2/authorize?client_id=784517399314432050&scope=bot&permissions=8)`
        )
        .setFooter(client.user.username, client.user.avatarURL);

      member.send(msj);
    } else if (i == "kapali") {
    }
    if (!i) return;
  });
});

client.on("guildMemberRemove", async member => {
  db.fetch(`dm_${member.guild.id}`).then(i => {
    if (i == "acik") {
      let msj = new Discord.MessageEmbed()
        .setColor("BLUE")
        .setDescription(
          `<@${member.user.id}> Güle güle, özleneceksin!\nEğer beni eklemek istersen: [[Tıkla!]](https://discord.com/oauth2/authorize?client_id=784517399314432050&scope=bot&permissions=8)`
        )
        .setFooter(client.user.username, client.user.avatarURL);

      member.send(msj);
    } else if (i == "kapali") {
    }
    if (!i) return;
  });
});

client.on("message", async message => {
  let uyarisayisi = await db.fetch(`reklamuyari_${message.author.id}`);
  let reklamkick = await db.fetch(`kufur_${message.guild.id}`);
  let kullanici = message.member;
  if (!reklamkick) return;
  if (reklamkick == "Açık") {
    const reklam = [
      "discord.app",
      "discord.gg",
      ".com",
      ".net",
      ".xyz",
      ".tk",
      ".pw",
      ".io",
      ".me",
      ".gg",
      "www.",
      "https",
      "http",
      ".gl",
      ".org",
      ".com.tr",
      ".biz",
      ".party",
      ".rf.gd",
      ".az"
    ];
    if (reklam.some(word => message.content.toLowerCase().includes(word))) {
      if (!message.member.hasPermission("BAN_MEMBERS")) {
        message.delete();
        db.add(`reklamuyari_${message.author.id}`, 1); //uyarı puanı ekleme
        if (uyarisayisi === null) {
          let uyari = new Discord.MessageEmbed()
            .setColor("BLUE")
            .setTitle("Ewing Reklam-Engel!")
            .setDescription(
              `<@${message.author.id}> reklam yapmayı kes! bu ilk uyarın! (1/3)`
            )
            .setFooter(client.user.username, client.user.avatarURL)
            .setTimestamp();
          message.channel.send(uyari);
        }
        if (uyarisayisi === 1) {
          let uyari = new Discord.MessageEmbed()
            .setColor("BLUE")
            .setTitle("Ewing Reklam-Engel!")
            .setDescription(
              `<@${message.author.id}> reklam yapmayı kes! bu ikinci uyarın! (2/3)`
            )
            .setFooter(client.user.username, client.user.avatarURL)
            .setTimestamp();
          message.channel.send(uyari);
        }
        if (uyarisayisi === 2) {
          message.delete();
          await kullanici.kick({
            reason: `Reklam-Engel sistemi!`
          });
          let uyari = new Discord.MessageEmbed()
            .setColor("BLUE")
            .setTitle("Ewing Reklam-Engel!")
            .setDescription(
              `<@${message.author.id}> üç kere reklam yaptığı için sunucudan atıldı!`
            )
            .setFooter(client.user.username, client.user.avatarURL)
            .setTimestamp();
          message.channel.send(uyari);
        }
        if (uyarisayisi === 3) {
          message.delete();
          await kullanici.members.ban({
            reason: `Ewing Reklam-Engel sistemi!`
          });
          db.delete(`reklamuyari_${message.author.id}`);
          let uyari = new Discord.MessageEmbed()
            .setColor("BLUE")
            .setTitle("Ewing Reklam kick sistemi")
            .setDescription(
              `<@${message.author.id}> atıldıktan sonra tekrar reklam yaptığı için sunucudan yasaklandı!`
            )
            .setFooter(client.user.username, client.user.avatarURL)
            .setTimestamp();
          message.channel.send(uyari);
        }
      }
    }
  }
});

const invites = {};

const wait = require("util").promisify(setTimeout);

client.on("ready", () => {
  wait(1000);

  client.guilds.cache.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});

client.on("guildMemberRemove", async member => {
  let kanal = await db.fetch(`davetkanal_${member.guild.id}`);
  if (!kanal) return;
  let veri = await db.fetch(`rol1_${member.guild.id}`);
  let veri12 = await db.fetch(`roldavet1_${member.guild.id}`);
  let veri21 = await db.fetch(`roldavet2_${member.guild.id}`);
  let veri2 = await db.fetch(`rol2_${member.guild.id}`);
  let d = await db.fetch(`bunudavet_${member.id}`);
  const sa = client.users.cache.get(d);
  const sasad = member.guild.members.cache.get(d);
  let sayı2 = await db.fetch(`davet_${d}_${member.guild.id}`);
  db.add(`davet_${d}_${member.guild.id}`, -1);

  if (!d) {
    const aa = new Discord.MessageEmbed()
      .setColor("BLUE")
      .setDescription(
        `\`\`${member.user.tag}\`\` **adlı şahıs aramızdan ayrıldı.\nŞahsı davet eden:** \`\`Bulunamadı!\`\``
      )
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.cache.get(kanal).send(aa);
    return;
  } else {
    const aa = new Discord.MessageEmbed()
      .setColor("BLUE")
      .setDescription(
        `\`\`${member.user.tag}\`\` **adlı şahıs aramızdan ayrıldı.\nŞahsı davet eden:** \`\`${sa.tag}\`\``
      )
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.cache.get(kanal).send(aa);

    if (!veri) return;

    if (sasad.roles.cache.has(veri)) {
      if (sayı2 <= veri12) {
        sasad.roles.remove(veri);
        return;
      }
    }
    if (sasad.roles.cache.has(veri2)) {
      if (!veri2) return;
      if (sayı2 <= veri21) {
        sasad.roles.remove(veri2);
        return;
      }
    }
  }
});

client.on("guildMemberAdd", async member => {
  member.guild.fetchInvites().then(async guildInvites => {
    let veri = await db.fetch(`rol1_${member.guild.id}`);
    let veri12 = await db.fetch(`roldavet1_${member.guild.id}`);
    let veri21 = await db.fetch(`roldavet2_${member.guild.id}`);
    let veri2 = await db.fetch(`rol2_${member.guild.id}`);
    let kanal = await db.fetch(`davetkanal_${member.guild.id}`);
    if (!kanal) return;
    const ei = invites[member.guild.id];

    invites[member.guild.id] = guildInvites;

    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
    const sasad = member.guild.members.cache.get(invite.inviter.id);
    const davetçi = client.users.cache.get(invite.inviter.id);

    db.add(`davet_${invite.inviter.id}_${member.guild.id}`, +1);
    db.set(`bunudavet_${member.id}`, invite.inviter.id);
    let sayı = await db.fetch(`davet_${invite.inviter.id}_${member.guild.id}`);

    let sayı2;
    if (!sayı) {
      sayı2 = 0;
    } else {
      sayı2 = await db.fetch(`davet_${invite.inviter.id}_${member.guild.id}`);
    }

    const aa = new Discord.MessageEmbed()
      .setColor("BLUE")
      .setDescription(
        `\`\`${member.user.tag}\`\` **adlı şahıs sunucuya katıldı.\nŞahsı davet eden:** \`\`${davetçi.tag}\`\`\n**Toplam \`\`${sayı2}\`\` daveti oldu!**`
      )
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.cache.get(kanal).send(aa);
    if (!veri) return;

    if (!sasad.roles.cache.has(veri)) {
      if (sayı2 => veri12) {
        sasad.roles.add(veri);
        return;
      }
    } else {
      if (!veri2) return;
      if (sayı2 => veri21) {
        sasad.roles.add(veri2);
        return;
      }
    }
  });
});
//////////////////////////////////////////////////////////////////////////////
client.on("guildMemberAdd", async member => {
  let rol = await db.fetch(`otorol_${member.guild.id}`);
  let kanal = await db.fetch(`otokanal_${member.guild.id}`);
  let msj = await db.fetch(`otorolmsj_${member.guild.id}`);
  if (!rol) return;
  if (!kanal) return;

  member.roles.add(rol);
  if (!msj) {
    const embed = new Discord.MessageEmbed()
      .setColor("BLUE")
      .setDescription(
        `- <:ewing:847903511269343232>  :loudspeaker: **@${member.user.tag}** adlı şahsa rolü verildi! :inbox_tray:`
      )
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.cache.get(kanal).send(embed);
    return;
  } else {
    var msj2 = msj
      .replace(`-sunucu-`, `${member.guild.name}`)
      .replace(`-uye-`, `${member.user.tag}`)
      .replace(`-uyetag-`, `<@${member.user.id}>`)
      .replace(`-rol-`, `${member.guild.roles.cache.get(rol).name}`);
    const embed = new Discord.MessageEmbed()
      .setColor("BLUE")
      .setDescription(msj2)
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.cache.get(kanal).send(embed);
    return;
  }
});
//////////////////////////////////////////////////////////////////////////////

client.on("guildMemberAdd", async member => {
  let rol = await db.fetch(`sayaçhedef_${member.guild.id}`);
  let kanal = await db.fetch(`sayaçkanal_${member.guild.id}`);
  let msj = await db.fetch(`sayaçmsjhg_${member.guild.id}`);
  if (!rol) return;
  if (!kanal) return;

  if (rol == member.guild.memberCount) {
    const embed = new Discord.MessageEmbed()
      .setColor("BLUE")
      .setDescription(`<:ewing:847903511269343232>  Tebrikler! başarılı bir şekilde ${rol} kişi olduk!`)
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.cache.get(kanal).send(embed);
    db.delete(`sayaçhedef_${member.guild.id}`);
    db.delete(`sayaçkanal_${member.guild.id}`);
    db.delete(`sayaçmsjhg_${member.guild.id}`);
    db.delete(`sayaçmsjbb_${member.guild.id}`);
    return;
  }
  if (rol < member.guild.memberCount) {
    const embed = new Discord.MessageEmbed()
      .setColor("BLUE")
      .setDescription(`<:ewing:847903511269343232>  Tebrikler! başarılı bir şekilde ${rol} kişi olduk!`)
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.cache.get(kanal).send(embed);
    db.delete(`sayaçhedef_${member.guild.id}`);
    db.delete(`sayaçkanal_${member.guild.id}`);
    db.delete(`sayaçmsjhg_${member.guild.id}`);
    db.delete(`sayaçmsjbb_${member.guild.id}`);
    return;
  }
  if (!msj) {
    const embed = new Discord.MessageEmbed()
      .setColor("BLUE")
      .setDescription(
        `- <:ewing:847903511269343232>  **@${
          member.user.tag
        }** adlı şahsa aramıza katıldı! ${rol} kişi olmamıza ${rol -
          member.guild.memberCount} kişi kaldı! :inbox_tray:`
      )
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.cache.get(kanal).send(embed);
    return;
  } else {
    var msj2 = msj
      .replace(`-sunucu-`, `${member.guild.name}`)
      .replace(`-uye-`, `${member.user.tag}`)
      .replace(`-uyetag-`, `<@${member.user.id}>`)
      .replace(`-hedef-`, `${rol}`)
      .replace(`-hedefkalan-`, `${rol - member.guild.memberCount}`);
    const embed = new Discord.MessageEmbed()
      .setColor("BLUE")
      .setDescription(msj2)
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.cache.get(kanal).send(embed);
    return;
  }
});

///////////////////////////////////////

client.on("guildMemberAdd", async member => {
  let rol = await db.fetch(`ototag_${member.guild.id}`);
  let kanal = await db.fetch(`ototagk_${member.guild.id}`);
  let msj = await db.fetch(`ototagmsj_${member.guild.id}`);
  if (!rol) return;
  if (!kanal) return;

  if (!msj) {
    member.setNickname(`${rol} | ${member.user.username}`);
    const embed = new Discord.MessageEmbed()
      .setColor("BLUE")
      .setDescription(
        `<:ewing:847903511269343232>  **@${member.user.tag}** adlı şahsa tag verildi!`
      )
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.cache.get(kanal).send(embed);
    return;
  } else {
    var msj2 = msj
      .replace(`-uye-`, `${member.user.username}`)
      .replace(`-tag-`, `${rol}`);
    member.setNickname(msj2);
    const embed = new Discord.MessageEmbed()
      .setColor("BLUE")
      .setDescription(
        `<:ewing:847903511269343232>  **@${member.user.tag}** adlı şahsa tag verildi!`
      )
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.cache.get(kanal).send(embed);
    return;
  }
});
//////////////////////////////////////////////////////////////////////////////
client.on("message", async message => {
  let ever = await db.fetch(`ever_${message.guild.id}`);
  let sayı = await db.fetch(`sayi_${message.author.id}`);
  if (ever === "acik") {
    const a = message.content;
    if (a === "@everyone" || a === "@here") {
      if (message.member.hasPermission("BAN_MEMBERS")) return;
      db.add(`sayi_${message.author.id}`, 1);
      if (sayı == null) {
        const embed = new Discord.MessageEmbed()
          .setColor("BLUE")
          .setDescription(
            "<:ewing:847903511269343232> Bu 1. uyarın! Lütfen tekrarlama! Aksi taktirde atılacaksın!\n(1/3)"
          )
          .setFooter(client.user.username, client.user.avatarURL);
        message.channel.send(embed);
        message.delete();
        return;
      }
      if (sayı === 1) {
        const embed = new Discord.MessageEmbed()
          .setColor("BLUE")
          .setDescription(
            "<:ewing:847903511269343232> Bu 2. uyarın! Lütfen tekrarlama! Aksi taktirde atılacaksın!\n(2/3)"
          )
          .setFooter(client.user.username, client.user.avatarURL);
        message.channel.send(embed);
        message.delete();
        return;
      }
      if (sayı > 2) {
        message.delete();
        const embed = new Discord.MessageEmbed()
          .setColor("BLUE")
          .setDescription("<:ewing:847903511269343232> Sunucudan atılıyorsun!")
          .setFooter(client.user.username, client.user.avatarURL);
        message.channel.send(embed);
        db.delete(`sayi_${message.author.id}`);
        message.member.kick();
        return;
      }
    }
  } else {
    return;
  }
});

client.on("guildMemberRemove", async member => {
  let rol = await db.fetch(`sayaçhedef_${member.guild.id}`);
  let kanal = await db.fetch(`sayaçkanal_${member.guild.id}`);
  let msj = await db.fetch(`sayaçmsjbb_${member.guild.id}`);
  if (!rol) return;
  if (!kanal) return;

  if (!msj) {
    const embed = new Discord.MessageEmbed()
      .setColor("BLUE")
      .setDescription(
        `- <:ewing:847903511269343232>  **@${
          member.user.tag
        }** adlı şahsa aramızdan ayrıldı! ${rol} kişi olmamıza ${rol -
          member.guild.memberCount} kişi kaldı! :inbox_tray:`
      )
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.cache.get(kanal).send(embed);
    return;
  } else {
    var msj2 = msj
      .replace(`-sunucu-`, `${member.guild.name}`)
      .replace(`-uye-`, `${member.user.tag}`)
      .replace(`-uyetag-`, `<@${member.user.id}>`)
      .replace(`-hedef-`, `${rol}`)
      .replace(`-hedefkalan-`, `${rol - member.guild.memberCount}`);
    const embed = new Discord.MessageEmbed()
      .setColor("BLUE")
      .setDescription(msj2)
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.cache.get(kanal).send(embed);
    return;
  }
});


client.on("guildCreate", async guild => {
  const embed = new Discord.MessageEmbed()
    .setColor(`GREEN`)
    .setTitle(`YENİ BİR SUNUCUYA DAHA EKLENDİM!`)
    .setDescription(
      `Sunucu Adı: ${guild.name}\nSunucu Id: ${guild.id}\nSunucu Sahibi: ${guild.owner}\nSunucudaki Kişi Sayısı: ${guild.memberCount}\nSunucu Oluşturulma Zamanı: ${guild.createdAt}\nDoğrulama Seviyesi: ${guild.verificationLevel}`
    );
  client.channels.cache.get(`879301494925578241`).send(embed);
});
client.on("guildDelete", async guild => {
  const embed = new Discord.MessageEmbed()
    .setColor(`RED`)
    .setTitle(`BİR SUNUCUDAN ATILDIM!`)
    .setDescription(
      `Sunucu Adı: ${guild.name}\nSunucu Id: ${guild.id}\nSunucu Sahibi: ${guild.owner}\nSunucudaki Kişi Sayısı: ${guild.memberCount}\nSunucu Oluşturulma Zamanı: ${guild.createdAt}\nDoğrulama Seviyesi: ${guild.verificationLevel}`
    );
  client.channels.cache.get(`879301494925578241`).send(embed);
});

client.elevation = message => {
  if (!message.guild) {
    return;
  }

  let permlvl = 0;
  if (message.member.hasPermission("KICK_MEMBERS")) permlvl = 1;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token);


// BOT EKLENİNCE KURUCUYA MESAJ //


// ÖZELDEN HOŞGELDİN //

// ÖZELDEN HOŞGELDİN //

// AÇILIN KODLAYICIM GELDİ //

client.on("message", async message => {
  const ms = require('ms')
   let dogrulama = await db.fetch(`sahiponay_${message.author.id}_${message.guild.id}`);
    let gun = 1800000; // bir gün  değiştirmek için "zaman to ms" yazın google'a açılan yerdeki rakamı girin (boşluk olmadan) (örnek 1day to ms) (Şuanda 15 Dakikada Bir Yazar)
    if (dogrulama !== null && gun - (Date.now() - dogrulama) > 0) {
       
    } else {
          if(message.author.id === ayarlar.sahip){
           db.set(`sahiponay_${message.author.id}_${message.guild.id}`, Date.now())
            message.channel.send("<:ewing:847903511269343232>  **Hizaya Geçin, Bu Benim Kodlayıcım** <:ewing:847903511269343232> ").then(msg => msg.delete (15000))
            }
        }
       
});  

//AÇILIN KODLAYICIM GLEDİ//

////////////////// gold üye  //////////////////////////

client.on("message", async message => {
  let Gold = client.emojis.cache.get("847903511269343232");
  let TimeOut = 1800000;
  let LastSee = await db.fetch(`GoldS_${message.author.id}`);
  let R = await db.fetch(`Gold_${message.author.id}`);
  if (R == "Gold") {
    if (LastSee !== null && TimeOut - (Date.now() - LastSee) > 0) {
      let Time = ms(TimeOut - (Date.now() - LastSee));
    } else {
      if (message.author.bot) return;
      if (message.content.length > 1) {
        db.set(`GoldS_${message.author.id}`, Date.now());
        const RevengeNYKS = new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.avatarURL())
          .setDescription(
              " Bir Premium Üye Geldi,Hoşgeldin <@" +
              message.author.id +
              ">"
          )
          .setColor("RANDOM");
        message.channel
          .send(RevengeNYKS)
          .then(message => message.delete(12000));
      }
    }
  } else if (R == undefined) {
  }
  if (!R) return;
});

/////////////////////// Gold Üye /////////////////////////

// ÖZELDEN MESAJ //

client.on("message", async message => {
  if(message.author.id === client.user.id) return;
  if(message.guild) return;
  client.channels.cache.get('879301494925578241').send(new Discord.MessageEmbed().setAuthor("Yeni Bir DM", client.user.avatarURL).setFooter(message.author.tag, message.author.avatarURL()).setDescription(`**Gönderenin ID:** ${message.author.id}`).setTimestamp().addField("Mesaj", message.content).setColor("RANDOM"))
})

//Kayıtsız Rol Ayarlama

client.on('guildMemberAdd', async member => {
 let kayıtszrol = await db.fetch(`kayıtsızrol_${member.guild.id}`)
 if (!kayıtszrol) return;
  member.roles.add(member.guild.roles.cache.get(kayıtszrol))

});

//Kayıtsız Rol Ayarlama Son

// BOT EKLENİNCE KURUCUYA MESAJ //

client.on('guildCreate', async guild => {
  const girismesaj = [
    '**<:ewing:847903511269343232> | Ewing Bot Sunucunuza Eklendi.',
    ':hammer_pick: | Bu bot **<@774591026940739585>** tarafından geliştirilmektedir.',
    '<:ewing:847903511269343232> | Destek Sunucumuz : https://discord.gg/RvPfmr6CCx! , Sitemiz : https://ewing.ga/',
    ':newspaper: | Yardım menüsüne erişmek için : e?yardım',
    ':gear: | Varsayılan Prefixi Değiştirmek İçin : e?prefix <oluşturacağınız prefix>',
    ':briefcase:| ``NOT`` : ``Bu Mesaj Sadece Sunucu Sahibi`ne gönderilmektedir.``**'

  ]
  guild.owner.send(girismesaj)
  console.log(`LOG: ${guild.name}. sunucuya katıldım!`);
})

// ÖZELDEN HOŞGELDİN //

client.on(`guildMemberAdd`, async member => {
  const e = new Discord.MessageEmbed()
    .setColor(`BLUE`)
    .setImage(`https://media.giphy.com/media/xUPGGDNsLvqsBOhuU0/giphy.gif`)
    .addField(`<:ewing:847903511269343232> **Sunucuya Hoşgeldin !**`, `<:ewing:847903511269343232> Bu Sunucu "Ewing Bot" Kullanıyor !`)
    .setFooter(`Botu Davet Etmek İçin : e?davet | Sitemiz İçin : e?site`)
  member.send(e);
});

// ÖZELDEN HOŞGELDİN //
