<template>
    <div>
        <div>
            <div><b class="mr-14">User ID: </b>{{ userId }}</div>
            <div><b class="mr-4">Competition Name: </b> {{ mObj.competitionName }} </div>
            <div><b class="mr-14">Home Team:</b> {{ mObj.homeTeamName }}</div>
            <div><b class="mr-14">Away Team: </b>{{ mObj.awayTeamName }}</div>
            <div><b class="mr-14">Match Day: </b>{{ mObj.matchDateandTime.slice(0,10) }} - {{ mObj.matchDateandTime.slice(11,16) }}</div>
            <div v-if="teamType">
                <div><b class="mr-2">Home Team Odds: </b>{{ mObj.homeTeamWinningOdds }}</div>
                <div class="flex"><label><b>Your Bet On Home Team:</b> </label><input type="number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" v-model="yourBetMoney" /></div>
                <button @click="handleBtnClose" class="mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
            </div>
            <div v-else>
                <div><b class="mr-2">Away Team Odds: </b>{{ mObj.awayTeamWinningOdds }}</div>
                <div class="flex"><label class="mr-3"><b>Your Bet On Away Team: </b> </label><input type="number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2" v-model="yourBetMoney" /></div>
                <button @click="handleBtnClose" class="mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
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
                yourBetMoney: 0 as number
            }
        },
        props: {
            userId: Number,
            teamType: {
                type: Object as() => boolean,
                required: true
            },
            mObj: {
                type: Object as() => matchDetails,
                required: true
            }
    
        },
        methods: {
            handleBtnClose() {
                this.$emit('bet-modal-event', false);
            }
        }
    })
    </script>
    
    <style>
    
    </style>
    