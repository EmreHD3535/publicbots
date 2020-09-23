const Discord = require('discord.js');
const data = require('quick.db')
const moment = require('moment')
const ms = require('ms')
exports.run = async (client, message, args) => {// chimp ♡'b#0308
  
  if(!message.member.roles.has('752560855043801211')) return message.channel.send('Bu komutu kullanabilmek için gerekli role sahip değilsin.')
  if(!args[0]) return message.channel.send('Bir kullanıcı belirt.')
  
  
  let mention = message.mentions.members.first() || message.guild.members.get(args[0]) || message.guild.members.find(user => user.user.username.toLowerCase().includes(args[0].toLowerCase()))
  if(!mention) return message.channel.send(`${args[0]}, kullanıcısını bu sunucuda bulamıyorum.`)
  if(message.member.highestRole.position < mention.highestRole.position) return message.channel.send('Bu kişinin rolü/rolleri seninkinden daha yüksekte.')
  if(!await data.fetch(`seslide2.${mention.user.id}.${message.guild.id}`)) return message.channel.send('Bu kullanıcı susturulmamış.')
  
  
  if(mention.voiceChannel == undefined) {
  data.set(`kaldır.${mention.user.id}.${message.guild.id}`, message.author.id)
    data.delete(`seslide2.${mention.user.id}.${message.guild.id}`)
         data.delete(`atılamadı.${mention.user.id}.${message.guild.id}.atan1`) 
 data.delete(`atılamadı.${mention.user.id}.${message.guild.id}.atan2`) 
 data.delete(`atılamadı.${mention.user.id}.${message.guild.id}.süre`) 
 data.delete(`atılamadı.${mention.user.id}.${message.guild.id}.sebep`) 
 data.delete(`atılamadı.${mention.user.id}.${message.guild.id}.timereplace`) 
 data.delete(`atılamadı.${mention.user.id}.${message.guild.id}.atılma`) 
 data.delete(`atılamadı.${mention.user.id}.${message.guild.id}.bitiş`) 
  data.delete(`kaldırılamadı.${mention.user.id}.${message.guild.id}.atılma`)
  data.delete(`kaldırılamadı.${mention.user.id}.${message.guild.id}.bitiş`)
  client.channels.get('742042060412026880').send(new Discord.RichEmbed().setColor('RED').setAuthor(message.author.tag, message.author.avatarURL).setDescription(`${mention} üyesinin susturulması sesli bir kanalda bulunmadığı için kaldırılamadı. Bir kanala giriş yapınca kaldırılacak.`))
  } else if(mention.voiceChannel) {
  mention.setMute(false)
        data.delete(`seslide2.${mention.user.id}.${message.guild.id}`)
    data.delete(`kaldır.${mention.user.id}.${message.guild.id}`)
     data.delete(`atılamadı.${mention.user.id}.${message.guild.id}.atan1`) 
 data.delete(`atılamadı.${mention.user.id}.${message.guild.id}.atan2`) 
 data.delete(`atılamadı.${mention.user.id}.${message.guild.id}.süre`) 
 data.delete(`atılamadı.${mention.user.id}.${message.guild.id}.sebep`) 
 data.delete(`atılamadı.${mention.user.id}.${message.guild.id}.timereplace`) 
 data.delete(`atılamadı.${mention.user.id}.${message.guild.id}.atılma`) 
 data.delete(`atılamadı.${mention.user.id}.${message.guild.id}.bitiş`) 
  data.delete(`kaldırılamadı.${mention.user.id}.${message.guild.id}.atılma`)
  data.delete(`kaldırılamadı.${mention.user.id}.${message.guild.id}.bitiş`)
  client.channels.get('742042060412026880').send(new Discord.RichEmbed().setColor('#494459').setAuthor(message.author.tag, message.author.avatarURL).setDescription(`${mention} üyesinin ses susturulması, ${message.author} tarafından kaldırıldı.`)) }

  
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'vunmute'
};
