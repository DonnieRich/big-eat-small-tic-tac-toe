<script>

import { store } from './store';
import BaseGrid from './components/BaseGrid.vue'
import PiecesList from './components/PiecesList.vue';
import WinningHistory from './components/WinningHistory.vue';

export default {
    data() {
        return {
            store,
            version: __APP_VERSION__
        }
    },
    components: {
        BaseGrid,
        PiecesList,
        WinningHistory
    },
    computed: {

    },

}
</script>

<template>
    <BaseGrid />
    <PiecesList v-if="!store.isGameEnded()" />
    <button v-else @click="store.startNewGame()">Restart</button>
    <WinningHistory />
    <small>App version: {{ version }}</small>
</template>

<style>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
</style>
