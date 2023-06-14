<template>
<userHeader subHeaderName="Personal Info" />

<div class="w-1/2 grid grid-cols-2 gap-1" style="grid-auto-rows: minmax(10px, auto); grid-auto-columns: max-content;">
    <div class="userDetailsHeader">Full Name:</div>
    <div class="block w-full border p-2">{{ fullName }}</div>
    <div class="userDetailsHeader">Email:</div>
    <div class="block w-full border p-2">{{ email }}</div>
    <div class="userDetailsHeader">Date Of Birth:</div>
    <div class="block w-full border p-2">{{ dob }}</div>
    <div class="userDetailsHeader">Account Balance:</div>
    <div class="block w-full border p-2">
        <input type="number" class="border p-2 w-full" v-model="accBalance" :disabled="showDisabledElements" />
    </div>
    <div><button class="block w-full p-2.5 text-black bg-blue-300 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" v-on:click="editUserDetails()">Edit Balance</button></div>
    <div><button class="block w-full p-2.5 text-black bg-blue-300 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" v-show="!showDisabledElements" v-on:click="saveUserChanges()">Save Changes</button></div>
</div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import userHeader from './userHeader.vue'
import axios from 'axios'

export default defineComponent({
    name: 'userDetailsComp',
    data() {
        return {
            fullName: ''as string,
            email: ''as string,
            dob: ''as string, //keep it string if we are not going to edit
            accBalance: 0 as number,
            showDisabledElements: true,
            sessionTk: ''as string | null,
            yourUserID: ''as string | undefined | null
        }
    },
    components: {
        userHeader
    },
    methods: {
        async loadUserDetails() {
            const headers = {
                'Authorization': `Bearer ${this.sessionTk}`,
                'Content-Type': 'application/json',
            };
            await axios.get(`/api/user/${this.yourUserID}`, {headers})
                .then((res) => {
                    let result = res.data;
                    this.fullName = result.fullname;
                    this.email = result.email;
                    this.dob = result.dob.slice(0,10);
                    this.accBalance = result.balance;
                })
                .catch((err) => {
                    console.error(err);
                })
        },
        editUserDetails() {
            this.showDisabledElements = false;
        },
        async saveUserChanges() {
            this.showDisabledElements = true;
            const headers = {
                'Authorization': `Bearer ${this.sessionTk}`,
                'Content-Type': 'application/json',
            };
            await axios.patch(`/api/user/${this.yourUserID}/balance`, {balance: this.accBalance}, {headers})
                .then((res) => {
                    if(res.status == 200){
                        alert(res.data.message)
                    }
                })
                .catch((err) => {
                    console.error(err);
                })
            this.loadUserDetails();
        }
    },
    mounted() {
        let userName = localStorage.getItem("full-name");
        if (!userName) {
            return this.$router.push({
                name: 'loginPage'
            })
        }
        let sessTk = localStorage.getItem("sessiontoken");
        if(sessTk != null){
            sessTk = sessTk.substring(1, (sessTk.length - 1));
            this.sessionTk = sessTk;
        }
        let uID = localStorage.getItem("user-id");
        if (uID != null) {
            uID = uID.substring(1, (uID.length - 1));
            this.yourUserID = uID;
        }
        this.loadUserDetails();
    }
})
</script>

<style scoped>
.userDetailsHeader {
    @apply block w-full font-bold border p-2 bg-gray-300 text-gray-700
}
</style>
