// Подключаем стили: webpack соберёт их в main.css
import "./style.css";

// Подключаем классы из соседних файлов
import Board from "./js/Board";
import Goblin from "./js/Goblin";
import Score from "./js/Score";
import Game from "./js/Game";

// Поле: элемент страницы (куда рисовать) и число клеток
const board = new Board(document.getElementById("grid"), 16);
board.draw();

// Гоблин: внутри сам создаст картинку <img>
const goblin = new Goblin();

// Табло: элемент, в который оно пишет текст
const score = new Score(document.getElementById("score"));

// Игра получает всех участников и запускается
const game = new Game(board, goblin, score);
game.start();
