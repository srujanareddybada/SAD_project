<template>
    <div>
        <div>
            <div><b class="mr-14">User ID: </b>{{ userId }}</div>
            <div><b class="mr-4">Competition Name: </b> {{ mObj.competitionName }} </div>
            <div><b class="mr-14">Home Team:</b> {{ mObj.homeTeamName }}</div>
            <div><b class="mr-14">Away Team: </b>{{ mObj.awayTeamName }}</div>
            <div><b class="mr-14">Match Day: </b>{{ mObj.matchDateandTime.slice(0,10) }} - {{ mObj.matchDateandTime.slice(11,16) }}</div>

            <div v-if="teamType">
                <div :v-model="bettedHomeTeamOdd = mObj.homeTeamWinningOdds" ><b class="mr-2">Home Team Odds: </b>
                    {{ mObj.homeTeamWinningOdds }}
                </div>
                <div class="flex"><label><b>Your Bet On Home Team:</b> </label><input type="number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" v-model="yourBetMoney" /></div>
                <button @click="handleBetOnHomeTeam" class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Submit</button>
                <button @click="cancelPlacingBet" class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Cancel</button>
            </div>
            <div v-else>
                <div :v-model="bettedAwayTeamOdd = mObj.awayTeamWinningOdds" ><b class="mr-2">Away Team Odds: </b>
                    {{ mObj.awayTeamWinningOdds }}
                </div>
                <div class="flex"><label class="mr-3"><b>Your Bet On Away Team: </b> </label><input type="number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2" v-model="yourBetMoney" /></div>
                <button @click="handleBetOnAwayTeam" class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Submit</button>
                <button @click="cancelPlacingBet" class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Cancel</button>
            </div>
        </div>
    </div>
    </template>
    
    <script lang="ts">
    import {defineComponent} from 'vue';
    import matchDetails from '../types/matchDetails';
    
    export default defineComponent({
        name: 'placeBetComp',
        data() {
            return {
                yourBetMoney: 0 as number,
                bettedHomeTeamOdd: 0 as number,
                bettedAwayTeamOdd: 0 as number
            }
        },
        props: {
            userId: Number,
            teamType: Boolean,
            mObj: {
                type: Object as() => matchDetails,
                required: true
            }
    
        },
        methods: {
            handleBetOnHomeTeam() {
                console.log(`You placed bet of €${this.yourBetMoney} on home team with winning odds ${this.bettedHomeTeamOdd}`);
                this.$emit('bet-modal-event', false);
            },
            handleBetOnAwayTeam(){
                console.log(`You placed bet of €${this.yourBetMoney} on away team with winning odds ${this.bettedAwayTeamOdd}`);
                this.$emit('bet-modal-event', false);
            },
            cancelPlacingBet(){
                console.log('Bet cancelled');
                this.$emit('bet-modal-event', false);
            }
        }
    })
    </script>
    
    <style>
    
    </style>
    