export default class Board {
  constructor(container, size) {
    this.size = size;
    this.cells = [];
    this.container = container;
  }
  draw() {
    for (let i = 0; i < this.size; i++) {
  const cell = document.createElement("div");
  cell.className = "cell";
  this.container.appendChild(cell);
  this.cells.push(cell);
}
  }
  getCell(index) {
  return this.cells[index];
}
}