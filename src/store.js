// store.js
import { reactive } from 'vue'

export const store = reactive({
    currentPlayer: 'B',
    currentPiece: {},
    startingPieces: [],
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
    victorySquares: [],

    setCurrentPlayer(player) {
        this.currentPlayer = player;
    },
    changePlayer() {
        const player = this.currentPlayer === 'B' ? 'R' : 'B';
        this.setCurrentPlayer(player);
        this.clearSelectedPieceIndex();
    },
    setCurrentPiece(piece) {
        this.currentPiece = { ...piece };
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
        // this.victoryConditionIndex = X;
        return false;
    },
    setVictorySquares(index) {
        this.victorySquares = [...this.victoryConditions[this.victoryConditionIndex]];
    }

})