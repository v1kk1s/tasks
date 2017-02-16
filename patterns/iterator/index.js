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
      this.callbackQueue.push(this.nextRunner(addMemeToDOM));
    } else {
      this.pending = true;
      fetch(`/xkcd?id=${this.index}`)
        .then(resp => resp.json())
        .then((data) => {
          callback(data);
        })
        .then(() => {
          this.pending = false;
          this.index++;
          if (this.callbackQueue.length) {
            this.callbackQueue[0].apply(this);
            this.callbackQueue.shift();
          }
        });
    }

    return this;
  }

  hasNext() {
    return this.index <= this.dataLength;
  }

  nextRunner(callback) {
    return function () {
      this.next(callback);
    };
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
