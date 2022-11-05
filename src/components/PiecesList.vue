<script>
import { store } from '../store';
export default {
    data() {
        return {
            store,
            selectedPiece: {},
            currentPieceIndex: -1,
            lastPlayer: '',
        }
    },
    methods: {
        setSelectedPiece(piece, index) {
            if (!store.isGameEnded()) {
                this.selectedPiece = { ...piece };
                this.currentPieceIndex = index;
                this.updateSelectedPiece();
            }
        },
        updateSelectedPiece() {
            if (this.selectedPiece.type === store.currentPlayer) {
                const pieceIndex = store.getPieces().findIndex( (storePiece) => storePiece.type === this.selectedPiece.type && storePiece.value === this.selectedPiece.value );
                store.setSelectedPieceIndex(pieceIndex);
                store.setCurrentPiece(this.selectedPiece);
                this.lastPlayer = store.currentPlayer;
            } else {
                store.setSelectedPieceIndex(null);
            }
        }
    },
    computed: {
        getAvailablePieces() {
            return store.getPieces().filter(piece => piece.type === store.currentPlayer && piece.available > 0);
        },
    },
    updated() {
        if (this.lastPlayer !== store.currentPlayer) {
            this.currentPieceIndex = -1;
        }
    }
}
</script>

<template>
    <ul class="list-pieces">
        <li v-for="(piece, index) in getAvailablePieces" :key="index" class="piece" @click="setSelectedPiece(piece, index)"
            :class="{ 'type-blue': piece.type === 'B', 'type-red': piece.type === 'R', 'active': store.currentPlayer === piece.type, 'selected': this.currentPieceIndex === index }">
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
