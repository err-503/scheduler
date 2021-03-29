require('dotenv').config()

const Discord = require('discord.js');
const client = new Discord.Client();
const schedule = require('node-schedule');

const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(0, 6)];
rule.hour = 15;
rule.minute = 0;

client.on("ready", () => {
	console.log("Bot online and active!");
	scheduledText();
});

client.on("message", msg => {
	if(msg.content === "!test"){
		msg.reply("It me, the bot!")
	}
});

function scheduledText(){
	const job = schedule.scheduleJob(rule, function(){
		client.channels.fetch('810096035128803358')
			.then(channel => {
				channel.send("@everyone Kas žais šiandien?")
				.then(sentMessage => {
					sentMessage.react('✅');
					sentMessage.react('❌');
					const filter = (reaction, user) => reaction.emoji.name === '✅';
					const collector = sentMessage.createReactionCollector(filter, { time: 10800000, dispose: true });
					var people = -1;
					console.log(`zmones: ${people}`);
					collector.on('collect', () => {
						people = people + 1;
						console.log(`zmones: ${people}`);
					});
					collector.on('remove', () => {
						people = people - 1;
						console.log(`zmones: ${people}`);
					});
					collector.on('end', () => {
						channel.send(`Šiandien žais ${people}`)
						.then(() =>{
							if(people < 5){
								channel.send("5-stack nesusidaro 😦");
							} else if(people === 5){
								channel.send("5-stack yra 😄");
							} else {
								channel.send("Teks daryt dvi komandas!");
							}
						})
					});
				});
			});
	});
}
client.login(process.env.BOT_TOKEN);