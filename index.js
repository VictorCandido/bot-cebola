const Discord = require('discord.js');

const db = require('./model');

db.sequelize.sync().then(() => {
    console.log('Drop and re-sync db.');
});

const bot = new Discord.Client();

const botController = require('./controller/botController')

const token = 'Njk1NjQ4NDEyNzM3MjA4NTAw.XodPRw.NklZsMNzPal9VhXnmGE8417EHiM';
const prefix = '?';


const Bot = db.bot;


bot.on('ready', () => {
    console.log('The bot is online!')
})

bot.on('message', async msg => {
    if (msg.content.startsWith(prefix)) {
        const message = msg.content.split(prefix)[1];
        
        if (message.includes('new frase') || message.includes('nf')) {
            let novaFrase = message.split('"')[1];


            Bot.create({ frasesDoDia: novaFrase }).then(response => {
                msg.reply('Mensagem gravada -> ' + response.frasesDoDia)
            }).catch(err => {
                msg.reply('Falha ao cadastrar frase -> ' + err.message)
            });
        }

        if (message.includes('say frase') || message.includes('sf')) {

            Bot.findAll().then(frases => {
                console.log('Respose getFrases', frases)

                let aleatorio = Math.floor(Math.random() * frases.length);
                msg.reply(frases[aleatorio].frasesDoDia)

            }).catch(err => {
                console.log('Falha ao retornar frases -> ', err.message)
            });

            
        }
    }
})

bot.login(token);