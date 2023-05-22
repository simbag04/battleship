import { gameController } from "./gameController";
import { Gameboard } from "./gameboard";

const domController = (() => {
    let p1 = document.querySelector(".board1");
    let p2 = document.querySelector(".board2");
    let resetButton = document.querySelector("#reset");
    let orientationButton = document.querySelector("#orientation");

    resetButton.addEventListener('click', () => {
        initialize();
    })

    orientationButton.addEventListener('click', () => {
        let prev = orientationButton.textContent;
        orientationButton.textContent = prev == "Vertical" ? "Horizontal" : "Vertical";
    })

    const initialize = () => {
        gameController.initialize(false, true);
        initializeBoard(p1, "p1");
        initializeBoard(p2, "p2");
        document.querySelector(".orientation").style.display = "flex";
        let winnerDiv = document.querySelector(".winner");
        winnerDiv.textContent = "";
    }
    
    const initializeBoard = (parent, name) => {
        parent.innerHTML = "";
        let board = name == "p1" ? gameController.getPlayer1Board() : gameController.getPlayer2Board();
        for (let i = 0; i < 15; i++) {
            let row = document.createElement('div');
            row.classList.add('row');

            for (let j = 0; j < 15; j++) {
                let cell = document.createElement('div');
                cell.classList.add('cell');
                cell.id = name + "x:" + i + "y:" + j;
                cell.addEventListener('click', (e) => cellClickEventHandler(e));

                if (board.hasShip(i, j) && name == "p1") {
                    cell.style['background-color'] = 'green';
                }

                if (board.alreadyAttacked(i, j)) {
                    if (board.hasShip(i, j)) {
                        cell.style['backgroundColor'] = 'red';
                    }
                    else cell.style['backgroundColor'] = 'gray';
                }
                row.appendChild(cell);
            }
            parent.appendChild(row);
        }
    }

    const cellClickEventHandler = (e) => {
        let id = e.target.id;
        let board = id.slice(0, 2);
        let gameboard = board == "p1" ? p1 : p2;

        if (!gameController.readyForTurns()) {
            let placeShipTurn = gameController.getPlaceShipTurn();
            if (placeShipTurn == board) {
                let orientation = orientationButton.textContent == "Vertical";
                gameController.placeShip(getXFromId(id), getYFromId(id), orientation);
                initializeBoard(gameboard, board);
                if (gameController.readyForTurns()) {
                    document.querySelector(".orientation").style.display = "none";
                }
            }
        } 
        else if (!gameController.getWinner())
        {
            
            if (gameController.getCurrentPlayer() != board) {
                gameController.playTurn(getXFromId(id), getYFromId(id));
                initializeBoard(p1, "p1");
                initializeBoard(p2, "p2");

                if (gameController.getWinner()) {
                    let winnerDiv = document.querySelector(".winner");
                    let winner = gameController.getWinner();
                    winnerDiv.textContent = winner == "p2" ? "Computer wins!" : "You win!";
                }
            }
        }
    }

    const getXFromId = (id) => {
        let num = id.slice(5, 6);
        if (num != 'y') {
            return Number(id.slice(4, 6));
        }
        return Number(id.slice(4, 5));
    }

    const getYFromId = (id) => {
        let index = id.indexOf('y');
        
        return Number(id.slice(index + 2, id.length));
    }

    return {
        initialize
    }
})();

export { domController };