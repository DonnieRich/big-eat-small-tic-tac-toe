<script>
import { store } from '../store';
export default {
    data() {
        return {
            store,
        }
    },
}
</script>

<template>
    <ul v-if="store.winningHistory.length > 0" class="list-pieces">
        <li v-for="(win, index) in store.winningHistory" :key="index" class="piece-item">
            <span>Player: {{ win.player }} - Points: {{ win.points }}</span>
        </li>
    </ul>
    <div v-else>No history available</div>
</template>

<style scoped>
.list-pieces {
    list-style: none;
}

.list-pieces li {
    border-bottom: 1px solid gray;
    padding: 0.75rem;
}
</style>
