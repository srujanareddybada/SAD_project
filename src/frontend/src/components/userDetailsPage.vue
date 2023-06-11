<template>
<userHeader subHeaderName="Personal Info" />

<div class="w-1/2 grid grid-cols-2 gap-1" style="grid-auto-rows: minmax(10px, auto); grid-auto-columns: max-content;">
    <div class="userDetailsHeader">Full Name:</div>
    <div class="block w-full border p-2">{{ fullName }}</div>
    <div class="userDetailsHeader">Email:</div>
    <div class="border p-2">{{ email }}</div>
    <div class="userDetailsHeader">Date Of Birth:</div>
    <div class="border p-2">{{ dob }}</div>
    <div class="userDetailsHeader">Account Balance:</div>
    <div class="border p-2">
        <input type="number" class="border p-2 w-full" v-model="accBalance" :disabled="showDisabledElements" />
    </div>
    <div><button class="block w-full p-2.5 text-black bg-blue-300 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" v-on:click="editUserDetails()">Edit Details</button></div>
    <div><button class="block w-full p-2.5 text-black bg-blue-300 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" v-show="!showDisabledElements" v-on:click="saveUserChanges()">Save Changes</button></div>
</div>
</template>

<script lang="ts">
import {
    defineComponent
} from 'vue'
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
            sessionTk: ''as string | null
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
            await axios.get("/api/userdetails/" + this.email, {
                    headers
                })
                .then((res) => {
                    console.log(res);
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
            await axios.post("/api/newaccbalance/", {
                    email: this.email,
                    accountbalance: this.accBalance
                }, {
                    headers
                })
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.error(err);
                })
            this.loadUserDetails();
        }
    },
    mounted() {
        this.sessionTk = localStorage.getItem("sessiontoken");
        let userName = localStorage.getItem("full-name");
        if (!userName) {
            return this.$router.push({
                name: 'loginPage'
            })
        }

        //Get email either from  localstorage or vuex
        //this.loadUserDetails();
    }
})
</script>

<style scoped>
.userDetailsHeader {
    @apply block w-full font-bold border p-2 bg-gray-300 text-gray-700
}
</style>
