const isImageURL = require('../index.js');

describe('isImageURL', () => {
	it('should return the correct object for a valid image URL', async () => {
		const result = await isImageURL('https://cdn.sefinek.net/images/animals/cat/cat-story-25-1377426-min.jpg');
		expect(result).toEqual({
			success: true,
			code: 0,
			isImage: true,
		});
	});

	it('should return the correct object for a valid non-image URL', async () => {
		const result = await isImageURL('https://example.com');
		expect(result).toEqual({
			success: true,
			code: 0,
			isImage: false,
		});
	});

	it('should return the correct object for an invalid URL', async () => {
		const result = await isImageURL('not-a-valid-url');
		expect(result).toEqual({
			success: false,
			code: 1,
			isImage: null,
			message: 'Invalid URL',
		});
	});

	it('should return the correct object for a failed resource fetch', async () => {
		const result = await isImageURL('https://example.com/non-existing-image.jpg');
		expect(result).toEqual({
			success: false,
			code: 2,
			isImage: null,
			message: 'Failed to fetch the resource',
		});
	});

	it('should return the correct object for a request error', async () => {
		const result = await isImageURL('https://invalid-host/non-existing-image.jpg');
		expect(result).toEqual({
			success: false,
			code: 3,
			isImage: null,
			message: expect.stringContaining('Error while fetching the resource'),
		});
	});
});
