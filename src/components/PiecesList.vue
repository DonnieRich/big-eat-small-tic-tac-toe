<script>
import { store } from '../store';
export default {
    data() {
        return {
            store,
        }
    },
    methods: {
        setSelectedPiece(index) {

            if (this.getAvailablePieces[index].type === store.currentPlayer) {
                store.setSelectedPieceIndex(index);
                store.setCurrentPiece(this.getAvailablePieces[index]);
            } else {
                store.setSelectedPieceIndex(null);
            }

        }
    },
    computed: {
        getAvailablePieces() {
            return store.pieces.filter(piece => piece.type === store.currentPlayer && piece.available > 0);
        },
    }
}
</script>

<template>
    <ul class="list-pieces">
        <li v-for="(piece, index) in getAvailablePieces" :key="index" class="piece" @click="setSelectedPiece(index)"
            :class="{ 'type-blue': piece.type === 'B', 'type-red': piece.type === 'R', 'active': store.currentPlayer === piece.type, 'selected': store.selectedPieceIndex === index }">
            {{ piece.placeholder }}</li>

    </ul>
</template>

<style scoped>
.list-pieces {
    list-style: none;
    display: flex;
    width: 100%;
}

.piece {
    width: calc(100% / 3);
    border: 1px solid grey;
    background-color: #FFF;
}

.active {
    border: 1px solid black;
}

.selected {
    background-color: aquamarine;
}

.type-blue {
    color: blue;
}

.type-red {
    color: red;
}
</style>
