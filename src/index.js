import Image from "../public/assets/img/brendan.jpg";

import "./index.less";

class Test {
  constructor() {
    document.write("hello world");
    this.renderImg();
  }
  renderImg() {
    const img = document.createElement("img");
    img.src = Image;
    document.body.appendChild(img);
  }
}

new Test();
