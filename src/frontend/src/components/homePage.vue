<template>
    <header>
        <nav class="bg-sky-300 border-gray-200 px-4 lg:px-6 py-4.5 text-black p-5">
            <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                <div class="flex items-center">
                    <img src="../assets/bettingAppLogo01.jpg" class="mr-1 h-6 sm:h-9 rounded-full" alt="Flowbite Logo" />
                    <span class="self-center text-2xl font-bold whitespace-nowrap dark:text-blue">Sports Betting App</span>
                </div>
    
                <div class="flex items-center lg:order-1">
                    <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-4 lg:mt-0">
                        <li><button class="hover:bg-gray-600 text-white py-2 px-1 rounded" type="button" v-on:click="getUpcomingMatchList()">Upcoming Events</button></li>
                        <li><button class="hover:bg-gray-600 text-white py-2 px-1 rounded" type="button" v-on:click="getLiveMatchList()">Live</button></li>
                    </ul>
                </div>
    
                <div class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-2">
                    <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-4 lg:mt-0">
                        <li><button class="bg-gray-700 hover:bg-gray-600 text-white py-2 px-1 rounded" type="button" v-on:click="signUpBtn()">Register</button></li>
                        <li><button class="bg-gray-700 hover:bg-gray-600 text-white py-2 px-1 rounded" type="button" v-on:click="loginBtn()">Log In</button></li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
    
    <div v-for="(countryDetail, i) in countryDetailsArray" :key="i">
        <div class="overflow-x-scroll">
            <div class="bg-green-200 h-8 flex border border-gray-300 justify-center">
                <img :src="countryDetail.flag" width="30" height="30" /><b>{{ countryDetail.countryName }}</b>
            </div>
            <div class="flex">
                <div v-for="(matchDetail, j) in matchDetailsArray" :key="j" class="flex-shrink-0">
                    <div v-if="countryDetail.countryName === matchDetail.hostingCountry">
                        <div class="border border-gray-600">
                            <div class="flex text-sm">
                                <img :src="matchDetail.competitionEmblem" width="30" height="30" /><b>{{ matchDetail.competitionName }}</b>
                            </div>
                            <div>
                                <span class="text-blue-500 text-sm font-bold">Match day:</span> 
                                <span class="text-sm font-semibold ml-1">{{ (matchDetail.matchDateandTime).slice(0, 10) }}</span>
                            </div>
                            <div>
                                <span class="text-blue-500 text-sm font-bold">Match time:</span> 
                                <span class="text-sm font-semibold ml-1">{{ (matchDetail.matchDateandTime).slice(11, 16) }}</span>
                            </div>
                            <div class="grid grid-cols-3 gap-1 w-full text-sm">
    
                                <div class="bg-gray-200 p-2 font-semibold">Teams (Home vs Away)</div>
                                <div class="bg-gray-200 p-2 flex">
                                    <img :src="matchDetail.homeTeamCrest" width="10" height="10" />{{ matchDetail.homeTeamName }}
                                </div>
                                <div class="bg-gray-200 p-2 flex">
                                    <img :src="matchDetail.awayTeamCrest" width="10" height="10" />{{ matchDetail.awayTeamName }}
                                </div>
                                <div class="bg-gray-200 p-2 font-semibold">Winning Odds</div>
                                <div class="bg-gray-200 p-2">{{ matchDetail.homeTeamWinningOdds }}%</div>
                                <div class="bg-gray-200 p-2">{{ matchDetail.awayTeamWinningOdds }}%</div>
                            </div>
                        </div>
                    </div>
                    <div v-else></div>
                </div>
            </div>
    
            <br />
        </div>
    
    </div>
    </template>
    
    <script lang="ts">
    import {defineComponent} from 'vue';
    import axios from 'axios';
    import countryDetails from '../types/countryDetails'
    import matchDetails from '../types/matchDetails'
    
    export default defineComponent({
        name: 'homeComp',
        data() {
            return {
                countryDetailsArray: [] as countryDetails[],
                matchDetailsArray: [] as matchDetails[]
            }
        },
        methods: {
            signUpBtn() {
                return this.$router.push({
                    name: 'signUpPage',
                    //This is because, params property doesn't support custom types written in ts.
                    //params:{countryList: this.countryDetailsArray.map(country => country.countryName) as string[]}
                })
            },
            loginBtn() {
                return this.$router.push({
                    name: 'loginPage'
                })
            },
            async getUpcomingMatchList() {
                await axios.get("/api/bets")
                    .then((res) => {
                        let result = res.data;
                        for (let i = 0; i < result.length; i++) {
                            //for matchDetails Array
                            let awayTeamWinningOdds: number = result[i].AwayTeam_WinningOdds;
                            let homeTeamWinningOdds: number = result[i].HomeTeam_WinningOdds;
                            let awayTeamCrest: string = result[i].awayTeam.crest;
                            let awayTeamName: string = result[i].awayTeam.name;
                            let homeTeamCrest: string = result[i].homeTeam.crest;
                            let homeTeamName: string = result[i].homeTeam.name;
                            let competitionEmblem: string = result[i].competition.emblem;
                            let competitionName: string = result[i].competition.name;
                            let hostingCountry: string = result[i].area.name;
                            let matchDateandTime: string = result[i].utcDate;
                            this.matchDetailsArray.push({
                                awayTeamWinningOdds,
                                homeTeamWinningOdds,
                                awayTeamCrest,
                                awayTeamName,
                                homeTeamCrest,
                                homeTeamName,
                                competitionEmblem,
                                competitionName,
                                hostingCountry,
                                matchDateandTime
                            })
                            //for countryDetails Array
                            let countryName: string = result[i].area.name;
                            let flag: string = result[i].area.flag;
                            const existingObject = this.countryDetailsArray.find(obj => obj.countryName === countryName);
                            if (!existingObject) {
                                this.countryDetailsArray.push({
                                    countryName,
                                    flag
                                })
                            }
                        }
    
                        console.log(this.matchDetailsArray);
                        
                    })
                    .catch(() => {
                        console.log("Data could not be retreived");
                    })
            },
            getLiveMatchList() {
                console.log("No live match data yet");
            }
        },
        mounted() {
            this.getUpcomingMatchList();
        }
    })
    </script>
    
    <style>
    footer {
        text-align: center;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        margin: 0;
        padding: 2px;
        background-color: Salmon;
        color: white;
    }
    </style>
    