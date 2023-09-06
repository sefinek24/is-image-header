const http = require('http');
const https = require('https');
const isUrl = require('./is-url.js');
const { name, version } = require('./package.json');

const userAgent = `${name}/${version} (+https://github.com/sefinek24/is-image-header)`;

function isImageURL(url) {
	return new Promise((resolve, reject) => {
		if (!isUrl(url)) {
			console.error('Invalid URL:', url)
			resolve(false);
		}

		const protocol = url.startsWith('https') ? https : http;

		const options = {
			method: 'GET',
			headers: {
				'User-Agent': userAgent,
				'Accept': 'image/*', // Added the Accept header to specify that we expect images
			},
		};

		const request = protocol.request(url, options, (res) => {
			if (res.statusCode !== 200) {
				resolve(false); // Failed to fetch the resource
				return;
			}

			const contentType = res.headers['content-type'];
			if (contentType && contentType.startsWith('image/')) {
				resolve(true); // The resource is an image
			} else {
				resolve(false); // The resource is not an image
			}
		});

		request.on('error', (err) => {
			console.error('Error while fetching the resource:', err.message);
			reject(err); // Error while fetching the resource
		});

		// Set a timeout for the request (e.g., 10 seconds)
		request.setTimeout(10000, () => {
			request.destroy();
			resolve(false); // Request timed out
		});

		request.end();
	});
}

module.exports = isImageURL;