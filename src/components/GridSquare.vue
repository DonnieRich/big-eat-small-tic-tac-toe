<script>
import { store } from '../store';
import BasePiece from './BasePiece.vue';
export default {
    data() {
        return {
            store,
            isOccupied: false,
            currentPiece: {},
        }
    },
    components: {
        BasePiece,
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

    },
    mounted() {
    }
}
</script>

<template>
    <div class="square" @click="setCurrentPiece()">

        <BasePiece v-if="checkCurrentPiece() > 0" :piece="currentPiece"></BasePiece>

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
</style>
