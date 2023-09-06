const isImage = require('../index.js');

test('Check if a valid image URL leads to an image', async () => {
    const result = await isImage('https://cdn.sefinek.net/images/animals/cat/cat-story-25-1377426-min.jpg');
    expect(result).toBe(true);
});

test('Check if a valid non-image URL does not lead to an image', async () => {
    const result = await isImage('https://example.com');
    expect(result).toBe(false);
});

test('Check if an invalid URL does not lead to an image', async () => {
    const result = await isImage('not-a-valid-url');
    expect(result).toBe(false);
});

test('Check if an image URL with a different protocol leads to an image', async () => {
    const result = await isImage('http://cdn.sefinek.net/images/animals/cat/cat-story-25-1377426-min.jpg');
    expect(result).toBe(false);
});

test('Check if an image URL with query parameters leads to an image', async () => {
    const result = await isImage('https://example.com/image.jpg?size=medium');
    expect(result).toBe(false);
});
