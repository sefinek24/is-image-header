const { get } = require('axios');
const isUrl = require('is-url');
const { version } = require('./package.json');

module.exports = async url => {
	if (!url || !isUrl(url)) return false;

	try {
		const res = await get(url, { headers: { 'User-Agent': `is-image-header/${version} (https://github.com/sefinek24/is-image-header)` } });
		if (!(res.status >= 200 && res.status < 300)) return false;

		return (/image\//gi).test(res.headers['content-type']);
	} catch (err) {
		return false;
	}
};