// Класс игры — «судья». Знает правила и командует остальными:
// полем (Board), гоблином (Goblin) и табло (Score).
export default class Game {
  constructor(board, goblin, scoreBoard) {
    // Участники игры: их создаёт index.js и передаёт сюда
    this.board = board;
    this.goblin = goblin;
    this.scoreBoard = scoreBoard;

    // Номер клетки, где сейчас гоблин. -1 значит «ещё нигде»
    this.currentIndex = -1;
    // Очки за попадания
    this.score = 0;
    // Сколько гоблинов пропущено
    this.misses = 0;
    // Попали ли по ТЕКУЩЕМУ гоблину (сбрасывается при каждом прыжке)
    this.hit = false;
    // Закончилась ли игра (после этого клики не считаются)
    this.isOver = false;
  }

  // Случайный номер клетки, не совпадающий с текущим
  getRandomIndex() {
    // Math.random() даёт 0..0.999, умножаем на 16 и округляем вниз: 0..15
    let newIndex = Math.floor(Math.random() * this.board.size);
    // Пока номер совпадает с текущим, генерируем заново
    while (newIndex === this.currentIndex) {
      newIndex = Math.floor(Math.random() * this.board.size);
    }
    return newIndex;
  }

  // Вызывается каждую секунду: проверяет промах и переносит гоблина
  moveGoblin() {
    // Сначала проверяем ПРОШЛОГО гоблина (до сброса флага hit!).
    // currentIndex !== -1 — гоблин уже появлялся; !this.hit — по нему не попали
    if (this.currentIndex !== -1 && !this.hit) {
      this.misses += 1;
      this.scoreBoard.update(this.score, this.misses);

      // 5 промахов — конец игры
      if (this.misses >= 5) {
        this.stop();
        return; // выходим, чтобы не показывать гоблина снова
      }
    }

    // Выбираем новую клетку и показываем там гоблина
    const index = this.getRandomIndex();
    const cell = this.board.getCell(index);
    this.hit = false; // по новому гоблину ещё не попали
    this.goblin.show(cell);
    this.currentIndex = index;
  }

  // Запуск игры
  start() {
    // Один обработчик клика на ВСЁ поле (делегирование событий).
    // Стрелочная функция нужна, чтобы внутри onClick this был объектом Game
    this.board.container.addEventListener("click", (event) => this.onClick(event));
    // Начальный счёт 0 | 0
    this.scoreBoard.update(this.score, this.misses);
    // Первый гоблин сразу, не дожидаясь секунды
    this.moveGoblin();
    // Каждую секунду — moveGoblin. Номер таймера сохраняем, чтобы потом остановить
    this.timer = setInterval(() => {
      this.moveGoblin();
    }, 1000);
  }

  // Остановка игры
  stop() {
    clearInterval(this.timer); // выключаем таймер — гоблин больше не прыгает
    this.isOver = true; // onClick будет это проверять
    this.goblin.hide();
    this.scoreBoard.showGameOver(this.score);
  }

  // Обработка клика по полю
  onClick(event) {
    // Игра закончилась — клики не считаем
    if (this.isOver) return;
    // Кликнули не по гоблину (а по пустой клетке) — выходим
    if (event.target !== this.goblin.element) return;
    // По этому гоблину уже попали — второе очко не даём
    if (this.hit) return;

    // Попадание!
    this.hit = true;
    this.score += 1;
    this.goblin.hide();
    this.scoreBoard.update(this.score, this.misses);
  }
}
