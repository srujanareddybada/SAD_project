<template>
<adminHeaderComp subHeaderName="Personal Info" />
<div class="w-1/2 grid grid-cols-2 gap-1" style="grid-auto-rows: minmax(10px, auto); grid-auto-columns: max-content;">
    <div class="userDetailsHeader">Full Name:</div>
    <div class="block w-full border p-2">{{ fullName }}</div>
    <div class="userDetailsHeader">Email:</div>
    <div class="block w-full border p-2">{{ email }}</div>
    <div class="userDetailsHeader">Date Of Birth:</div>
    <div class="block w-full border p-2">{{ dob }}</div>
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
            blockedUserCount: 0 as number,
            sessionTk: ''as string | null
        }
    },
    components: {
        adminHeaderComp
    },
    methods:{
        async loadAdminDetails(){
            const headers = {
                'Authorization': `Bearer ${this.sessionTk}`,
                'Content-Type': 'application/json',
            };
            await axios.get("/api/users",{headers})
            .then((res)=>{
                let result = res.data.users;
                for(let i=0; i<result.length; i++){
                    if(result[i].blocked == false){
                        this.activeUserCount += 1
                    }else{
                        this.blockedUserCount += 1
                    }
                }
                
            })
            .catch((err)=>{
                console.error(err)
            })
        }
    },
    mounted() {
        let userName =localStorage.getItem("full-name");
        if(!userName){
            return this.$router.push({name:'loginPage'})
        }else{
            userName = userName.substring(1, (userName.length - 1));
            this.fullName = userName;
        }
        let email = localStorage.getItem("email");
        if(email != null){
            email = email.substring(1, (email.length - 1));
            this.email = email;
        }
        let dob  = localStorage.getItem("dob");
        if(dob != null){
            dob = dob.substring(1, (dob.length));
            this.dob = dob;
        }
        let sessTk = localStorage.getItem("sessiontoken");
        if(sessTk != null){
            sessTk = sessTk.substring(1, (sessTk.length - 1));
            this.sessionTk = sessTk;
        }
        this.loadAdminDetails();
    }
})
</script>

<style scoped>
.userDetailsHeader {
    @apply block w-full font-bold border p-2 bg-gray-300 text-gray-700
}
</style>
