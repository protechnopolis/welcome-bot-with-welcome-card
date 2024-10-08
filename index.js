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
        // Construire l'URL de l'API avec le nom d'utilisateur et le nom du serveur
        const welcomeCardUrl = `https://api.aggelos-007.xyz/welcomecard?avatar=${member.user.displayAvatarURL({ format: 'png', dynamic: true })}&text1=${encodeURIComponent(member.user.username)}&text2=${encodeURIComponent(`bienvenue sur le serveur ${member.guild.name}`)}`;
        
        // Créer un embed avec EmbedBuilder
        const embed = new Discord.EmbedBuilder()
            .setColor('#0099ff') // Couleur de l'embed
            .setTitle(`Bienvenue ${member.user.username}!`) // Titre de l'embed
            .setImage(welcomeCardUrl) // Ajouter l'image de la carte de bienvenue
            .setFooter({ text: `Nous sommes heureux de t'accueillir sur ${member.guild.name}!` }); // Pied de page

        // Envoyer l'embed dans le canal
        await channel.send({ embeds: [embed] }).catch(() => {});
    }
});
