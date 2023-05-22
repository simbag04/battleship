import { Ship } from "./ship";
import { Gameboard } from "./gameboard";
import { Player } from "./player";
import { gameController } from "./gameController";
import {describe, test, expect} from '@jest/globals'

describe('Ship module', () => {

    test('ship getting hit', () => {
        let s1 = new Ship(2);
        s1.hit();
        expect(s1.hits).toBe(1);
    });

    test('ship getting sunk', () => {
        let s1 = new Ship(2);
        s1.hit();
        s1.hit();
        expect(s1.isSunk()).toBe(true);
    });  

});

describe('Gameboard module', () => {

    test('place overlapping ships', () => {
        let board = Gameboard();
        expect(board.placeShip(new Ship(5), 0, 0, false)).toBe(true);
        expect(board.placeShip(new Ship(4), 0, 0, false)).toBe(false);
    })

    test('hit ship', () => {
        let board = Gameboard();
        expect(board.placeShip(new Ship(5), 0, 0, false)).toBe(true);

        // hit 
        expect(board.receiveAttack(0, 1)).toBe(true);

        // miss
        expect(board.receiveAttack(0, 5)).toBe(true);

        // already hit this spot
        expect(board.receiveAttack(0, 5)).toBe(false);

        // test that ship is there
        expect(board.hasShip(0, 0)).toBe(true);
        expect(board.hasShip(0, 1)).toBe(true);
        expect(board.hasShip(0, 2)).toBe(true);
        expect(board.hasShip(0, 3)).toBe(true);
        expect(board.hasShip(0, 4)).toBe(true);
    })

    test('all ships sunk', () => {
        let board = Gameboard();
        expect(board.placeShip(new Ship(2), 0, 0, true)).toBe(true);
        board.receiveAttack(0, 0);
        expect(board.allShipsSunk()).toBe(false);
        board.receiveAttack(1, 0);
        expect(board.allShipsSunk()).toBe(true);
    })

})

describe('Player module', () => {
    test('Place ships', () => {
        let p1 = Player(false);
        p1.placeShip(0, 0, true);

        // cannot receive attacks until all ships are placed
        expect(p1.receiveAttack(0, 0)).toBe(false);
        expect(p1.receiveAttack(5, 0)).toBe(false);

        // place remaining ships
        p1.placeShip(0, 1, true);
        p1.placeShip(0, 2, true);
        p1.placeShip(0, 3, true);
        p1.placeShip(0, 5, true);

        // receive attacks
        expect(p1.receiveAttack(0, 0)).toBe(true);
        expect(p1.receiveAttack(5, 0)).toBe(true);
    })
})

describe('Game controller module', () => {
    test('Place all ships', () => {
        gameController.initialize(true, false);

        expect(gameController.readyForTurns()).toBe(false);

        gameController.placeShip(0, 0, true);
        gameController.placeShip(0, 1, true)
        gameController.placeShip(0, 2, true)
        gameController.placeShip(0, 3, true)
        gameController.placeShip(0, 4, true)

        expect(gameController.readyForTurns()).toBe(true);
    })

    test('Current player', () => {
        gameController.initialize(true, false);
        gameController.placeShip(0, 0, true);
        gameController.placeShip(0, 1, true)
        gameController.placeShip(0, 2, true)
        gameController.placeShip(0, 3, true)
        gameController.placeShip(0, 4, true)

        // check current player
        expect(gameController.getCurrentPlayer()).toBe("p1");

        // play some turns
        expect(gameController.playTurn()).toBe(true);
        expect(gameController.playTurn(0, 0)).toBe(true);
        expect(gameController.getCurrentPlayer()).toBe("p2");
        expect(gameController.playTurn(0, 0)).toBe(false);

        // verify player didn't change since last turn failed
        expect(gameController.getCurrentPlayer()).toBe("p2");

    })

    test('Winner', () => {
        gameController.initialize(false, false);

        gameController.placeShip(0, 0, true);
        gameController.placeShip(0, 1, true)
        gameController.placeShip(0, 2, true)
        gameController.placeShip(0, 3, true)
        gameController.placeShip(0, 4, true)

        gameController.placeShip(0, 0, true)
        gameController.placeShip(0, 1, true)
        gameController.placeShip(0, 2, true)
        gameController.placeShip(0, 3, true)
        gameController.placeShip(0, 4, true)  
        
        expect(gameController.readyForTurns()).toBe(true);

        gameController.playTurn(0, 0);
        gameController.playTurn(0, 0);
        gameController.playTurn(1, 0);
        gameController.playTurn(1, 0);
        gameController.playTurn(2, 0);
        gameController.playTurn(2, 0);
        gameController.playTurn(3, 0);
        gameController.playTurn(3, 0);
        gameController.playTurn(4, 0);
        gameController.playTurn(4, 0);

        gameController.playTurn(0, 1);
        gameController.playTurn(0, 1);
        gameController.playTurn(1, 1);
        gameController.playTurn(1, 1);
        gameController.playTurn(2, 1);
        gameController.playTurn(2, 1);
        gameController.playTurn(3, 1);
        gameController.playTurn(3, 1);

        gameController.playTurn(0, 2);
        gameController.playTurn(0, 2);
        gameController.playTurn(1, 2);
        gameController.playTurn(1, 2);
        gameController.playTurn(2, 2);
        gameController.playTurn(2, 2);

        gameController.playTurn(0, 3);
        gameController.playTurn(0, 3);
        gameController.playTurn(1, 3);
        gameController.playTurn(1, 3);
        gameController.playTurn(2, 3);
        gameController.playTurn(2, 3);

        gameController.playTurn(0, 4);
        gameController.playTurn(0, 4);
        gameController.playTurn(1, 4);

        expect(gameController.getWinner()).toBe("p1");
    })
})