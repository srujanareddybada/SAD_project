<template>
    <userHeader subHeaderName="Bet History"/>
    <p>Your Bet History</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import userHeader from './userHeader.vue'

export default defineComponent({
    name:'historyBetsComp',
    components:{
        userHeader
    }
})

</script>