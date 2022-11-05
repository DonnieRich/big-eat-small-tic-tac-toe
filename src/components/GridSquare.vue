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
            if (store.currentPiece.value - this.checkCurrentPiece() === 1 && this.currentPiece.type !== store.currentPiece.type) {
                store.clearErrorMessage();
                this.currentPiece = { ...store.currentPiece };
                if (!store.checkVictoryConditions()) {
                    store.changePlayer();
                } else {
                    store.setErrorMessage(`Player ${store.currentPlayer} win!`)
                }
            } else {
                store.setErrorMessage('Invalid move');
            }
        },
        getCurrentType() {
            return this.currentPiece.type ?? '';
        }
    },
    computed: {

    },
    mounted() {
        store.setGridSquare(this.number);
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
