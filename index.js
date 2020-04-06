const { Client, MessageEmbed } = require('discord.js');
const db = require('./model');
const { token } = require('./config')

db.sequelize.sync().then(() => {
    console.log('Drop and re-sync db.');
});

const client = new Client();
const Bot = db.bot;

const prefix = '/'

const totalAudios = 11

console.log(totalAudios)
console.log(process.env.token || token)

client.on('ready', () => {
    console.log('-----> The bot is running!!')

    client.user.setActivity('/help')
});

client.on('message', async message => {
    if ( !message.content.startsWith(prefix) ) return;
    if ( !message.guild ) return;

    const messageSplit = message.content.split(' ')
    const command = messageSplit[0];

    switch (command) {
        case '/help':
            
            const embed = new MessageEmbed()
            .setTitle('Help Picorruxo Bot!')
            .setColor(0xff0000)
            .setDescription(`
                - /audio, para ouvir um dos audios do Cebola (audios de 0 até ${totalAudios-1})
                - /frase, para ler uma frase do dia 
            `);
            
            message.channel.send(embed);

            break;
            
        case '/audio':
            
            if (message.member.voice.channel) {
                const chooseAudio = messageSplit[1] ? messageSplit[1] : false;

                const connection = await message.member.voice.channel.join();
        
                let audio = '';

                if (chooseAudio) {
                    if (parseInt(chooseAudio) > totalAudios - 1) {
                        message.reply('Não existe audio ' + chooseAudio + '. Audios permitidos, de 0 até ' + (totalAudios - 1));
                    }

                    audio = chooseAudio
                } else {
                    let aleatorio = Math.floor(Math.random() * totalAudios);
                    audio = aleatorio
                }

                const dispatcher = connection.play(`./songs/${audio}.ogg`);
        
                dispatcher.on('finish', () => message.member.voice.channel.leave())
                
            } else {
                message.reply('Você precisa estar em um canal de voz!');
            }

            break;
            
        case '/frase':
            
            const seccondCommand = messageSplit[1] ? messageSplit[1] : false;

            if (seccondCommand) {
                if (seccondCommand == 'create') {
                    const frase = message.content.split('"')[1];

                    if (frase) {    
                        Bot.create({ frasesDoDia: frase }).then(response => {
                            message.reply('Mensagem gravada -> ' + response.frasesDoDia)
                        }).catch(err => {
                            message.reply('Falha ao cadastrar frase -> ' + err.message)
                        });
                    } else {
                        message.reply('Beleza, palerma, agora só falta vc me dizer a frase né... xD')
                    }
                }
            } else {
                Bot.findAll().then(frases => {
                    let aleatorio = Math.floor(Math.random() * frases.length);

                    const embed = new MessageEmbed()
                    .setTitle('Frase da sorte!!')
                    .setColor(0x00a700)
                    .setDescription(frases[aleatorio].frasesDoDia);
                    
                    message.channel.send(embed);
                }).catch(err => {
                    console.log('Falha ao retornar frases -> ', err.message)
                });
            }

            break;
    }
  });

client.login(process.env.token || token);