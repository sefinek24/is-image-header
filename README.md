## 🌍 » What is that?
This module checks if the URL leads to a photo by analyzing the header.

## 🤔 » Installation
```bash
npm install is-image-header
````

## 📝 » Usage
### • Async/await example
```js
const isImage = require('is-image-header');

(async () => {
    console.log(await isImage('https://cdn.sefinek.net/images/animals/cat/cat-story-25-1377426-min.jpg')); // { success: true, code: 0, isImage: true }
    console.log(await isImage('https://sefinek.net')); // { success: true, code: 0, isImage: false }
})();
```

### • Promise example
```js
const isImage = require('is-image-header');

isImage('https://cdn.sefinek.net/images/animals/cat/cat-story-25-1377426-min.jpg').then(data => console.log(data)); // { success: true, code: 0, isImage: true }
isImage('https://sefinek.net').then(data => console.log(data)); // { success: true, code: 0, isImage: false }
```

## 🤝 » Help
Open new [Issue](https://github.com/sefinek24/is-image-header/issues/new/choose) on GitHub.