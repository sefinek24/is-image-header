const IsImage = require('./index.js');

(async () => {
	const image = await IsImage('https://cdn.sefinek.net/images/animals/cat/cat-story-25-1377426-min.jpg');
	console.log(image); // { success: true, status: 200, isImage: true }
})();