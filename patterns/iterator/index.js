function addMemeToDOM(meme) {
  const img = document.createElement('img');
  img.setAttribute('src', `/images/${meme.name}`);
  document.getElementById('app').appendChild(img);
}

class XKCDMeme {
  constructor() {
    this.pending = false;
    this.callbackQueue = [];
    this.index = 1;
    this.dataLength = 5;
  }

  next(callback) {
    if (!this.hasNext()) {
      return false;
    }

    if (this.pending) {
      this.callbackQueue.push(callback);
    } else {
      this.pending = true;
      this.getData(callback);
    }

    return this;
  }

  getData (callback) {
    fetch(`/xkcd?id=${this.index}`)
      .then(resp => resp.json())
      .then((data) => {
        callback(data);

        this.pending = false;
        this.index++;

        if (this.callbackQueue.length) {
          this.getData(this.callbackQueue[0]);
          this.callbackQueue.shift();
        }
      })
  }

  hasNext() {
    return this.index < this.dataLength;
  }
}

const xkcdMeme = new XKCDMeme();

xkcdMeme
  .next(addMemeToDOM)
  .next(addMemeToDOM)
  .next(addMemeToDOM)
  .next(addMemeToDOM)
  .next(addMemeToDOM);
