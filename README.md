# 🌍 » What does it do?
This simple module checks if the given link leads to an image.

## 🤔 » Installation
```bash
npm install is-image-header
````

## 📝 » Usage
### • Async/await example
```js
const isImage = require('is-image-header');

(async () => {
    const example1 = await isImage('https://cdn.sefinek.net/images/animals/cat/cat-story-25-1377426-min.jpg');
    console.log(example1); // { success: true, status: 200, error: false, isImage: true }

    const example2 = await isImage('https://sefinek.net');
    console.log(example2); // { success: true, status: 200, error: false, isImage: false }
})();
```

### • Promise example
```js
const isImage = require('is-image-header');

isImage('https://cdn.sefinek.net/images/animals/cat/cat-story-25-1377426-min.jpg').then(console.log); // { success: true, status: 200, error: false, isImage: true }
isImage('https://sefinek.net').then(console.log); // { success: true, status: 200, error: false, isImage: false }
```

## 🤝 » Support
Join our [Discord server](https://discord.gg/53DBjTuzgZ) or open a new [Issue](https://github.com/sefinek/is-image-header/issues).

## ⭐ » Star
If you enjoy this module, please consider starring [the repository](https://github.com/sefinek/random-cat-img).

## 📜 » License MIT
<div align="center">
    Copyright 2023-2024 © by <a href="https://sefinek.net">Sefinek</a>. All Rights Reserved.
</div>