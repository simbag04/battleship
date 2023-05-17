import { Player } from "./player";

const gameController = (() => {
    let player1;
    let player2;
    let currentPlayer = player1;
    let otherPlayer = player2;
    let placeShipTurn;

    const initialize = (p1, p2) => {
        player1 = Player(p1);
        player2 = Player(p2);
        currentPlayer = player1;
        otherPlayer= player2;

        if (player1.isComputer()) {
            player1.randomShipPlacements();
        } 
        else {
            placeShipTurn = player1;
        }
        
        if (player2.isComputer()) {
            player2.randomShipPlacements();
        } else {
            placeShipTurn = player2;
        }
    }

    const placeShip = (x, y, vertical) => {
        placeShipTurn.placeShip(x, y, vertical);
        if (placeShipTurn.allShipsPlaced()) {
            placeShipTurn = placeShipTurn === player1 ? player2 : player1;
        }
    }

    const playTurn = (x, y) => {
        if (currentPlayer.isComputer()) {
            let rand_x;
            let rand_y;
            do {
                rand_x = getRandomInt(15);
                rand_y = getRandomInt(15);
                
            } while (!otherPlayer.receiveAttack(rand_x, rand_y));

            swapPlayers();
            return true;
        }
        else if (otherPlayer.receiveAttack(x, y)) {
            swapPlayers();
            return true;
        }
        return false;
    }

    const readyForTurns = () => {
        return player1.allShipsPlaced() && player2.allShipsPlaced();
    }

    const swapPlayers = () => {
        let temp = currentPlayer;
        currentPlayer = otherPlayer;
        otherPlayer = temp;
    }
    const getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
    }

    const getCurrentPlayer = () => {
        return currentPlayer == player1 ? "p1" : "p2";
    }
    return {
        initialize,
        placeShip,
        playTurn,
        readyForTurns,
        getCurrentPlayer
    }
})();

export {gameController};