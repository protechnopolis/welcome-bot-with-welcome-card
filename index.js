const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client({ intents: 3276799 });

client.login(config.token);
client.on('ready', () => {
    console.log(`[!] — Logged in as ${client.user.tag} (${client.user.id})`);
});

client.on('guildMemberAdd', async (member) => {
    const channels = config.channelIds.map(id => client.channels.cache.get(id)).filter(channel => channel != null);
    for (const channel of channels) {
        const welcomeCardUrl = `https://api.aggelos-007.xyz/welcomecard?avatar=${member.user.displayAvatarURL({ format: 'png', dynamic: true })}&text1=${encodeURIComponent(member.user.username)}&text2=${encodeURIComponent(`bienvenue sur le serveur ${member.guild.name}`)}`;
        
        const embed = new Discord.EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`Bienvenue ${member.user.username}!`)
            .setImage(welcomeCardUrl)
            .setFooter({ text: `Nous sommes heureux de t'accueillir sur ${member.guild.name}!` });

        await channel.send({ embeds: [embed] }).catch(() => {});
    }
});
