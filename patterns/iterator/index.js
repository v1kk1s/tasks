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

    fetch(`/xkcd?id=${this.index}`)
      .then(resp => resp.json())
      .then((data) => {
        callback(data);
      });

    this.index++;
    return this;
  }

  hasNext() {
    return this.index <= this.dataLength;
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
