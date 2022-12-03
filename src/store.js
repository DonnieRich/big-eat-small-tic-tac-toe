// store.js
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
            available: 3
        },
        {
            type: 'B',
            value: 3,
            placeholder: 'B',
            available: 3
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
            available: 3
        },
        {
            type: 'R',
            value: 3,
            placeholder: 'B',
            available: 3
        },
    ],
    selectedPieceIndex: null,
    errorMessage: '',
    showHideErrorMessage: false,
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
    setErrorMessage(message) {
        this.errorMessage = message;
        //this.showHideErrorMessage = true;
    },
    clearErrorMessage() {
        this.errorMessage = '';
    },
    checkVictoryConditions() {
        // checking...
        const currentPlayerSquares = this.gridSquares.filter((square) => square.value === this.currentPlayer);

        if (currentPlayerSquares.length >= 3) {

            this.victoryConditionIndex = this.victoryConditions.findIndex((condition) => {

                const checkedCondition = currentPlayerSquares.filter((square) => condition.includes(square.position));

                return checkedCondition.length === 3;

            });

        }

        this.setVictoryCondition();

        return this.victoryConditionIndex > -1 ? true : false;

    },
    updateRemainingPieces() {
        this.pieces[this.selectedPieceIndex].available--;
    },
    updateSquares(square) {
        const index = this.gridSquares.findIndex((gridSquare) => gridSquare.position === square.position);
        if (index > -1) {
            this.gridSquares[index] = square;
        } else {
            this.gridSquares.push(square);
        }
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