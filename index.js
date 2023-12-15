const axios = require('axios');
const isUrl = require('./is-url.js');
const { name, version, devDependencies } = require('./package.json');

const defaultHeaders = {
	'User-Agent': `${name}/${version} (+https://github.com/sefinek24/is-image-header)${process.env.JEST_WORKER_ID === undefined ? '' : ` jest/${devDependencies.jest.replace('^', '')}`}`,
	'Accept': 'application/json',
	'Content-Type': 'application/json',
	'Cache-Control': 'no-cache',
	'CF-IPCountry': 'false',
	'CF-Visitor': '{"scheme":"https"}',
	'Connection': 'keep-alive',
	'DNT': '1',
	'Pragma': 'no-cache',
	'Referrer-Policy': 'strict-origin-when-cross-origin',
	'X-Content-Type-Options': 'nosniff',
	'X-Frame-Options': 'DENY',
	'X-XSS-Protection': '1; mode=block',
};

async function isImage(url) {
	if (!isUrl(url)) {
		return { success: false, status: 1, message: 'Invalid URL', error: false, isImage: false };
	}

	try {
		const response = await axios.get(url, {
			headers: { ...defaultHeaders },
			timeout: 10000, // Request timeout
			validateStatus: status => {
				return status >= 200 && status < 600; // Accept all status codes
			},
		});

		if (response.status === 404) {
			return { success: false, status: response.status, error: false, message: response.statusText, isImage: false };
		}

		if (response.status !== 200) {
			return { success: false, status: response.status, error: true, message: response.statusText, isImage: undefined };
		}

		const contentType = response.headers['content-type'];
		if (contentType && contentType.startsWith('image/')) {
			return { success: true, status: response.status, error: false, isImage: true };
		} else {
			return { success: true, status: response.status, error: false, isImage: false };
		}
	} catch (err) {
		return {
			success: false,
			status: 3,
			error: true,
			isImage: undefined,
			message: `Error while fetching the resource: ${err.message}`,
		};
	}
}

module.exports = isImage;