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
        <li v-for="(piece, index) in getAvailablePieces" :key="index" class="piece"
            @click="setSelectedPiece({ ...piece }, index)"
            :class="{ 'type-blue': piece.type === 'B', 'type-red': piece.type === 'R', 'active': store.currentPlayer === piece.type, 'selected': this.currentPieceIndex === index }">
            <div class="piece-item">
                <span>Available: {{ piece.available }}</span>
                <span>{{ piece.placeholder }}</span>
            </div>
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

.piece {
    width: calc(100% / 3);
    height: 80px;
    border: 1px solid grey;
    background-color: #ffffc1;
    display: flex;
    justify-content: center;
    align-items: center;
}

.piece-item {
    display: flex;
    flex-direction: column;
}

.piece-item span:first-child {
    color: black;
    font-size: 0.75rem;
}

.piece-item span:last-child {
    font-size: 1rem;
    font-weight: bold;
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
