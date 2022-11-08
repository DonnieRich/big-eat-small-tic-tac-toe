<script>

import BaseGrid from './components/BaseGrid.vue'
import PiecesList from './components/PiecesList.vue';

export default {
    data() {
        return {
            version: __APP_VERSION__
        }
    },
    components: {
        BaseGrid,
        PiecesList,
    },
    computed: {

    },

}
</script>

<template>
    <BaseGrid />
    <PiecesList />
    <small>App version: {{ version }}</small>
</template>

<style>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
</style>
