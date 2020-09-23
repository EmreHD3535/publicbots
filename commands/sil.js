const Discord = require('discord.js');
exports.run = async(client, message, args) => {
let fynx_code_sayı = args[0]  
if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("**:x: Yetersiz Yetki**");
if(isNaN(fynx_code_sayı)) return message.channel.send("**Sadece Sayı Giriniz.**");
if(!fynx_code_sayı) return message.channel.send("** KAÇ MESAJ SİLMEM GEREKTİĞİNİ YAZMAN GEREK**");
message.channel.bulkDelete(fynx_code_sayı).catch(console.error)
  message.channel.send(`**${fynx_code_sayı} ADET MESAJ BAŞARI İLE SİLİNDİ.!** <a:tik:752477155551739904>    `).then(fc => fc.delete(7000));
}
exports.conf = {
  enabled: false,
  guildOnly: true,
  aliases: ['sil'],
  permLevel: 0
};
exports.help = {
  name: 'sil',
  description: 'mesaj siiler',
  usage: 'sil 100'
};
