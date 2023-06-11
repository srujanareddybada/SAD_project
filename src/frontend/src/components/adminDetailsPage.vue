<template>
<adminHeaderComp subHeaderName="Personal Info" />
<div class="w-1/2 grid grid-cols-2 gap-1" style="grid-auto-rows: minmax(10px, auto); grid-auto-columns: max-content;">
    <div class="userDetailsHeader">Full Name:</div>
    <div class="block w-full border p-2">{{ fullName }}</div>
    <div class="userDetailsHeader">Email:</div>
    <div class="border p-2">{{ email }}</div>
    <div class="userDetailsHeader">Date Of Birth:</div>
    <div class="border p-2">{{ dob }}</div>
    <div class="userDetailsHeader">Total Active Users: </div>
    <div class="border p-2 bg-green-100">{{ activeUserCount }}</div>
    <div class="userDetailsHeader">Total Blocked Users: </div>
    <div class="border p-2 bg-red-100">{{ blockedUserCount }}</div>
</div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import adminHeaderComp from './adminHeader.vue'
import axios from 'axios';
export default defineComponent({
    name: 'adminDetailsComp',
    data() {
        return {
            fullName: ''as string,
            email: ''as string,
            dob: ''as string,
            activeUserCount: 0 as number,
            blockedUserCount: 0 as number
        }
    },
    components: {
        adminHeaderComp
    },
    methods:{
        async loadAdminDetails(){
            await axios.get("/api/userdetails/" + this.email)
            .then((res)=>{
                console.log(res);
            })
            .catch((err)=>{
                console.error(err)
            })
        }
    },
    mounted() {
        //Get email either from  localstorage or vuex
        //this.loadAdminDetails();
    }
})
</script>

<style scoped>
.userDetailsHeader {
    @apply block w-full font-bold border p-2 bg-gray-300 text-gray-700
}
</style>
