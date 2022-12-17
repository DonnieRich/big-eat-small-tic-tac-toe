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
    winningSquaresIndexes: [],
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
    checkVictoryConditions(currentPlayer, currentPlayerSquare, currentPlayerSquares = []) {

        let winning = false;

        if (currentPlayerSquares.length === 0) {
            currentPlayerSquares = this.gridSquares.filter((square) => square.type === this.currentPlayer);
        }

        if (currentPlayerSquares.length < this.rows) {
            return false;
        }

        // check every direction
        let squares = []
        squares.push(...this.findAdjacentVerticalSquares(currentPlayer, currentPlayerSquare));
        squares.push(...this.findAdjacentHorizontalSquares(currentPlayer, currentPlayerSquare));
        squares.push(...this.findAdjacentDiagonalSquaresTopLeft(currentPlayer, currentPlayerSquare));
        squares.push(...this.findAdjacentDiagonalSquaresTopRight(currentPlayer, currentPlayerSquare));

        // check again for the direction with adjacent squares of the same type
        if (squares.length === 3) {
            this.setWinningSquaresIndexes(squares);
            winning = true;
        }

        return winning;

    },
    findAdjacentVerticalSquares(currentPlayer, currentPlayerSquare, exclude = []) {
        return this.findAdjacentSquares([[0, -1], [0, 1]], currentPlayer, currentPlayerSquare, exclude);
    },
    findAdjacentHorizontalSquares(currentPlayer, currentPlayerSquare, exclude = []) {
        return this.findAdjacentSquares([[-1, 0], [1, 0]], currentPlayer, currentPlayerSquare, exclude);
    },
    findAdjacentDiagonalSquaresTopLeft(currentPlayer, currentPlayerSquare, exclude = []) {
        return this.findAdjacentSquares([[-1, -1], [1, 1]], currentPlayer, currentPlayerSquare, exclude);
    },
    findAdjacentDiagonalSquaresTopRight(currentPlayer, currentPlayerSquare, exclude = []) {
        return this.findAdjacentSquares([[-1, 1], [1, -1]], currentPlayer, currentPlayerSquare, exclude);
    },
    findAdjacentSquares(directions, currentPlayer, currentPlayerSquare, exclude = [], squares = [], adjacentSquareSameType = 1) {

        // if adjacentSquareSameType === 3, all the winning squares are found and are inside the exclude array
        if (adjacentSquareSameType === 3) {
            exclude.push(currentPlayerSquare);
            return exclude;
        }

        const { x, y } = currentPlayerSquare.coords;

        if (squares.length === 0) {
            squares = directions // all the possible directions
                .map(([xd, yd]) => ([x + xd, y + yd])) // adjust the starting point
                .filter(([x, y]) => x >= 0 && x < this.rows && y >= 0 && y < this.rows) // filter out those out of bounds
                .filter(([x, y]) => {
                    let isToBeIncluded = false;
                    if (exclude.length === 0) {
                        // if the exclude array is empty it means there is nothing to be filtered out
                        isToBeIncluded = true;
                    } else {
                        // isToBeIncluded gets the opposite value of the some() function. This means that if the square IS found inside the excluded array, it will be filtered out
                        isToBeIncluded = !exclude.some(excludedSquare => excludedSquare.coords.x === x && excludedSquare.coords.y === y);
                    }
                    return isToBeIncluded;
                })
                .filter(([x, y]) => this.gridSquares.some(square => square.coords.x === x && square.coords.y === y && square.type === currentPlayer)) // filter out those with the other player piece on it
        }

        if (squares.length > 0) {
            // updating the number of squares found
            adjacentSquareSameType++;

            // add the current square to the excluded list
            exclude.push(currentPlayerSquare);

            // get the coords for the first of the adjacent squares found
            const coords = { x: squares[0][0], y: squares[0][1] };

            // remove the element from the array
            squares.shift();

            // continue the search
            return this.findAdjacentSquares(directions, currentPlayer, { coords }, exclude, squares, adjacentSquareSameType);
        }

        // if we find nothing, we return an empty array
        return [];

    },
    setWinningSquaresIndexes(squares) {
        const winningSquaresIndexes = squares.map((square) => {
            return this.gridSquares.findIndex(gridSquare => gridSquare.coords.x === square.coords.x && gridSquare.coords.y === square.coords.y)
        });
        this.winningSquaresIndexes = winningSquaresIndexes;
    },
    updateRemainingPieces() {
        this.pieces[this.selectedPieceIndex].available--;
    },
    updateSquares(square, index) {
        this.gridSquares[index] = { ...square };
    },
    getVictoryCondition() {
        return [...this.winningSquaresIndexes];
    },
    isGameEnded() {
        return this.gameEnded;
    },
    endGame() {
        this.gameEnded = true;
    }

})