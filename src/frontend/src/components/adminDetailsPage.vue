<template>
    <adminHeaderComp subHeaderName="Personal Info"/>
    <h2>Admin Detail Page</h2>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import adminHeaderComp from './adminHeader.vue'
export default defineComponent({
    name:'adminDetailsComp',
    components:{
        adminHeaderComp
    }
})
</script>

<style>
</style>