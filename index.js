const axios = require('axios');
const isUrl = require('./is-url.js');
const { name, version, devDependencies } = require('./package.json');

const headers = {
	'User-Agent': `${name}/${version} (+https://github.com/sefinek/is-image-header)${process.env.JEST_WORKER_ID ? ` jest/${devDependencies.jest.replace(/^[^0-9]*/, '')}` : ''}`,
	'Accept': 'application/json',
	'Content-Type': 'application/json',
	'Cache-Control': 'no-cache',
	'Connection': 'keep-alive',
	'DNT': '1',
};

module.exports = async url => {
	if (!isUrl(url)) return { success: false, status: null, isImage: false, message: 'Invalid URL' };

	try {
		const res = await axios.head(url, {
			headers,
			timeout: 8000, // Request timeout
			validateStatus: status => status >= 200 && status < 511, // Accept all status codes
		});

		if (res.status === 404) {
			return { success: false, status: res.status, isImage: false, message: res.statusText };
		}

		if (res.status !== 200) {
			return { success: false, status: res.status, isImage: false, message: res.statusText };
		}

		if (res.headers['content-type']?.startsWith('image/')) {
			return { success: true, status: res.status, isImage: true };
		} else {
			return { success: true, status: res.status, isImage: false };
		}
	} catch (err) {
		return {
			success: false,
			status: null,
			isImage: null,
			message: `Error while fetching the resource: ${err.message}`,
		};
	}
};