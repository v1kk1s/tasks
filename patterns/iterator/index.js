function addMemeToDOM(meme) {
  const img = document.createElement('img');
  img.setAttribute('src', `/images/${meme.name}`);

  document.getElementById('app').appendChild(img);
}

class XKCDMeme {
  constructor() {
    this.index = 0;
    this.data = [
      { name: '1.png' },
      { name: '2.png' },
      { name: '3.png' },
      { name: '4.png' },
      { name: '5.png' },
    ];
  }

  hasNext() {
    return this.index < this.data.length;
  }
}

XKCDMeme.prototype.next = function (callback) {
  if (!this.hasNext()) {
    return false;
  } 

  let meme = this.data[this.index];
  callback(meme);
  this.index++;
  return this;
};

const xkcdMeme = new XKCDMeme();

xkcdMeme
  .next(addMemeToDOM)
  .next(addMemeToDOM)
  .next(addMemeToDOM)
  .next(addMemeToDOM)
  .next(addMemeToDOM)
  .next(addMemeToDOM);