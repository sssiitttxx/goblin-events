import "./style.css";
import Board from "./js/Board";
import Goblin from "./js/Goblin";
import Game from "./js/Game";

const board = new Board(document.getElementById("grid"), 16);
board.draw();

const goblin = new Goblin();
const game = new Game(board, goblin);
game.start();