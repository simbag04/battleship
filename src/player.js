import { Gameboard } from "./gameboard";
import { Ship } from "./ship";

const Player = ((computer) => {
    let playerBoard = Gameboard();
    let comp = computer;
    let ships = [new Ship(5), new Ship(4), new Ship(3), new Ship(3), new Ship(2)];
    let shipsPlaced = 0;

    const receiveAttack = (x, y) => {
        return allShipsPlaced() && playerBoard.receiveAttack(x, y);
    }

    const placeShip = (x, y, vertical) => {
        if (playerBoard.placeShip(ships[shipsPlaced], x, y, vertical)) {
            shipsPlaced++;
            return true;
        }
        return false;
    }

    const randomShipPlacements = () => {
        while (!allShipsPlaced()) {
            let rand_x = getRandomInt(15);
            let rand_y = getRandomInt(15);
            let rand_vert = getRandomInt(2) == 1 ? true : false;
            placeShip(rand_x, rand_y, rand_vert);
        }
    }

    const allShipsPlaced = () => {
        return shipsPlaced == 5;
    }

    const isComputer = () => {
        return comp;
    }

    const getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
    }

    const allShipsSunk = () => {
        return playerBoard.allShipsSunk();
    }

    const getBoard = () => {
        return playerBoard;
    }

    return {
        placeShip,
        receiveAttack,
        allShipsPlaced,
        isComputer,
        randomShipPlacements,
        allShipsSunk,
        getBoard
    }
});

export {Player}