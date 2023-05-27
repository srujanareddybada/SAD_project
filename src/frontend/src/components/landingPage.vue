<template>
    <userHeader subHeaderName=""/>
    <div class="flex h-screen">
        <div class="w-1/5 bg-gray-200">
            <p>Country List Index</p>
        </div>
        <div class="flex-1 bg-red-200">
            <p>search bar</p>
            <p>Upcoming and Live match list by country</p>
            <p>Insert or edit bet</p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import userHeader from './userHeader.vue'
export default defineComponent({
    name:'landingComp',
    components:{
        userHeader
    }
})
</script>

<style>
</style>