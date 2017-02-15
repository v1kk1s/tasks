function addMemeToDOM(meme) {
  const img = document.createElement('img');
  img.setAttribute('src', `/images/${meme.name}`);

  document.getElementById('app').appendChild(img);
}

class XKCDMeme {
  constructor() {
    this.pending = false;
    this.callbackQueue = [];
    this.index = 0;
    this.data = [
      { name: '1.png' },
      { name: '2.png' },
      { name: '3.png' },
      { name: '4.png' },
      { name: '5.png' },
    ];
  }

  next(callback) {
    if (!this.hasNext()) {
      return false;
    }

    if (this.pending) {
      this.callbackQueue.push(callback);
    } else {
      const meme = this.data[this.index];
      callback(meme);
      this.index++;
    }

    return this;
  }

  hasNext() {
    return this.index < this.data.length;
  }
}

const xkcdMeme = new XKCDMeme();

xkcdMeme
  .next(addMemeToDOM)
  .next(addMemeToDOM)
  .next(addMemeToDOM)
  .next(addMemeToDOM)
  .next(addMemeToDOM)
  .next(addMemeToDOM);
