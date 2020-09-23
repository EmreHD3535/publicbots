const Discord = require('discord.js')
const moment = require('moment')
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')
const client = new Discord.Client();
require("moment-duration-format");


const prefix = ayarlar.prefix

exports.run = async (bot, msg, args) => {


      let user = msg.mentions.users.first() || msg.author;
          let simdikitarih = moment.utc(msg.createdAt).format('<a:emoji_133:750770554264485959> DD MM YYYY <a:emoji_133:750770554264485959> ');
    const kurulus = new Date().getTime() - user.createdAt.getTime();
    var kontrol;    const gün = moment.duration(kurulus).format("D")   

    if (kurulus < 1296000000) kontrol = ' Güvenilir Değil '
    if (kurulus > 1296000000) kontrol = ' Güvenilir  '
  
      let userinfo = {};
        
      userinfo.avatar= user.displayAvatarURL;
       
      userinfo.id = user.id;
        
      userinfo.od1 = msg.guild.members.get(user.id).user.presence.game || "Oynadığı bir oyun yok"
       
      userinfo.status = user.presence.status.toString()
        .replace("dnd", `Rahatsız Etmeyin`)
        .replace("online", `Çevrimiçi`)
        .replace("idle", `Boşta`)
        .replace("offline", `Çevrimdışı`)  
  
        userinfo.dctarih = moment.utc(msg.guild.members.get(user.id).user.createdAt).format('DD/MM/YYYY HH:mm')
  
        userinfo.dctarihkatilma = moment.utc(msg.guild.members.get(user.id).joinedAt).format('DD/MM/YYYY HH:mm')
  
        const uembed = new Discord.RichEmbed()
        
        .setAuthor(user.tag, userinfo.avatar)
        .setThumbnail(userinfo.avatar)
        .addField(`<a:kayiticin:752467865046745089>   ID`, userinfo.id, true)
        .addField(`<a:yildiz:752467874626404393>  Discord İsmi`,`${user.username}`,true)
        .setImage("https://cdn.discordapp.com/attachments/741337970421792801/752464270939127818/20200904_182905.jpg")
        .setColor('RANDOM')
        .addField(`<a:like:752467869303832626>  Katılım Tarihi`, userinfo.dctarihkatilma, true)
        .addField(`<a:emoji_4:745814479077507153>  Hesap Oluşturma Tarihi`, userinfo.dctarih, true)
        .addField(`<a:tik4:746163393370652804>   Durum`, userinfo.status, true)
        .addField(`<a:mavigec:752467869580918815>  Güvenirlik Seviye (3)`,kontrol  , true)
       
    
        .addField(`Roller:`, `${msg.guild.members.get(user.id).roles.filter(r => r.name !== "@everyone").map(r => r).join(' , ') || "``Bu kullanıcıda hiçbir rol bulunmuyor.``"}`, false)
        
        
        msg.channel.send(uembed)
        
  
    }
exports.conf = {
  enabled: true,
  guildOnly: true,
 aliases: ['kullanıcı', 'kullanıcıbilgi','profil','pf'],
  kategori: 'kullanıcı',
  permLevel: 0
};
exports.help = {
  name: 'bilgi',
  description: 'İstediğiniz kullanıcını bilgilerini gösterir.',
  usage: 'kullanıcı-bilgi'
};