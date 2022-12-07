<script>
import { store } from '../store';
import BasePiece from './BasePiece.vue';
export default {
    data() {
        return {
            store,
            selectedPiece: {},
            currentPieceIndex: -1,
            lastPlayer: '',
        }
    },
    components: {
        BasePiece,
    },
    methods: {
        setSelectedPiece(piece, index) {
            if (!store.isGameEnded()) {
                this.selectedPiece = piece;
                this.currentPieceIndex = index;
                this.updateSelectedPiece();
            }
        },
        updateSelectedPiece() {
            if (this.selectedPiece.type === store.currentPlayer) {
                const pieceIndex = store.getPieces().findIndex((storePiece) => storePiece.type === this.selectedPiece.type && storePiece.value === this.selectedPiece.value);
                store.setSelectedPieceIndex(pieceIndex);
                store.setCurrentPiece({ ...this.selectedPiece });
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
        pieceItemClasses() {
            return {
                'blue-piece': this.piece.type === 'B',
                'red-piece': this.piece.type === 'R',
                'small-piece': this.piece.value === 1,
                'medium-piece': this.piece.value === 2,
                'big-piece': this.piece.value === 3,
            }
        }
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
        <li v-for="(piece, index) in getAvailablePieces" :key="index" class="piece-item"
            @click="setSelectedPiece({ ...piece }, index)"
            :class="{ 'blue-piece': piece.type === 'B', 'red-piece': piece.type === 'R', 'active': store.currentPlayer === piece.type, 'selected': this.currentPieceIndex === index }">
            <span>Available: {{ piece.available }}</span>
            <BasePiece :piece="piece"></BasePiece>
        </li>

    </ul>
</template>

<style scoped>
.list-pieces {
    list-style: none;
    display: flex;
    width: 100%;
    padding: 50px;
    justify-content: center;
}

.piece-item {
    width: calc(100% / 3);
    aspect-ratio: 1 / 1;
    background-color: #ffffc1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.piece-holder {
    width: 100%;
    height: 100%;
}

.active {
    border: 1px solid black;
}

.selected {
    background-color: aquamarine;
}

.blue-piece {
    color: #061735;
}

.red-piece {
    color: #AE0000;
}
</style>
