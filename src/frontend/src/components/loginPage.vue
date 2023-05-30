<template>
<div class="grid grid-cols-2 gap-0">
    <div class="w-1/4 bg-red-100" id="imageContainer">
    </div>
    <div class="w-full">
        <div class="form-center">
            <p class="text-2xl text-blue-500 w-1/2 p-2.5 ml-10">Log in to your account</p>
            <input type="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter email" v-model="email" />
            <input type="password" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter password" v-model="password" />
            <button type="submit" class="block w-1/2 p-2.5 text-black bg-blue-300 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" v-on:click="login()">Log In</button>
            <p class="block w-1/2 p-2.5 text-sm font-light text-gray-500 dark:text-gray-400">
                Don't have an account yet? <button class="font-medium text-primary-600 hover:underline dark:text-primary-500" v-on:click="signUpPage()">Register</button>
            </p>
            <br /><br />
            <p class="block w-1/2 p-2.5 text-sm font-light text-gray-500 dark:text-gray-400">--Or login with--</p>
            <button type="button" class="block w-1/2 p-2.5 text-black bg-blue-300 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" v-on:click="oAuthGoogle()">Log in with Google</button><br />
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
            let email = this.email;
            let password = this.password;
            await axios.get("/api/login/" + email)
                .then((res) => {
                    let result = res.data;
                    if(result === null){
                        alert("Account doesn't exist. Please enter proper details")
                        this.clearInputs();
                    }else{
                        const isMatch = bcrpyt.compareSync(password,result.password);
                        if(isMatch && (res.status == 200)){
                            alert('Login successfull!');
                            this.$router.push({name:'landingPage'})
                        }else{
                            alert('Incorrect password.');
                            this.password = '';
                        }
                       
                    }
                })
                .catch(()=>{
                    console.log("Server issue. Please try later");
                })
        },
        async oAuthGoogle(){
             await axios.get("/api/auth/google")
             .then((res)=>{
                if(res.status == 200){
                    this.$router.push({name:'landingPage'})
                }else{
                    alert('Unsuccesfull')
                }
             })
             .catch(()=>{
                alert('Server issue')
             })
        },
        signUpPage() {
            return this.$router.push({
                name: 'signUpPage'
            })
        },
        clearInputs(){
            this.email = '',
            this.password = ''
        }
    }
})
</script>
