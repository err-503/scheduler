require('dotenv').config()

const Discord = require('discord.js');
const client = new Discord.Client();
const schedule = require('node-schedule');

const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(0, 6)];
rule.hour = 13;
rule.minute = 0;

var peopleYes;
var peopleMaybe;
let memeImage;
let memeVideo;

const prefix = "!hu";
const memes = new Discord.MessageEmbed() = {
	video: {
		url: memeVideo,
	},
	image: {
		url: memeImage,
	}
};

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
		msg.reply("Tai aš, 'hu?' bot'as! Kiekvieną dieną 16:00, aš paklausiu, ar nori žaisti. Pažymėk savo atsakymą, ir po trijų valandų aš atsiųsiu statistiką!")
	}
	if(msg.content === `amogus` || msg.content === `sus`){
		memeImage = "";
		memeVideo = "";
		memeImage = "https://static.wikia.nocookie.net/jerma-lore/images/e/e3/JermaSus.jpg/revision/latest?cb=20201206225609";
		msg.channel.send(memes);
	}
	if(msg.content === `a m o g u s`){
		memeImage = "";
		memeVideo = "";
		memeImage = "https://external-preview.redd.it/-fyP2iR_I19APf_9k7EFdND6wa_ir1bqDGG09729bT4.png?width=320&crop=smart&format=pjpg&auto=webp&s=96a7866a47ac43163aec1121a62bf63046427163";
		msg.channel.send(memes);
	}
	if(msg.content === `amogus drip`){
		memeImage = "";
		memeVideo = "";
		memeVideo = "https://cdn.discordapp.com/attachments/810096035128803358/824536054596894740/video0-8.mp4";
		msg.channel.send(memes);
	}
});

function scheduledText(){
	client.channels.fetch(process.env.CHANNEL)
		.then(channel => {
			channel.send("@Nuolatinis Kas žais šiandien?")
				.then(sentMessage => {
					sentMessage.react('✅');
					sentMessage.react('❌');
					sentMessage.react('❔');
					const filterYes = (reaction, user) => reaction.emoji.name === '✅';
					const collectorYes = sentMessage.createReactionCollector(filterYes, { time: 10800001, dispose: true });
					peopleYes = -1;
					console.log(`zmones: ${peopleYes}`);
					collectorYes.on('collect', () => {
						peopleYes = peopleYes + 1;
						console.log(`zmones: ${peopleYes}`);
					});
					collectorYes.on('remove', () => {
						peopleYes = peopleYes - 1;
						console.log(`zmones: ${peopleYes}`);
					});
					collectorYes.on('end', () => {
						channel.send(`Šiandien tikrai žais ${peopleYes} ir gal žais ${peopleMaybe}.`)
							.then(() =>{
								if(peopleYes + peopleMaybe < 5){
									channel.send("5-stack nesusidaro 😦");
								} else if(peopleYes + peopleMaybe === 5){
									channel.send("5-stack yra 😄");
								} else {
									channel.send("Teks daryt dvi komandas!");
								}
							})
					});
					const filterMaybe = (reaction, user) => reaction.emoji.name === '❔';
					const collectorMaybe = sentMessage.createReactionCollector(filterMaybe, { time: 10800000, dispose: true });
					peopleMaybe = -1;
					console.log(`zmones: ${peopleMaybe}`);
					collectorMaybe.on('collect', () => {
						peopleMaybe = peopleMaybe + 1;
						console.log(`zmones: ${peopleMaybe}`);
					});
					collectorMaybe.on('remove', () => {
						peopleMaybe = peopleMaybe - 1;
						console.log(`zmones: ${peopleMaybe}`);
					});
				});
		});
}
client.login(process.env.BOT_TOKEN);