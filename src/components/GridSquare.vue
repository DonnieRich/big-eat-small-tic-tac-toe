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
        x: Number,
        y: Number,
        index: Number,
    },
    methods: {
        setOccupied() {
            this.isOccupied = true;
        },
        checkCurrentPiece() {
            return this.currentPiece.value ?? 0;
        },
        setCurrentPiece() {
            if (!this.store.isGameEnded()) {
                if (this.checkMove()) {
                    this.store.clearStatusMessage();
                    this.store.updateRemainingPieces();
                    this.currentPiece = this.store.getCurrentPiece();
                    this.store.updateSquares({ type: this.currentPiece.type, value: this.currentPiece.value, coords: { x: this.x, y: this.y } }, this.index);
                    if (!this.store.checkVictoryConditions(this.store.currentPlayer, { coords: { x: this.x, y: this.y } })) {
                        this.store.changePlayer();
                    } else {
                        this.store.setStatusMessage(`Player ${this.store.currentPlayer} win!`, 'success');
                        this.store.endGame();
                    }
                } else {
                    this.store.setStatusMessage('Invalid move', 'error');
                }
            }
        },
        getCurrentType() {
            return this.currentPiece.type ?? '';
        },
        checkMove() {
            return this.store.getCurrentPiece().value > this.checkCurrentPiece() && this.currentPiece.type !== this.store.getCurrentPiece().type;
        }
    },
    computed: {

    },
    mounted() {
    },
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
