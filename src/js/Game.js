export default class Game {
  constructor(board, goblin) {
    this.board = board;
    this.goblin = goblin;
    this.currentIndex = -1;
    this.score = 0;
    this.hit = false;
    this.misses = 0;
    this.isOver = false;
  }

  getRandomIndex () {
    let newIndex = Math.floor(Math.random() * this.board.size);
    while(newIndex ===  this.currentIndex) {
      newIndex = Math.floor(Math.random() * this.board.size);
    }
    return newIndex;
  }

  moveGoblin() {
    if (this.currentIndex !== -1 && !this.hit) {
      this.misses += 1;
      console.log('Промахи: ', this.misses);
      if(this.misses >= 5) {
      this.stop();
      return;
      }
      
    }
    const index = this.getRandomIndex();
    const cell = this.board.getCell(index);
    this.hit = false;
    this.goblin.show(cell);
    this.currentIndex = index;
  }

  start() {
    this.board.container.addEventListener('click', (event) => this.onClick(event));
    this.moveGoblin();
    this.timer = setInterval(() => {
      this.moveGoblin();
    }, 1000);
  }

  stop() {
    clearInterval(this.timer);
    this.isOver = true;
    this.goblin.hide();
    console.log('Игра закончена! Очки: ', this.score);
  }

  onClick(e) {
    if(this.isOver === true) return;
    if(e.target !== this.goblin.element) return;
    if(this.hit) return;
    this.hit = true;
    this.score += 1;
    this.goblin.hide();
    console.log('Очки: ', this.score);
  }


}