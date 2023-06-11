<template>
<div class="grid grid-cols-2 gap-0">
    <div class="w-1/4 bg-red-100" id="imageContainer"></div>
    <div class="w-full">
        <div class="form-center">
            <h1 class="mb-5 mt-0 text-4xl font-medium leading-tight text-primary text-center">
                Create your account
            </h1>
            <div class="grid grid-cols-2 gap-1">
                <div>
                    <label for="username" class="font-semibold text-gray-500 dark:text-gray-400">User Name</label>
                    <input type="text" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="userName" />
                </div>
                <div>
                    <label for="fullname" class="font-semibold text-gray-500 dark:text-gray-400">Full Name</label>
                    <input type="text" id="fullname" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="fullName" />
                </div>
                <div>
                    <label for="dateOfBirth" class="font-semibold text-gray-500 dark:text-gray-400">Date of Birth</label>
                    <input type="date" id="dateOfBirth" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="dateOfBirth" required @change="calculateAge" />
                </div>
                <div>
                    <label for="email" class="font-semibold text-gray-500 dark:text-gray-400">Email</label>
                    <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="email" />
                </div>
                <div>
                    <label for="password" class="font-semibold text-gray-500 dark:text-gray-400">Password</label>
                    <input type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="password" />
                </div>
                <div>
                    <label for="reenterpassword" class="font-semibold text-gray-500 dark:text-gray-400">Re-enter Password</label>
                    <input type="password" id="reenterpassword" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="reenterpassword" />
                </div>
            </div>
            <br />
            <button type="button" class="mx-auto block w-1/2 p-2.5 text-black bg-blue-300 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" v-on:click="signUp()">
                Register
            </button>
            <p class="mx-auto text-center block w-1/2 p-2.5 text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?
                <button class="font-medium text-primary-600 hover:underline dark:text-primary-500 text-blue-500" v-on:click="loginPage()">
                    Login here
                </button>
            </p>
            <p class="mx-auto text-center block w-1/2 p-2.5 text-sm font-light text-gray-500 dark:text-gray-400">
                --Or Login with--
            </p>
            <button type="button" class="mx-auto text-center block w-1/2 p-2.5 text-black bg-blue-300 hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5">
                Log in with Google</button><br />
            <!-- <button
          type="button"
          class="mx-auto text-center block w-1/2 p-2.5 text-black bg-blue-300 hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Log in with Facebook
        </button> -->
        </div>
    </div>
</div>

<footer>
    <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full" v-on:click="backToHomePage()">
        Back
    </button>
</footer>
</template>

<script lang="ts">
import {
    defineComponent
} from "vue";
import axios from "axios";
import bcrpyt from "bcryptjs";

const salt = await new Promise < string > ((resolve, reject) => {
    bcrpyt.genSalt(10, (err, salt) => {
        if (err) {
            reject(err);
        } else {
            resolve(salt);
        }
    });
});

export default defineComponent({
    name: "signUpComp",
    data() {
        return {
            fullName: ""as string,
            userName: ""as string,
            email: ""as string,
            password: ""as string,
            reenterpassword: ""as string,
            dateOfBirth: new Date() as Date,
        };
    },
    methods: {
        async signUp() {
            //step1: check if user already exists using email comparison -- 1st if condition
            //step2: check password and reentered password is correct -- 2nd if condition
            //let user = await axios.get("/api/fetchuserdetails/"+this.email);
            if (this.isValidEmail(this.email)) {
                if (this.password === this.reenterpassword) {
                    let hashPassword = await bcrpyt.hash(
                        this.password,
                        "$2a$10$4Bla8tqMJnGX0aG9JAiHiu"
                    );
                    await axios
                        .post("/api/user", {
                            fullname: this.fullName,
                            username: this.userName,
                            email: this.email,
                            password: hashPassword,
                            dob: this.dateOfBirth,
                        })
                        .then((res) => {
                            if (res.status == 200) {
                                alert("Registration successfull!");
                                return this.$router.push({
                                    name: "loginPage",
                                });
                            } else if (res.status == 404) {
                                alert("User already exists, use a different email address");
                                this.clearInputs();
                            } else {
                                alert("Registration unsuccessfull, please try again");
                                this.clearInputs();
                            }
                        })
                        .catch(() => {
                            alert("Registration failed. Please try later");
                            this.clearInputs();
                        });
                } else {
                    alert("Passwords do not match, please re-enter the correct password");
                    this.reenterpassword = "";
                }
            } else {
                alert("Please enter a proper email ID");
                this.email = "";
            }
        },
        backToHomePage() {
            return this.$router.push({
                name: "homePage",
            });
        },
        loginPage() {
            return this.$router.push({
                name: "loginPage",
            });
        },
        clearInputs() {
            (this.fullName = ""),
            (this.userName = ""),
            (this.email = ""),
            (this.password = ""),
            (this.reenterpassword = ""),
            (this.dateOfBirth = new Date());
        },
        calculateAge() {
            let dob = new Date(this.dateOfBirth);
            const today = new Date();
            let age = today.getFullYear() - dob.getFullYear();
            if (
                today.getMonth() < dob.getMonth() ||
                (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
            ) {
                age--;
            }
            if (age < 18) {
                alert("You are underage!!. Need to be atleast 18 to use the App");
                this.clearInputs();
            }
        },
        isValidEmail(email: string): boolean {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        },
    },
    mounted() {
        let isAdmin = localStorage.getItem('isAdmin');
        if (isAdmin != null) {
            isAdmin = isAdmin.substring(1, (isAdmin.length - 1));
            if (isAdmin == 'true') {
                return this.$router.push({
                    name: "adminLandingPage"
                })
            } else {
                return this.$router.push({
                    name: "landingPage"
                })
            }
        }
    },
});
</script>

<style>
#imageContainer {
    background: url("../assets/bettingAppLogo01.jpg") no-repeat;
    width: 400px;
    height: 600px;
    background-size: contain;
}
</style>
