import { Ship } from "./ship";

const Gameboard = (() => {
    let ships = [];
    let hitsInfo = Array(15).fill().map(() => Array(15).fill(0));

    /* 
    This function places a ship on the gameboard.
    Parameters: 
     - ship: ship to be placed
     - startX: starting x-coordinate of the ship
     - startY: starting y-coordinate of the ship
     - vertical: true if ship should be placed vertically, false if should be placed horizontally
    Returns: true if ship was succesfully placed, false otherwise
    */
    const placeShip = (ship, startX, startY, vertical) => {
        let shipLength = ship.length;

        if (!checkShipPlacement(ship, startX, startY, vertical)) return false;

        // ship can be placed, so place it
        ships.push(ship);
        let shipPos = ships.length;
        if (vertical) {
            for (let i = startX; i < startX + shipLength; i++) {
                hitsInfo[i][startY] = setOnesDigit(0, shipPos);
            }
        } else {
            for (let i = startY; i < startY + shipLength; i++) {
                hitsInfo[startX][i] = setOnesDigit(0, shipPos);
            }
        }
        
        return true;

    }

    const checkShipPlacement = (ship, startX, startY, vertical) => {
        let shipLength = ship.length;

        // check if ship can be placed
        if (vertical) {
            for (let i = startX; i < startX + shipLength; i++) {
                if (i >= hitsInfo.length || hitsInfo[i][startY] != 0) {
                    return false;
                }
            }
        } else {
            for (let i = startY; i < startY + shipLength; i++) {
                if (i >= hitsInfo.length || hitsInfo[startX][i] != 0) {
                    return false;
                }
            }
        }

        return true;
    }

    /* 
    This function receives an attack.
    Parameters:
     - x: x-coordinate of attack
     - y: y-coordinate of attack
    Returns: true if attack was a hit, false if not
    */

    const receiveAttack = (x, y) => {
        if (alreadyAttacked(x, y)) return false;
        let ship = hitsInfo[x][y] % 10;
        hitsInfo[x][y] += 10;
        if (ship != 0) {
            ships[ship - 1].hit();
        } 
        return true;
    }

    /*
    This function returns true if all ships are sunk and false otherwise
    */

    const allShipsSunk = () => {
        for (let i = 0; i < ships.length; i++) {
            if (!ships[i].isSunk()) return false;
        }
        return true;
    }

    const alreadyAttacked = (x, y) => {
        return (Math.floor(hitsInfo[x][y] / 10)) != 0;
    }

    const hasShip = (x, y) => {
        return hitsInfo[x][y] % 10 != 0;
    }

    const setOnesDigit = (num, digit) => {
        // reset ones digit
        num -= num % 10;

        // add ones digit
        num += digit;

        return num;
    }

    return {
        placeShip,
        checkShipPlacement,
        receiveAttack,
        allShipsSunk,
        hasShip,
        alreadyAttacked
    }


});

export {Gameboard};