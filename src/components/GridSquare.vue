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
                if (this.checkMove() && this.currentPiece.type !== store.getCurrentPiece().type) {
                    store.clearErrorMessage();
                    store.updateRemainingPieces();
                    this.currentPiece = store.getCurrentPiece();
                    store.updateSquares({ value: this.currentPiece.type, position: this.number});
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
            const moveDelta = store.getCurrentPiece().value - this.checkCurrentPiece();
            const smallestPieceAvailable = store.getPieces().find( (piece) => piece.available > 0 && piece.type === store.currentPlayer);
            const smallestAvailableDelta = smallestPieceAvailable.value - this.checkCurrentPiece();

            return moveDelta === smallestAvailableDelta && moveDelta > 0;

        }
    },
    computed: {

    },
    mounted() {
        //store.setGridSquare(this.number);
    }
}
</script>

<template>
    <div class="square" @click="setCurrentPiece()">

        <span v-if="checkCurrentPiece() > 0"
            :class="{ 'type-blue': currentPiece.type === 'B', 'type-red': currentPiece.type === 'R' }">
            {{ currentPiece.placeholder }}
        </span>

    </div>
</template>

<style scoped>
.square {
    background-color: #FFF;
    border: 1px solid grey;
    flex-basis: calc(100% / 3);
}

.type-blue {
    color: blue;
}

.type-red {
    color: red;
}

</style>
