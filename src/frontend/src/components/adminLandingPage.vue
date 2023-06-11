<template>
<adminHeaderComp subHeaderName="" />

<!--TABLE TO DISPLAY ACTIVE USER DETAILS-->
<div class="conatiner mx-auto h-64 overflow-y-auto">
    <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-100 sticky top-0 z-10 text-left">
            <tr>
                <th class="px-1 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                    User ID
                </th>
                <th class="px-1 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                    User Name
                </th>
                <th class="px-1 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                    Email ID
                </th>
                <th class="px-1 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                    Status
                </th>
                <th class="px-1 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                    Change Status
                </th>
            </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
            <tr>
                <td class="px-1 py-1 text-left whitespace-nowrap">1</td>
                <td class="px-1 py-1 text-left whitespace-nowrap">Pavan</td>
                <td class="px-1 py-1 text-left whitespace-nowrap">pavankumar.rb25@gmail.com</td>
                <td class="px-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</td>
                <td>
                    <button class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-small rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" type="button" v-on:click="blockUser('pavankumar.rb25@gmail.com')">Block</button>
                </td>
            </tr>
        </tbody>
    </table>
</div>

</template>

<script lang="ts">
import {defineComponent} from 'vue';
import adminHeaderComp from './adminHeader.vue'
import axios from 'axios';
export default defineComponent({
    name: 'adminLandingComp',
    data() {
        return {
            
        }
    },
    components: {
        adminHeaderComp
    },
    methods: {
        async getAllUserDetails(){
            await axios.get("/api/getalluserdetails")
            .then((res)=>{
                console.log(res);
            })
            .catch((err)=>{
                console.error(err)
            })
        },
        async blockUser(userEmail:string){
            await axios.post("/api/blockuser",{
                email: userEmail
            })
            .then((res)=>{
                //alert('User blocked succesfully!');
                console.log(res);
            })
            .catch((err)=>{
                //alert('Failed to block user, please try later');
                console.error(err)
            })
            this.getAllUserDetails();
        }
    },
    mounted() {
        //this.getAllUserDetails();
    },
})
</script>

<style>
</style>
