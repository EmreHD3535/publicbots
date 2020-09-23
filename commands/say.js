const Discord = require('discord.js');

exports.run = async (client, message, args) => {
	if (!message.guild) return message.author.sendMessage('Bu Komutu Sadece Sunucularda Kulanabilirsiniz!');

    const voiceChannels = message.guild.channels.filter(c => c.type === 'voice');
    let count = 0;
    for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;
  let tag = 'ﾃ'
    const codare = new Discord.RichEmbed()
        .setColor("RED")
    .setTitle(`**SUNUCUMUZUN TOPLAM KULLANICI PANELİ**`)
    .setThumbnail ("https://cdn.discordapp.com/attachments/608256545603452938/754336468335329379/output_free_1.gif")
        .addField("<a:ritimnota:727382095797944451> Sunucudaki üye sayısı<a:ritimnota:727382095797944451> ", message.guild.memberCount)
        .addField("<a:yldz:750759452193325056> Çevrimiçi üye sayısı<a:yldz:750759452193325056> ", message.guild.members.filter(m => !m.user.bot && m.user.presence.status !== "offline").size)
        .addField("<a:sssss:750761246906646598> Seslideki üye sayısı<a:sssss:750761246906646598> ", count)
        .addField("<a:realitytac:754282556458795118> Tagdaki üye sayısı<a:realitytac:754282556458795118> ", message.guild.members.filter(m => m.user.username.includes(tag)).size)
    message.channel.send(codare);

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['sayı'],
    permLevel: 0
};

exports.help = {
    name: 'say',
    description: 'Say',
}

