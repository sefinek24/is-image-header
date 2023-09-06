// Regular expression pattern for matching URLs
const urlPattern = /(https?|http):\/\/[^\s/$.?#].[^\\s]*/i

module.exports = str => {
	// Check if the string is not empty and matches the URL pattern
	if (str && typeof str === 'string' && urlPattern.test(str)) {
		try {
			// Create a URL object to further validate the URL components
			const url = new URL(str);

			// Check if the URL protocol is 'http:', 'https:', or 'ftp:'
			if (url.protocol === 'http:' || url.protocol === 'https:' || url.protocol === 'ftp:') {
				return true;
			}
		} catch (error) {
			// Catch any errors that may occur during URL parsing
			console.error('Error parsing URL:', error);
		}
	}

	// If any of the checks fail, return false
	return false;
}
