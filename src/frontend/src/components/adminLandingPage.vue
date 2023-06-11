<template>
    <adminHeaderComp subHeaderName=""/>
<h2>Admin Landing Page</h2>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import adminHeaderComp from './adminHeader.vue'
export default defineComponent({
name:'adminLandingComp',
data(){
    return{
        
    }
},
components:{
    adminHeaderComp
},
methods:{

}
})
</script>

<style>
</style>