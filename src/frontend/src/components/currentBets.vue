<template>
<userHeader subHeaderName="Bets Placed" />
<p>Your Current Bets</p>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import userHeader from './userHeader.vue'

export default defineComponent({
    name: 'currentBetsComp',
    data() {
        return {}
    },
    components: {
        userHeader
    }
})
</script>

<style></style>
