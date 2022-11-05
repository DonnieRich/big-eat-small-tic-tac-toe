<script>
import { store } from '../store';
import GridSquare from './GridSquare.vue';
export default {
    data() {
        return {
            store,
            rows: 3,
            winningCondition: []
        }
    },
    components: {
        GridSquare,
    },
    methods: {
        checkWinningCondition(index) {
            return this.winningCondition.includes(index);
        }
    },
    updated() {
        this.winningCondition = store.getVictoryCondition();
    }

}
</script>

<template>

    <div v-if="store.errorMessage.length > 0" class="message">{{ store.errorMessage }}</div>
    <div class="grid">
        <GridSquare v-for="i in (rows * 3)" :number="i" :class="{ winning: checkWinningCondition(i) }" />
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
    background-color: orange;
}
</style>
