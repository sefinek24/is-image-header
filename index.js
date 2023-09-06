const http = require('http');
const https = require('https');
const isUrl = require('./is-url.js');
const { name, version } = require('./package.json');

const options = {
	method: 'GET',
	headers: {
		'User-Agent': `${name}/${version} (+https://github.com/sefinek24/is-image-header)`,
		'Accept': 'image/*',
	},
};

function isImageURL(url) {
	if (!isUrl(url)) {
		return {
			success: false,
			code: 1, // Custom error code for an invalid URL
			isImage: null,
			message: 'Invalid URL',
		};
	}

	return new Promise(resolve => {
		const protocol = url.startsWith('https') ? https : http;

		const request = protocol.request(url, options, res => {
			if (res.statusCode !== 200) {
				resolve({
					success: false,
					code: 2, // Custom error code for failed resource fetch
					isImage: null,
					message: 'Failed to fetch the resource',
				});
				return;
			}

			const contentType = res.headers['content-type'];
			if (contentType && contentType.startsWith('image/')) {
				resolve({ success: true, code: 0, isImage: true });
			} else {
				resolve({ success: true, code: 0, isImage: false });
			}
		});

		request.on('error', (err) => {
			console.error('Error while fetching the resource:', err.message);
			resolve({
				success: false,
				code: 3, // Custom error code for request error
				isImage: null,
				message: `Error while fetching the resource: ${err.message}`,
			});
		});

		// Set a timeout for the request
		request.setTimeout(8000, () => {
			request.destroy();
			resolve({
				success: false,
				code: 4, // Custom error code for request timeout
				isImage: null,
				message: 'Request timed out',
			});
		});

		request.end();
	});
}

module.exports = isImageURL;