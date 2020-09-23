const Discord = require('discord.js');
const client = new Discord.Client();
exports.run = (client, message) => {
  if (message.channel.type !== 'dm') {
    const ozelmesajkontrol = new Discord.RichEmbed()
    .setColor("36393F")
    .setTimestamp()
     .setAuthor(`${client.user.username}`, client.user.avatarURL)
    .setDescription(' **İŞTE BENİ YAPAN GÜLÜM BALIM CANIM İYİKİ YAPAN KRAL <a:realitytac:754282556458795118>   ** ⺈ᴍᴇʀᴄᴜʀɪᴀɴʙᴇʏﾃ#6666 ve BİR BOKA YARAMAYIP EKLE DİYEN ﾃ ๖ۣۜAURİCON〝✯ÃNÃRCHỸ✯#0040 ŞAKA ŞAKA KARDEŞİM CANIMDAN ÖTE SAMETE TEŞEKKÜR EDERİM BOTA DESTEĞİNDEN DOLAYI (prenses irem ve melek) ** ');
    message.channel.sendEmbed(ozelmesajkontrol) }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yapımcım','yapımcı','yapımcılarım','yapımcılar',],
  permLevel: 0
};
exports.help = {
  name: 'yapımcım',
  description: 'Yapımcımı Gosterir.',
  usage: 'yapımcım'
};
