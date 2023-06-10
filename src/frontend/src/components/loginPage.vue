<template>
<div class="grid grid-cols-2 gap-0">
    <div class="w-1/4 bg-red-100" id="imageContainer">
    </div>
    <div class="w-full">
        <div class="form-center">
            <p class="mb-5 mt-0 text-4xl font-medium leading-tight text-primary text-center">Log in to your account</p>
            <div class="grid grid-cols-1 gap-2">
                <div>
                    <label for="email" class="font-semibold text-gray-500 dark:text-gray-400">Email</label>
                    <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="email" />
                </div>
                <div>
                    <label for="password" class="font-semibold text-gray-500 dark:text-gray-400">Password</label>
                    <input type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="password" />
                </div>
            </div>
            <br />
            <button type="submit" class="mx-auto block w-1/2 p-2.5 text-black bg-blue-300 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" v-on:click="login()">Log In</button>
            <p class="mx-auto text-center block w-1/2 p-2.5 text-sm font-light text-gray-500 dark:text-gray-400">
                Don't have an account yet?
                <button class="font-medium text-primary-600 hover:underline dark:text-primary-500 text-blue-500" v-on:click="signUpPage()">Register</button>
            </p>
            <br />
            <p class="mx-auto text-center block w-1/2 p-2.5 text-sm font-light text-gray-500 dark:text-gray-400">--Or Login with--</p>
            <button type="button" class="mx-auto block w-1/2 p-2.5 text-black bg-blue-300 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" v-on:click="oAuthGoogle()">Log in with Google</button><br />
            <button type="button" class="mx-auto block w-1/2 p-2.5 text-black bg-blue-300 hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Log in with Facebook</button>
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
//import bcrpyt from 'bcryptjs'

export default defineComponent({
    name: 'loginComp',
    data() {
        return {
            email: ''as string,
            password: ''as string
        }
    },
    methods: {
        backToHomePage() {
            return this.$router.push({
                name: 'homePage'
            })
        },
        async login() {
            await axios.post("/api/login", {
                    email: this.email,
                    password: this.password
                })
                .then((res) => {
                    let result = res.data;
                    if (result === null) {
                        alert("Account doesn't exist. Please enter proper details")
                        this.clearInputs();
                    } else {
                        //const isMatch = bcrpyt.compareSync(password, result.password);
                        const isMatch = true;
                        if (isMatch && (res.status == 200)) {
                            alert('Login successfull!');
                            this.$router.push({
                                name: 'landingPage'
                            })
                        } else {
                            alert('Incorrect password.');
                            this.password = '';
                        }

                    }
                })
                .catch(() => {
                    console.log("Server issue. Please try later");
                })
        },
        async oAuthGoogle() {
            await axios.get("/api/auth/google")
                .then((res) => {
                    if (res.status == 200) {
                        this.$router.push({
                            name: 'landingPage'
                        })
                    } else {
                        alert('Unsuccesfull')
                    }
                })
                .catch(() => {
                    alert('Server issue')
                })
        },
        signUpPage() {
            return this.$router.push({
                name: 'signUpPage'
            })
        },
        clearInputs() {
            this.email = '',
                this.password = ''
        }
    }
})
</script>
