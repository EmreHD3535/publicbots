//vmute.js:
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
  if(await data.fetch(`seslide2.${mention.user.id}.${message.guild.id}`)) return message.channel.send('Bu kullanıcı zaten seslide susturulmuş.')
  
  if(!args[1]) return message.channel.send('Bir süre belirt.\n1s, 1m, 1h, 1d, 1y ')
  let timereplace = args[1];
  let time = timereplace.replace(/y/, ' yıl').replace(/d/, ' gün').replace(/s/, ' saniye').replace(/m/, ' dakika').replace(/h/, ' saat')
  
  let reason;
  if(!args[2]) reason = 'Sebep girilmedi.'
  if(args[2]) reason = args.slice(2).join(' ')
  
  data.add('case', 1)
  const codare = await data.fetch('case')
  
  var tarih = new Date(Date.now())
  var tarih2 = ms(timereplace)
  var tarih3 = Date.now() + tarih2 + 10800000

  let atılmaay = moment(Date.now()+10800000).format("MM")
  let atılmagün = moment(Date.now()+10800000).format("DD")
  let atılmasaat = moment(Date.now()+10800000).format("HH:mm:ss")
  let bitişay = moment(tarih3).format("MM")
  let bitişgün = moment(tarih3).format("DD")
  let bitişsaat = moment(tarih3).format("HH:mm:ss")
  let muteatılma = `\`${atılmagün} ${atılmaay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${atılmasaat}\``
  let mutebitiş = `\`${bitişgün} ${bitişay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${bitişsaat}\``
  
  
  moment.locale('tr');
  
  if(mention.voiceChannel == undefined) {
  data.set(`atılamadı.${mention.user.id}.${message.guild.id}.atılma`, muteatılma)
  data.set(`atılamadı.${mention.user.id}.${message.guild.id}.bitiş`, tarih3)
  data.set(`atılamadı.${mention.user.id}.${message.guild.id}.atan1`, message.author.tag)
  data.set(`atılamadı.${mention.user.id}.${message.guild.id}.atan2`, message.author.avatarURL)
  data.set(`atılamadı.${mention.user.id}.${message.guild.id}.süre`, time)
  data.set(`atılamadı.${mention.user.id}.${message.guild.id}.sebep`, reason)
  data.set(`atılamadı.${mention.user.id}.${message.guild.id}.timereplace`, timereplace)
      data.set(`seslide2.${mention.user.id}.${message.guild.id}`, timereplace)
  client.channels.get('742042060412026880').send(`${mention} ${time} boyunca ses kanallarında susturuldu. (\`#${codare}\`)`)
  client.channels.get('742042060412026880').send(new Discord.RichEmbed().setColor('GREEN').setAuthor(message.author.tag, message.author.avatarURL).setDescription(`${mention} (\`${mention.user.id}\`) üyesi ses kanalında bulunmadığı için susturulamadı. Sesli kanala bağlanınca süresi başlayacak.

• Süre: \`${time}\`
• Sebep: \`${reason}\`
`))
  } else if(mention.voiceChannel) {
  
  data.set(`seslide2.${mention.user.id}.${message.guild.id}`, timereplace)
  client.channels.get('742042060412026880').send(`${mention} ${time} boyunca ses kanallarında susturuldu. (\`#${codare}\`)`)
  mention.setMute(true)
  client.channels.get('742042060412026880').send(new Discord.RichEmbed().setColor('GREEN').setAuthor(message.author.tag, message.author.avatarURL).setDescription(`${mention} (\`${mention.user.id}\`) üyesi ses kanallarında susturuldu.

• Mute Atılma: ${muteatılma}
• Mute Bitiş: ${mutebitiş}
• Süre: \`${time}\`

• Sebep: \`${reason}\`
`)) 
    
  setTimeout(async () => {
    if(!await data.fetch(`seslide2.${mention.user.id}.${message.guild.id}`)) return;
    if(mention.voiceChannel == undefined) {
        data.set(`atılamadı.${mention.user.id}.${message.guild.id}.atılma`, muteatılma)
  data.set(`atılamadı.${mention.user.id}.${message.guild.id}.bitiş`, tarih3)
  data.set(`atılamadı.${mention.user.id}.${message.guild.id}.atan1`, message.author.tag)
  data.set(`atılamadı.${mention.user.id}.${message.guild.id}.atan2`, message.author.avatarURL)
  data.set(`atılamadı.${mention.user.id}.${message.guild.id}.süre`, time)
  data.set(`atılamadı.${mention.user.id}.${message.guild.id}.sebep`, reason)
  data.set(`atılamadı.${mention.user.id}.${message.guild.id}.timereplace`, timereplace)
  client.channels.get('742042060412026880').send(new Discord.RichEmbed().setColor('RED').setAuthor(message.author.tag, message.author.avatarURL).setDescription(` (\`${mention.user.id}\`) üyesi susturulması biteceği süre içinde sesli kanallarda bulunmadığı için süresi sıfırlandı, bir kanala girerse tekrar başlayacak.

• Süre: \`${time}\`
• Sebep: \`${reason}\`
`))
  } else if(mention.voiceChannel) {
  data.delete(`seslide2.${mention.user.id}.${message.guild.id}`)
  mention.setMute(false)
  client.channels.get('742042060412026880').send(new Discord.RichEmbed().setColor('RED').setAuthor(message.author.tag, message.author.avatarURL).setDescription(` (\`${mention.user.id}\`) üyesinin ses kanallarında bulunan susturulması kaldırıldı.

• Mute Atılma: ${muteatılma}
• Mute Bitiş: ${mutebitiş}
• Süre: \`${time}\`

• Sebep: \`${reason}\`
`)) }
  }, ms(timereplace)) }

  
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'vmute'
};

