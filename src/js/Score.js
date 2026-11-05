export default class Score {
  constructor(element) {
    this.element = element;
  }

  update(score, misses) {
    this.element.textContent = `Очки: ${score} | Промахи: ${misses} из 5`;
  }

  showGameOver(score) {
    this.element.textContent = `Игра окончена! Ваш счёт: ${score}`;
  }
}