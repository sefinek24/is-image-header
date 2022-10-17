const isImage = require('../index.js');

test('Check that the link leads to a photo', async () => expect(await isImage('https://cdn.sefinek.net/images/animals/cat/cat-story-25-1377426-min.jpg')).toBe(true));
test('Check that the link does not lead to a photo', async () => expect(await isImage('https://sefinek.net')).toBe(false));