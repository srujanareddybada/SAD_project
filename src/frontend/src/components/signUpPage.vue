<template>
<div class="grid grid-cols-2 gap-0">
    <div class="w-1/4 bg-red-100" id="imageContainer">
    </div>
    <div class="w-full">
        <div class="form-center">
            <p class="text-2xl text-blue-500 w-1/2 p-2.5 ml-10">Create your account</p>
            <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="enter first name" v-model="firstName" />
            <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="enter last name" v-model="lastName" />
            <input type="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="enter email" v-model="email" />
            <input type="password" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="enter password" v-model="password" />
            <input type="password" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="re-enter password" v-model="reenterpassword" />
            <br />
            <button type="button" class="block w-1/2 p-2.5 text-black bg-blue-300 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" v-on:click="signUp()">Register</button>
            <p class="block w-1/2 p-2.5 text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account? <button class="font-medium text-primary-600 hover:underline dark:text-primary-500" v-on:click="loginPage()"> Login here</button>
            </p>
            <p class="block w-1/2 p-2.5 text-sm font-light text-gray-500 dark:text-gray-400">--Or login with--</p>
            <button type="button" class="block w-1/2 p-2.5 text-black bg-blue-300 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Log in with Google</button><br />
            <button type="button" class="block w-1/2 p-2.5 text-black bg-blue-300 hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Log in with Facebook</button>
        </div>
    </div>
</div>

<footer>
    <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full" v-on:click="backToHomePage()">Back</button>
</footer>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import axios from 'axios';
import bcrpyt from 'bcryptjs'

export default defineComponent({
    name: 'signUpComp',
    data() {
        return {
            firstName: ''as string,
            lastName: ''as string,
            email: ''as string,
            password: ''as string,
            reenterpassword: ''as string
        }
    },
    methods: {
        async signUp() {
            //step1: check if user already exists using email comparison -- 1st if condition
            //step2: check password and reentered password is correct -- 2nd if condition
            let user = await axios.get("/api/fetchuserdetails/"+this.email);
            //let user = false;
            if (user.data.length === 0) {
                if (this.password === this.reenterpassword) {  
                    let hashPassword = await bcrpyt.hash(this.password, 10);
                    await axios.post("/api/signup", {
                            firstName: this.firstName,
                            lastName: this.lastName,
                            email: this.email,
                            password: hashPassword
                        })
                        .then((res) => {
                            if (res.data.acknowledged) {
                                alert("Registration successfull!");
                                return this.$router.push({
                                    name: 'loginPage'
                                })
                            } else {
                                //alert("Registration unsuccessfull, please try again")
                                this.clearInputs();
                            }
                        })
                        .catch(() => {
                            //alert("Registration failed. Please try later");
                            this.clearInputs();
                        })
                } else {
                    console.log("Passwords do not match, please re-enter the correct password");
                    this.reenterpassword = ''
                }
            } else {
                console.log("User already exists, use a different email address");
                this.clearInputs()
            }
        },
        backToHomePage() {
            return this.$router.push({
                name: 'homePage'
            })
        },
        loginPage() {
            return this.$router.push({
                name: 'loginPage'
            })
        },
        clearInputs() {
            this.firstName = '',
                this.lastName = '',
                this.email = '',
                this.password = '',
                this.reenterpassword = ''
        }
    }
})
</script>

<style>
#imageContainer {
    background: url("../assets/bettingAppLogo01.jpg") no-repeat;
    width: 400px;
    height: 600px;
    background-size: contain;
}
</style>
