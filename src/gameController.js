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
            playTurnsAutomatically();
            return true;
        }
        else if (otherPlayer.receiveAttack(x, y)) {
            swapPlayers();
            playTurnsAutomatically();
            return true;
        }
        return false;
    }

    const playTurnsAutomatically = () => {
        while (currentPlayer.isComputer() && getWinner() == null) {
            playTurn();
        }
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

    const getPlaceShipTurn = () => {
        return placeShipTurn == player1 ? "p1" : "p2";
    }

    const getWinner = () => {
        if (player1.allShipsSunk()) {
            return "p2";
        } else if (player2.allShipsSunk()) {
            return "p1";
        } else return null;
    }

    const getPlayer1Board = () => {
        return player1.getBoard();
    }

    const getPlayer2Board = () => {
        return player2.getBoard();
    }

    return {
        initialize,
        placeShip,
        playTurn,
        playTurnsAutomatically,
        readyForTurns,
        getCurrentPlayer,
        getWinner,
        getPlayer1Board,
        getPlayer2Board,
        getPlaceShipTurn
    }
})();

export {gameController};