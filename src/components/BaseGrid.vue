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
            for (let x = 0; x < this.store.rows; x++) {
                for (let y = 0; y < this.store.rows; y++) {
                    this.gridSquares.push([x, y]);
                }
            }
        }
    }

}
</script>

<template>

    <div v-if="store.errorMessage.length > 0" class="message">{{ store.errorMessage }}</div>
    <div v-else>Current player {{ store.currentPlayer }}</div>
    <div class="grid">
        <GridSquare v-for="(coords, index) in gridSquares" :coords="coords" :index="index"
            :class="{ 'winning': store.getVictoryCondition().includes(index) }" />
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
</style>
