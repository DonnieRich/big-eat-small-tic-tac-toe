<script>
import { store } from '../store';
import GridSquare from './GridSquare.vue';
export default {
    data() {
        return {
            store,
            rows: 3,
        }
    },
    components: {
        GridSquare,
    }

}
</script>

<template>

    <div v-if="store.errorMessage.length > 0" class="message">{{ store.errorMessage }}</div>
    <div v-else>Current player {{ store.currentPlayer }}</div>
    <div class="grid">
        <GridSquare v-for="i in (rows * 3)" :number="i"
            :class="{ 'winning': store.getVictoryCondition().includes(i) }" />
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
