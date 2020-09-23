const Discord = require("discord.js");
const client = new Discord.Client();
const chalk = require("chalk");
var Jimp = require("jimp");
const { Client, Util } = require("discord.js");
const fs = require("fs");
const http = require("http");
const express = require("express");
require("./util/eventLoader")(client);

client.ayarlar = { "token": "NzQwNjI0MzE4MDk4MTc4MDQ4.XyruJQ.-zydcgvOuSWGM-bkCp0Zgf0RQsI", "prefix": "r!", "sahip": "285381019106803712" }

const app = express();
app.get("/", (request, response) => {
  console.log();
  response.sendStatus(200);
});

app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = client.ayarlar.prefix;

const log = message => {
  console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./commands/${f}`);
    log(`Yüklenen komut: ${client.ayarlar.prefix}${props.help.name}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
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
      let cmd = require(`./commands/${command}`);
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
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
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

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 1;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 2;
  if (message.author.id === message.guild.owner.id) permlvl = 3;
  if (message.author.id === client.ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.login(client.ayarlar.token);

client.on("ready", async () => {
  client.user.setActivity(
    ` ﾃ REALİTY #ComeBack SİNCE 2020 Created BY  ⺈ᴍᴇʀᴄᴜʀɪᴀɴʙᴇʏﾃ#6666 ${prefix}komutlar | ${client.guilds.size} sunucu | ${client.users.size} kullanıcı|`
  );
  client.user.setStatus("idle");
});



//TAG\\
client.on('userUpdate', async user => {
  let sunucuid = "724643788378734624"; //Buraya sunucunuzun IDsini yazın
  let tag = "ﾃ"; //Buraya tagınızı yazın
  let rol = "740711082632544367"; //Buraya tag alındığı zaman verilecek rolün IDsini yazın
  let channel = client.guilds.get(sunucuid).channels.find(x => x.name == 'ﾃ┃genel-chat💬'); //tagrol-log yerine kendi log kanalınızın ismini yazabilirsiniz
  if (!tag) return;
  if (!rol) return;
  if (!channel) return;
  let member = client.guilds.get(sunucuid).members.get(user.id);
  if (!member) return;
  if (!member.roles.has(rol)) {
    if (member.user.username.includes(tag)) {
      member.addRole(rol)
      const tagalma = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setDescription(`**<@${user.id}> ADLI KİŞİ, ${tag} TAGIMIZI ALDIĞINDAN DOLAYI <@&${rol}> ALARAK AİLEMİZE KATILDI HOŞGELDİN!**`)
      .setTimestamp()
      channel.send(tagalma)
    }
  }else{
    if (!member.user.username.includes(tag)) {
      member.removeRole(rol)
      const tagsilme = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setDescription(`**<@${user.id}> ADLI KİŞİ, ${tag} TAGIMIZI SİLDİĞİNDEN DOLAYI <@&${rol}> ROLÜMÜZÜ KAYBEDEREK ARAMIZDAN AYRILDI ÜZDÜN REİS :broken_heart:**`)
      .setTimestamp()
      channel.send(tagsilme)
    }
  }
});
//TAG\\

const moment = require('moment')
const db = require('quick.db')


client.on("ready", () => {
  client.channels.get("744552583984578561").join();
   //main dosyaya atılacak
})




//mute\\

const ms = require("ms");

client.on('guildMemberAdd', async(member) => {
 let mute = member.guild.roles.find(r => r.name === "Susturuldu");
let mutelimi = db.fetch(`muteli_${member.guild.id + member.id}`)
let süre = db.fetch(`süre_${member.id + member.guild.id}`)
if (!mutelimi) return;
if (mutelimi == "muteli") {
member.addRole(mute.id)
 
member.send("Muteliyken Sunucudan Çıktığın için Yeniden Mutelendin!")
 setTimeout(function(){
    // msg.channel.send(`<@${user.id}> Muten açıldı.`)
db.delete(`muteli_${member.guild.id + member.id}`)
    member.send(`<@${member.id}> Muten açıldı.`)
    member.removeRole(mute.id);
  }, ms(süre));
}
})


client.on('guildMemberAdd', async member => {// chimp ᵈ♡#0110
const data = require('quick.db')
const asd = data.fetch(`${member.guild.id}.jail.${member.id}`)
if(asd) {
let data2 = await data.fetch(`jailrol_${member.guild.id}`)
let rol = member.guild.roles.get(data2)
if(!rol) return;
let kişi = member.guild.members.get(member.id)
kişi.addRole(rol.id);
kişi.roles.forEach(r => {
kişi.removeRole(r.id)
data.set(`${member.guild.id}.jail.${kişi.id}.roles.${r.id}`, r.id )})
    data.set(`${member.guild.id}.jail.${kişi.id}`, 'codare')
  const wasted = new Discord.RichEmbed()
  .setAuthor(member.user.tag, member.user.avatarURL)
  .setColor(`#f3c7e1`)
  .setDescription(`Aa, beni kandıramazsın!`)
  .setTimestamp()
    member.send(wasted)
} 
  
  
})// codare

client.on("guildBanAdd", async (guild, user) => {

  if (!db.has(`banlimit_${guild.id}`)) return;

  let logs = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'});

  if (logs.entries.first().executor.bot) return;

  const kisi = logs.entries.first().executor

  const member = guild.members.get(kisi.id)

  if (member.hasPermission('ADMINISTRATOR')) return;

  let banlimit = db.fetch(`banlimit_${guild.id}`)

  if (isNaN(banlimit)) return;

  banlimit = banlimit + 1

  if (!db.has(`bansayi_${member.id}_${guild.id}`)) {

    if (banlimit == 1) {

      var array = member.roles.filter(role => role.name !== "@everyone").array()

      for (const role of array) member.removeRole(role.id)

    }else{

      db.set(`bansayi_${member.id}_${guild.id}`, 1)

    }

  }else{

    const bansayisi = db.fetch(`bansayi_${member.id}_${guild.id}`)

    if (bansayisi >= banlimit) {

      db.delete(`bansayi_${member.id}_${guild.id}`)

      var array = member.roles.filter(role => role.name !== "@everyone").array()

      for (const role of array) member.removeRole(role.id)

    }

  }

})



client.on('guildBanAdd', async (guild, user) => {// chimp ᵈ♡#0110
const data = require('quick.db')

const da = await data.fetch(`sağ.tık.ban.${guild.id}`)
if(!da) return;
const kanal_id = await data.fetch(`sağ.tık.ban.kanal.${guild.id}`)
let kanal = client.channels.get(kanal_id)

let logs = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'});
if(logs.entries.first().executor.bot) return;
let kişi = guild.members.get(logs.entries.first().executor.id)
kişi.roles.forEach(r => {
db.set(`${guild.id}.banrol.${kişi.id}.roles.${r.id}`, r.id)
kişi.removeRole(r.id)})
guild.unban(user)

const emb = new Discord.RichEmbed()
.setAuthor(kişi.user.username, kişi.user.avatarURL)
.setFooter(`${client.user.username}`)
.setTimestamp()

kanal.send(emb.setDescription(`${kişi.user.tag} isimli kişi ${user} isimli kişiyi yasaklamaya çalıştı, attı ama ben yetkilerini aldım ve kişinin yasağını kaldırdım..`))
guild.owner.send(emb.setDescription(`${kişi.user.tag} isimli kişi ${user} isimli kişiyi yasaklamaya çalıştı, attı ama ben yetkilerini aldım ve kişinin yasağını kaldırdım..`))
console.log('ꇓ MercurianBey ﾃ#0001')
})// codare

client.on("message" , async msg => {
  if(msg.content.startsWith(client.ayarlar.prefix+"afk")) return;
 
  let afk = msg.mentions.users.first()
 
  const kisi = db.fetch(`afkid_${msg.author.id}_${msg.guild.id}`)
 
  const isim = db.fetch(`afkAd_${msg.author.id}_${msg.guild.id}`)
if(afk){
   const sebep = db.fetch(`afkSebep_${afk.id}_${msg.guild.id}`)
   const kisi3 = db.fetch(`afkid_${afk.id}_${msg.guild.id}`)
   if(msg.content.includes(kisi3)){
 
       msg.reply(`**Etiketlediğiniz Kişi Afk \n Sebep : ${sebep}**`)
   }
 }
  if(msg.author.id === kisi){
 
       msg.reply(`Afk'lıktan Çıktınız`)
  db.delete(`afkSebep_${msg.author.id}_${msg.guild.id}`)
  db.delete(`afkid_${msg.author.id}_${msg.guild.id}`)
  db.delete(`afkAd_${msg.author.id}_${msg.guild.id}`)
   msg.member.setNickname(isim)
   
 }
 
});

client.on("message", async  msg => {
 var mayfe = await db.fetch(`reklam_${msg.guild.id}`)
    if (mayfe == 'acik') {
        const birisireklammidedi = [".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", "net", ".rf.gd", ".az", ".party", "discord.gg",];
        if (birisireklammidedi.some(word => msg.content.includes(word))) {
          try {
            if (!msg.member.hasPermission("BAN_MEMBERS")) {
                  msg.delete();
                    return msg.reply('Bu Sunucuda Reklam Engelleme Filtresi Aktiftir. Reklam Yapmana İzin Veremem !').then(msg => msg.delete(3000));
    

  msg.delete(3000);                              

            }              
          } catch(err) {
            console.log(err);
          }
        }
    }
    else if (mayfe == 'kapali') {
      
    }
    if (!mayfe) return;
  })

client.on("message", async msg => {


  const i = await db.fetch(`ssaass_${msg.guild.id}`);
    if (i == 'acik') {
      if (msg.content.toLowerCase() == 'sa' || msg.content.toLowerCase() == 's.a' || msg.content.toLowerCase() == 'selamun aleyküm') {
          try {

                  return msg.reply('**Aleyküm Selam, Hoşgeldin :)** ')
          } catch(err) {
            console.log(err);
          }
      }
    }
    else if (i == 'kapali') {
    
    }
    if (!i) return;

    });

//READY.JS YE ATILACAK

//---------------------------------KOMUTLAR---------------------------------\\
client.on('voiceStateUpdate', (oldMember, newMember) => {
    // todo create channel
    if (newMember.voiceChannel != null && newMember.voiceChannel.name.startsWith('ﾃ│1 Kişilik Oda')) {
        newMember.guild.createChannel(`║ﾃ ${newMember.displayName}`, {
            type: 'voice',
            parent: newMember.voiceChannel.parent
       }).then(cloneChannel => {
        newMember.setVoiceChannel(cloneChannel)
        cloneChannel.setUserLimit(1)
      })
    }
    // ! leave
    if (oldMember.voiceChannel != undefined) {
        if (oldMember.voiceChannel.name.startsWith('║ﾃ ')) {
            if (oldMember.voiceChannel.members.size == 0) {
                oldMember.voiceChannel.delete()
            }
            else { // change name
                let matchMember = oldMember.voiceChannel.members.find(x => `║ﾃ ${x.displayName}` == oldMember.voiceChannel.name);
                if (matchMember == null) {
                    oldMember.voiceChannel.setName(`║ﾃ ${oldMember.voiceChannel.members.random().displayName}`)
                }
            }
        }
    }
});
//----------------------------------GEÇİCİ KANAL----------------------------// 
client.on('voiceStateUpdate', (oldMember, newMember) => {
    // todo create channel
    if (newMember.voiceChannel != null && newMember.voiceChannel.name.startsWith('ﾃ│2 Kişilik Oda')) {
        newMember.guild.createChannel(`║ﾃ ${newMember.displayName}`, {
            type: 'voice',
            parent: newMember.voiceChannel.parent
       }).then(cloneChannel => {
        newMember.setVoiceChannel(cloneChannel)
        cloneChannel.setUserLimit(2)
      })
    }
    // ! leave
    if (oldMember.voiceChannel != undefined) {
        if (oldMember.voiceChannel.name.startsWith('║ﾃ ')) {
            if (oldMember.voiceChannel.members.size == 0) {
                oldMember.voiceChannel.delete()
            }
            else { // change name
                let matchMember = oldMember.voiceChannel.members.find(x => `║ﾃ ${x.displayName}` == oldMember.voiceChannel.name);
                if (matchMember == null) {
                    oldMember.voiceChannel.setName(`║ﾃ ${oldMember.voiceChannel.members.random().displayName}`)
                }
            }
        }
    }
});
//----------------------------------GEÇİCİ KANAL----------------------------// 
//----------------------------------GEÇİCİ KANAL----------------------------// 
client.on('voiceStateUpdate', (oldMember, newMember) => {
    // todo create channel
    if (newMember.voiceChannel != null && newMember.voiceChannel.name.startsWith('ﾃ│3 Kişilik Oda')) {
        newMember.guild.createChannel(`║ﾃ ${newMember.displayName}`, {
            type: 'voice',
            parent: newMember.voiceChannel.parent
       }).then(cloneChannel => {
        newMember.setVoiceChannel(cloneChannel)
        cloneChannel.setUserLimit(3)
      })
    }
    // ! leave
    if (oldMember.voiceChannel != undefined) {
        if (oldMember.voiceChannel.name.startsWith('║ﾃ ')) {
            if (oldMember.voiceChannel.members.size == 0) {
                oldMember.voiceChannel.delete()
            }
            else { // change name
                let matchMember = oldMember.voiceChannel.members.find(x => `║ﾃ ${x.displayName}` == oldMember.voiceChannel.name);
                if (matchMember == null) {
                    oldMember.voiceChannel.setName(`║ﾃ ${oldMember.voiceChannel.members.random().displayName}`)
                }
            }
        }
    }
});
//----------------------------------GEÇİCİ KANAL----------------------------// 
//----------------------------------GEÇİCİ KANAL----------------------------// 
client.on('voiceStateUpdate', (oldMember, newMember) => {
    // todo create channel
    if (newMember.voiceChannel != null && newMember.voiceChannel.name.startsWith('ﾃ│4 Kişilik Oda')) {
        newMember.guild.createChannel(`║ﾃ ${newMember.displayName}`, {
            type: 'voice',
            parent: newMember.voiceChannel.parent
       }).then(cloneChannel => {
        newMember.setVoiceChannel(cloneChannel)
        cloneChannel.setUserLimit(4)
      })
    }
    // ! leave
    if (oldMember.voiceChannel != undefined) {
        if (oldMember.voiceChannel.name.startsWith('║ﾃ ')) {
            if (oldMember.voiceChannel.members.size == 0) {
                oldMember.voiceChannel.delete()
            }
            else { // change name
                let matchMember = oldMember.voiceChannel.members.find(x => `║ﾃ ${x.displayName}` == oldMember.voiceChannel.name);
                if (matchMember == null) {
                    oldMember.voiceChannel.setName(`║ﾃ ${oldMember.voiceChannel.members.random().displayName}`)
                }
            }
        }
    }
});
//----------------------------------GEÇİCİ KANAL----------------------------// 
//----------------------------------GEÇİCİ KANAL----------------------------// 
client.on('voiceStateUpdate', (oldMember, newMember) => {
    // todo create channel
    if (newMember.voiceChannel != null && newMember.voiceChannel.name.startsWith('ﾃ│5 Kişilik Oda')) {
        newMember.guild.createChannel(`║ﾃ ${newMember.displayName}`, {
            type: 'voice',
            parent: newMember.voiceChannel.parent
       }).then(cloneChannel => {
        newMember.setVoiceChannel(cloneChannel)
        cloneChannel.setUserLimit(5)
      })
    }
    // ! leave
    if (oldMember.voiceChannel != undefined) {
        if (oldMember.voiceChannel.name.startsWith('║ﾃ ')) {
            if (oldMember.voiceChannel.members.size == 0) {
                oldMember.voiceChannel.delete()
            }
            else { // change name
                let matchMember = oldMember.voiceChannel.members.find(x => `║ﾃ ${x.displayName}` == oldMember.voiceChannel.name);
                if (matchMember == null) {
                    oldMember.voiceChannel.setName(`║ﾃ ${oldMember.voiceChannel.members.random().displayName}`)
                }
            }
        }
    }
});
//----------------------------------GEÇİCİ KANAL----------------------------// 
//----------------------------------Özel oda sistemi----------------------------// 
client.on('message', async message => {
  const ms = require('ms');
  const prefix = "r!"
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  let u = message.mentions.users.first() || message.author;
  if (command === "özelodasistemi") {
  if (message.guild.channels.find(channel => channel.name === "Bot Kullanımı")) return message.channel.send(" Bot Paneli Zaten Ayarlanmış.")
  if (!message.member.hasPermission('ADMINISTRATOR'))
  return message.channel.send(" Bu Kodu `Yönetici` Yetkisi Olan Kişi Kullanabilir.");
    message.channel.send(`Özel Oda Sisteminin Kurulmasını İstiyorsanız **Kur** Yazınız.`)
      message.channel.awaitMessages(response => response.content === 'Kur', {
        max: 1,
        time: 10000,
        errors: ['time'],
     })
    .then((collected) => {

message.guild.createChannel('【ﾃ】1 Kişilik Odalar【ﾃ】', 'category', [{
  id: message.guild.id,
}]);

message.guild.createChannel(`ﾃ│1 Kişilik Oda Kur`, 'voice')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "【ﾃ】1 Kişilik Odalar【ﾃ】")))

message.guild.createChannel('【ﾃ】2 Kişilik Odalar【ﾃ】', 'category', [{
  id: message.guild.id,
}]);

message.guild.createChannel(`ﾃ│2 Kişilik Oda Kur`, 'voice')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "【ﾃ】2 Kişilik Odalar【ﾃ】")))

message.guild.createChannel('【ﾃ】3 Kişilik Odalar【ﾃ】', 'category', [{
  id: message.guild.id,
}]);

message.guild.createChannel(`ﾃ│3 Kişilik Oda Kur`, 'voice')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "【ﾃ】3 Kişilik Odalar【ﾃ】")))

message.guild.createChannel('【ﾃ】4 Kişilik Odalar【ﾃ】', 'category', [{
  id: message.guild.id,
}]);

message.guild.createChannel(`ﾃ│4 Kişilik Oda Kur`, 'voice')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "【ﾃ】4 Kişilik Odalar【ﾃ】")))

message.guild.createChannel('【ﾃ】5 Kişilik Odalar【ﾃ】', 'category', [{
  id: message.guild.id,
}]);
message.guild.createChannel(`ﾃ│5 Kişilik Oda Kur`, 'voice')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "【ﾃ】5 Kişilik Odalar【ﾃ】")))

       message.channel.send("Gelişmiş Özel Oda Sistemi Aktif! ")
     
            })   
      
}
});
//----------------------------------Özel oda sistemi Son----------------------------// 
