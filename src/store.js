// store.js
import { stringifyStyle } from '@vue/shared';
import { reactive } from 'vue'

export const store = reactive({
    currentPlayer: 'B',
    currentPiece: {},
    gridSquares: [],
    pieces: [
        {
            type: 'B',
            value: 1,
            placeholder: 'S',
            available: 3
        },
        {
            type: 'B',
            value: 2,
            placeholder: 'M',
            available: 2
        },
        {
            type: 'B',
            value: 3,
            placeholder: 'B',
            available: 1
        },
        {
            type: 'R',
            value: 1,
            placeholder: 'S',
            available: 3
        },
        {
            type: 'R',
            value: 2,
            placeholder: 'M',
            available: 2
        },
        {
            type: 'R',
            value: 3,
            placeholder: 'B',
            available: 1
        },
    ],
    selectedPieceIndex: null,
    statusMessage: {
        text: '',
        status: 'info'
    },
    showHidestatusMessage: false,
    victoryConditions: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7],
    ],
    victoryConditionIndex: -1,
    victoryCondition: [],
    gameEnded: false,
    rows: 3,

    setCurrentPlayer(player) {
        this.currentPlayer = player;
    },
    changePlayer() {
        const player = this.currentPlayer === 'B' ? 'R' : 'B';
        this.setCurrentPlayer(player);
        this.clearSelectedPieceIndex();
    },
    getCurrentPiece() {
        return { ...this.currentPiece };
    },
    getPieces() {
        return this.pieces;
    },
    setCurrentPiece(piece) {
        this.currentPiece = piece;
    },
    setSelectedPieceIndex(index) {
        this.selectedPieceIndex = index;
    },
    clearSelectedPieceIndex() {
        this.setSelectedPieceIndex(null);
    },
    setGridSquare(number) {
        this.gridSquares.push({
            number: number,
            neighbours: []
        });
    },
    setStatusMessage(message, status) {
        this.statusMessage.text = message;
        this.statusMessage.status = status;
    },
    clearStatusMessage() {
        this.statusMessage.text = '';
        this.statusMessage.status = '';
    },
    checkVictoryConditions() {
        // TODO - update as follows: https://stackoverflow.com/a/70744553/12828579
        const currentPlayerSquares = this.gridSquares.filter((square) => square.value === this.currentPlayer);

        if (currentPlayerSquares.length >= this.rows) {

            this.victoryConditionIndex = this.victoryConditions.findIndex((condition) => {

                const checkedCondition = currentPlayerSquares.filter((square) => condition.includes(square.position));

                return checkedCondition.length === this.rows;

            });

        }

        this.setVictoryCondition();

        return this.victoryConditionIndex > -1 ? true : false;

    },
    checkVictoryConditionsImproved(currentPlayer, currentPlayerSquare) {

        // TODO - decide if it's better a recursive function or some other type of check inside the adjacents functions
        // in order to get 3 adjacent tiles of the same type.

        // I need to pass the current square to this function in order to check only the adjacent squares starting from it

        const currentPlayerSquares = this.gridSquares.filter((square) => square.value === this.currentPlayer);

        if (currentPlayerSquares.length >= this.rows) {

            const winningIndexes = [];
            // currentPlayerSquares.forEach((square, index) => {
            //     const vertical = this.findAdjacentVerticalSquares(square.position);

            // });

            // check every direction
            const verticalSquares = this.findAdjacentVerticalSquares(currentPlayer, currentPlayerSquare);
            const horizontalSquares = this.findAdjacentHorizontalSquares(currentPlayer, currentPlayerSquare);
            const diagonalSquaresTopLeft = this.findAdjacentDiagonalSquaresTopLeft(currentPlayer, currentPlayerSquare);
            const diagonalSquaresTopRight = this.findAdjacentDiagonalSquaresTopRight(currentPlayer, currentPlayerSquare);

            console.log('vertical', verticalSquares)
            console.log('horizontal', horizontalSquares)
            console.log('diagonalTopLeft', diagonalSquaresTopLeft)
            console.log('diagonalTopRight', diagonalSquaresTopRight)

        }
    },
    findAdjacentVerticalSquares(currentPlayer, coords) {
        console.log(`currentPlayer: ${currentPlayer} - coords: ${coords}`);
        return this.findAdjacentSquares([[0, -1], [0, 1]], currentPlayer, coords);
        // const [x, y] = coords;
        // return [[0, -1], [0, 1]] // all the possible directions
        //     .map(([xd, yd]) => ([x + xd, y + yd])) // adjust the starting point
        //     .filter(([x, y]) => x >= 0 && x < this.rows && y >= 0 && y < this.rows) // filter out those out of bounds
        //     .filter(([x, y]) => this.gridSquares.some( square => square.x === x && square.y === y && square.currentPlayerPiece === store.currentPlayer )) // filter out those with the other player piece on it
    },
    findAdjacentHorizontalSquares(currentPlayer, coords) {
        return this.findAdjacentSquares([[-1, 0], [1, 0]], currentPlayer, coords);
        // const [x, y] = coords;
        // return [[-1, 0], [1, 0]] // all the possible directions
        //     .map(([xd, yd]) => ([x + xd, y + yd])) // adjust the starting point
        //     .filter(([x, y]) => x >= 0 && x < this.rows && y >= 0 && y < this.rows) // filter out those out of bounds
        //     .filter(([x, y]) => this.gridSquares.some( square => square.x === x && square.y === y && square.currentPlayerPiece === store.currentPlayer )) // filter out those with the other player piece on it
    },
    findAdjacentDiagonalSquaresTopLeft(currentPlayer, coords) {
        return this.findAdjacentSquares([[-1, -1], [1, 1]], currentPlayer, coords);
        // const [x, y] = coords;
        // return [[-1, -1], [1, 1]] // all the possible directions
        //     .map(([xd, yd]) => ([x + xd, y + yd])) // adjust the starting point
        //     .filter(([x, y]) => x >= 0 && x < this.rows && y >= 0 && y < this.rows) // filter out those out of bounds
        //     .filter(([x, y]) => this.gridSquares.some( square => square.x === x && square.y === y && square.currentPlayerPiece === store.currentPlayer )) // filter out those with the other player piece on it
    },
    findAdjacentDiagonalSquaresTopRight(currentPlayer, coords) {
        return this.findAdjacentSquares([[-1, 1], [1, -1]], currentPlayer, coords);
        // const [x, y] = coords;
        // return [[-1, 1], [1, -1]] // all the possible directions
        //     .map(([xd, yd]) => ([x + xd, y + yd])) // adjust the starting point
        //     .filter(([x, y]) => x >= 0 && x < this.rows && y >= 0 && y < this.rows) // filter out those out of bounds
        //     .filter(([x, y]) => this.gridSquares.some( square => square.x === x && square.y === y && square.currentPlayerPiece === store.currentPlayer )) // filter out those with the other player piece on it
    },
    findAdjacentSquares(directions, currentPlayer, coords) {
        const { x, y } = coords;

        const map = directions.map(([xd, yd]) => ([x + xd, y + yd]));

        const filter = map.filter(([x, y]) => x >= 0 && x < this.rows && y >= 0 && y < this.rows);

        console.log(filter);

        const newFilter = this.gridSquares.some((square, index) => {
            console.log(square, index);
            console.log(`square.x: ${square.coords.x} === filter[0][0]: ${filter[0][0]}`);
            console.log(`square.y: ${square.coords.y} === filter[0][0]: ${filter[0][1]}`);
            return square.coords.x === filter[0][0] && square.coords.y === filter[0][1] && square.value === currentPlayer
        });
        console.log(this.gridSquares);
        console.log(newFilter);

        return directions // all the possible directions
            .map(([xd, yd]) => ([x + xd, y + yd])) // adjust the starting point
            .filter(([x, y]) => x >= 0 && x < this.rows && y >= 0 && y < this.rows) // filter out those out of bounds
            .filter(([x, y]) => this.gridSquares.some(square => square.x === x && square.y === y && square.value === currentPlayer)) // filter out those with the other player piece on it
    },
    updateRemainingPieces() {
        this.pieces[this.selectedPieceIndex].available--;
    },
    updateSquares(square, index) {
        //const index = this.gridSquares.findIndex((gridSquare) => gridSquare.position === square.position);
        /*const index = this.gridSquares.findIndex((gridSquare) => gridSquare.coords.every((coord) => square.coords.includes(coord)));
        if (index > -1) {
            this.gridSquares[index] = square;
        } else {
            this.gridSquares.push(square);
        }*/
        this.gridSquares[index] = { ...square };
    },
    getVictoryCondition() {
        return [...this.victoryCondition];
    },
    setVictoryCondition() {
        this.victoryCondition = this.victoryConditionIndex > -1 ? [...this.victoryConditions[this.victoryConditionIndex]] : [];
    },
    isGameEnded() {
        return this.gameEnded;
    },
    endGame() {
        this.gameEnded = true;
    }

})