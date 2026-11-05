import goblin from '../img/goblin.png';

export default class Goblin {
  constructor() {
    this.element = document.createElement("img");
    this.element.src = goblin;
    this.element.alt = "гоблин";
    this.element.className = "goblin";
  }

  show(cell) {
    cell.appendChild(this.element);
  }

  hide() {
    this.element.remove();
  }
}