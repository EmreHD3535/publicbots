const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {
    const data = await db.fetch(`snipe.id.${message.guild.id}`)
    if(!data) {
    const snipe2 = new Discord.RichEmbed()
  .setAuthor(client.user.username, client.user.avatarURL)
  .setDescription(`Hiç mesaj silinmemiş.`)
.setColor(`RANDOM`)
    message.channel.send({embed: snipe2});
          } else {
  let kullanıcı = client.users.get(data);
  const data2 = await db.fetch(`snipe.mesaj.${message.guild.id}`)
  const snipe = new Discord.RichEmbed()
  .setAuthor(kullanıcı.username, kullanıcı.avatarURL)
  .setDescription(`<a:tik:750997694276698173>   SON SİLİNEN MESAJI YAKALADIM! <a:tik:750997694276698173>    : ` + data2 )
.setColor(`RANDOM`)
  message.channel.send(snipe) }
}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 0
}

exports.help = {
 name: 'snipe',
 description: `Son silinen mesajı size gösterir.`,
 usage: 'snipe',
 kategori: '**EĞLENCE**',
 permLvl: 'BAN_MEMBERS'
};