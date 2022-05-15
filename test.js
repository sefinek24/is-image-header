const isImage = require('./index.js');

(async () => {
	console.log(await isImage('https://cdn.skiffybot.xyz/images/animals/cat/cat-story-25-1377426-min.jpg'));
	console.log(await isImage('https://api.skiffybot.xyz'));
})();