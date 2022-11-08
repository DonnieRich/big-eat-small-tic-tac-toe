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
    <div v-if="store.errorMessage.length > 0" class="message">
        {{ store.errorMessage }}
    </div>
</template>