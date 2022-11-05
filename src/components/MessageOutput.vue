<script>
import { store } from '../store';
export default {
    data() {
        return {
            store,
        }
    },
    methods: {
        hideErrorMessage() {
            store.clearErrorMessage();
        }
    }
}
</script>

<template>
    <div v-if="store.errorMessage.length > 0" class="message" @click="hideErrorMessage()">
        {{ store.errorMessage }}
    </div>
</template>