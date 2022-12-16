<script>
import { store } from '../store';
import GridSquare from './GridSquare.vue';
export default {
    data() {
        return {
            store,
            gridSquares: []
        }
    },
    components: {
        GridSquare,
    },
    mounted() {
        this.generateSquares();
    },
    methods: {
        generateSquares() {
            for (let y = 0; y < this.store.rows; y++) {
                for (let x = 0; x < this.store.rows; x++) {
                    this.store.gridSquares.push({
                        coords: { x, y },
                        value: '',
                    });
                }
            }
        }
    },
    computed: {
        messageClasses() {
            return {
                'message-danger': this.store.statusMessage.status === 'error',
                'message-success': this.store.statusMessage.status === 'success',
            }
        }
    }

}
</script>

<template>

    <div v-if="store.statusMessage.text.length > 0" class="message" :class="messageClasses">{{ store.statusMessage.text
    }}
    </div>
    <div v-else class="message message-dark">Current player {{ store.currentPlayer }}</div>
    <div class="grid">
        <GridSquare v-for="(square, index) in store.gridSquares" :x="square.coords.x" :y="square.coords.y"
            :index="index" :class="{ 'winning': store.getVictoryCondition().includes(index) }" />
    </div>

</template>

<style scoped>
.grid {
    display: flex;
    flex-wrap: wrap;
    width: 500px;
    height: 500px;
    margin: 0 auto;
}

.winning {
    background-color: #67FA19;
}

.message {
    padding: 1rem;
    border-radius: 0.375rem;
    margin: 1rem 0;
}

.message-dark {
    color: #141619;
    background-color: #d3d3d4;
    border: 1px solid #bcbebf;
}

.message-danger {
    color: #842029;
    background-color: #f8d7da;
    border: 1px solid #f5c2c7;
}

.message-success {
    color: #0f5132;
    background-color: #d1e7dd;
    border: 1px solid #badbcc;
}
</style>
