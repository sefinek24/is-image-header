module.exports = str => {
	if (typeof str !== 'string') return false;

	try {
		const url = new URL(str);
		return url.protocol === 'http:' || url.protocol === 'https:';
	} catch {
		return false;
	}
};