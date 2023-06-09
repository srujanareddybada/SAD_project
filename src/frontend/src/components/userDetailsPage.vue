<template>
    <userHeader subHeaderName="Personal Info"/>
    <p>User Details</p>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import userHeader from './userHeader.vue'

export default defineComponent({
    name:'userDetailsComp',
    components:{
        userHeader
    }
})
</script>

<style>
</style>