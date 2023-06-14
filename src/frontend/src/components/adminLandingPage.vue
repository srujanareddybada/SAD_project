<template>
<adminHeaderComp subHeaderName="" />

<!--TABLE TO DISPLAY ACTIVE USER DETAILS-->
<div class="conatiner mx-auto h-70 overflow-y-auto">
    <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-100 sticky top-0 z-10 text-left">
            <tr>
                <th class="px-1 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                    User ID
                </th>
                <th class="px-1 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                    Full Name
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
            <tr v-for="(userDetails, i) in userDetailsArray" :key="i">
                <td class="px-1 py-1 text-left whitespace-nowrap">{{ userDetails.userid }}</td>
                <td class="px-1 py-1 text-left whitespace-nowrap">{{userDetails.fullname}}</td>
                <td class="px-1 py-1 text-left whitespace-nowrap">{{ userDetails.email }}</td>
                <td>
                    <span v-if="userDetails.status" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-300">InActive</span>
                   <span v-else class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-300">Active</span>
                   
                </td>
                <td>
                    <button  v-if="userDetails.status" type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-red-300 font-small rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900" v-on:click="blockUser(userDetails.userid, userDetails.status)">
                    Unblock
                    </button>
                    <button  v-else type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-small rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" v-on:click="blockUser(userDetails.userid, userDetails.status)">
                    Block
                    </button>
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
import userDetails from '../types/userDetails'

export default defineComponent({
    name: 'adminLandingComp',
    data() {
        return {
            sessionTk: ''as string | null,
            userDetailsArray: [] as userDetails[]
        }
    },
    components: {
        adminHeaderComp
    },
    methods: {
        async getAllUserDetails(){
            this.userDetailsArray = [];
            const headers = {
                'Authorization': `Bearer ${this.sessionTk}`,
                'Content-Type': 'application/json',
            };
            await axios.get("/api/users",{headers})
            .then((res)=>{
                console.log(res.data.users);
                let result = res.data.users;
                for(let i=0; i<result.length;i++){
                    let userid = result[i]._id;
                    let email = result[i].email;
                    let fullname = result[i].fullname;
                    let status = result[i].blocked;
                    this.userDetailsArray.push({
                        userid,
                        fullname,
                        email,
                        status
                    })
                }
            })
            .catch((err)=>{
                console.error(err)
            })
        },
        async blockUser(userid:string, status:boolean){
            let uid = userid;
            let changeStatus = !status;
            const headers = {
                'Authorization': `Bearer ${this.sessionTk}`,
                'Content-Type': 'application/json',
            };
            await axios.patch(`/api/user/${uid}/block`, {"blocked": changeStatus}, {headers})
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
        let userName =localStorage.getItem("full-name");
        if(!userName){
            return this.$router.push({name:'loginPage'})
        }
        let sessTk = localStorage.getItem("sessiontoken");
        if(sessTk != null){
            sessTk = sessTk.substring(1, (sessTk.length - 1));
            this.sessionTk = sessTk;
        }
        this.getAllUserDetails();
    },
})
</script>

<style>
</style>
