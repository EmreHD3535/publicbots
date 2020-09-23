const Discord = require('discord.js');//MercurianBEY


exports.run = function(client, message, args) {
      let guild = message.guild
    let jailrol = ("742513409052115026")
    let jaijdencıkınca = ("739255410694946837")
    let kanal = ("745804678238830705")
    let user = message.mentions.members.first()
    let sebep = args.slice(1).join(" ")
    if (!user) return message.reply('**Kime rol verileceğini yazmadın!**').catch(console.error).then(msg => msg.delete(100000000000000));;
    if (jailrol.length < 1) return message.reply('**Rolü belirtmedin**');
    user.addRole(jaijdencıkınca);
    user.removeRole(jailrol);
   const sChannel = message.guild.channels.find(c=> c.id ==="745804678238830705")

    const savas = new Discord.RichEmbed()
    .setTitle('UnJail')    
    .setDescription(`${user} Adlı Şahıs Jailden Çıkartıldı! \n Sebeb: **${sebep}**`)
    .setColor("RANDOM")
    .setFooter(`Yetkili : ${message.author.tag} `)
    .setTimestamp()
   sChannel.send(savas)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['unjail'],
  permLevel: 0
};
//MERCURİAN BEY
exports.help = {
  name: 'unjail',
  description: 'Kullanıcıyı Jailden Çıkarır',
  usage: 'unjail'
};