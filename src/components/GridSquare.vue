<script>
import { store } from '../store';
export default {
    data() {
        return {
            store,
            isOccupied: false,
            currentPiece: {},
        }
    },
    props: {
        number: Number,
    },
    methods: {
        setOccupied() {
            this.isOccupied = true;
        },
        checkCurrentPiece() {
            return this.currentPiece.value ?? 0;
        },
        setCurrentPiece() {
            if (!store.isGameEnded()) {
                if (this.checkMove()) {
                    store.clearErrorMessage();
                    store.updateRemainingPieces();
                    this.currentPiece = store.getCurrentPiece();
                    store.updateSquares({ value: this.currentPiece.type, position: this.number });
                    if (!store.checkVictoryConditions()) {
                        store.changePlayer();
                    } else {
                        store.setErrorMessage(`Player ${store.currentPlayer} win!`);
                        store.endGame();
                    }
                } else {
                    store.setErrorMessage('Invalid move');
                }
            }
        },
        getCurrentType() {
            return this.currentPiece.type ?? '';
        },
        checkMove() {
            /*const moveDelta = store.getCurrentPiece().value - this.checkCurrentPiece();
            const smallestPieceAvailable = store.getPieces().find( (piece) => piece.available > 0 && piece.type === store.currentPlayer);
            const smallestAvailableDelta = smallestPieceAvailable.value - this.checkCurrentPiece();*/

            //return moveDelta === smallestAvailableDelta && moveDelta > 0;

            return store.getCurrentPiece().value > this.checkCurrentPiece() && this.currentPiece.type !== store.getCurrentPiece().type;

        }
    },
    computed: {
        pieceClasses() {
            return {
                'type-blue': this.currentPiece.type === 'B',
                'type-red': this.currentPiece.type === 'R',
                'small-piece': this.currentPiece.value === 1,
                'medium-piece': this.currentPiece.value === 2,
                'big-piece': this.currentPiece.value === 3,
            }
        }
    },
    mounted() {
        //store.setGridSquare(this.number);
    }
}
</script>

<template>
    <div class="square" @click="setCurrentPiece()">

        <span v-if="checkCurrentPiece() > 0" :class="pieceClasses">

        </span>

    </div>
</template>

<style scoped>
.square {
    background-color: #FFF;
    border: 1px solid grey;
    flex-basis: calc(100% / 3);
    aspect-ratio: 1 / 1;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* TODO - Gestire background-color degli pseudo elementi */
.type-blue {
    color: blue;
}

.type-red {
    color: red;
}

.small-piece,
.medium-piece,
.big-piece {
    width: 60%;
    height: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.small-piece:before,
.small-piece:after {
    content: ' ';
    height: 33%;
    width: 2%;
    display: block;
}

.medium-piece:before,
.medium-piece:after {
    content: ' ';
    height: 66%;
    width: 4%;
    display: block;
}

.big-piece:before,
.big-piece:after {
    content: ' ';
    height: 99%;
    width: 8%;
    display: block;
}

.small-piece:before,
.medium-piece:before,
.big-piece:before {
    transform: rotate(45deg);
}

.small-piece:after,
.medium-piece:after,
.big-piece:after {
    transform: rotate(-45deg);
}
</style>
