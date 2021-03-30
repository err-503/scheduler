require('dotenv').config()

const Discord = require('discord.js');
const client = new Discord.Client();
const schedule = require('node-schedule');

const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(0, 6)];
rule.hour = 12;
rule.minute = 0;

const prefix = "!hu";

client.on("ready", () => {
	console.log("Bot online and active!");
	const job = schedule.scheduleJob(rule, function(){
		scheduledText();
	});
});

client.on("message", msg => {
	if(msg.content === `${prefix} testpoll`){
		scheduledText();
	}
	if(msg.content === `${prefix} help`){
		msg.reply("Tai aš, 'hu?' bot'as! Kiekvieną dieną 15:00, aš paklausiu, ar nori žaisti. Pažymėk savo atsakymą, ir po dviejų valandų aš atsiųsiu statistiką!")
	}
	if(msg.content === `amogus`){
		msg.reply("https://static.wikia.nocookie.net/jerma-lore/images/e/e3/JermaSus.jpg/revision/latest?cb=20201206225609")
	}
	if(msg.content === `a m o g u s`){
		msg.reply("https://external-preview.redd.it/-fyP2iR_I19APf_9k7EFdND6wa_ir1bqDGG09729bT4.png?width=320&crop=smart&format=pjpg&auto=webp&s=96a7866a47ac43163aec1121a62bf63046427163")
	}
	if(msg.content === `amogus drip`){
		msg.reply("https://cdn.discordapp.com/attachments/810096035128803358/824536054596894740/video0-8.mp4")
	}
});

function scheduledText(){
	client.channels.fetch(process.env.CHANNEL)
		.then(channel => {
			channel.send("@everyone Kas žais šiandien?")
				.then(sentMessage => {
					sentMessage.react('✅');
					sentMessage.react('❌');
					const filter = (reaction, user) => reaction.emoji.name === '✅';
					const collector = sentMessage.createReactionCollector(filter, { time: 7200000, dispose: true });
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
}
client.login(process.env.BOT_TOKEN);