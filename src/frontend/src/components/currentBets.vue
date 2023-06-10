<template>
<userHeader subHeaderName="Bets Placed" />

<!-- DIV TO DISPLAY PLACED BET DETAILS -->
<div class="grid grid-cols-2 gap-1">
    <div v-for="(userCurrentBetDetails, i) in userCurrentBetDetailsArray" :key="i">
        <div class="border border-gray-600">
            <div>
                <span class="text-blue-500 text-sm font-bold">Competition Name:</span>
                <span class="text-sm font-semibold ml-1">{{ userCurrentBetDetails.competitionName }}</span>
            </div>
            <div>
                <span class="text-blue-500 text-sm font-bold">Betted Team</span>
                <span class="text-sm font-semibold ml-1">{{ userCurrentBetDetails.bettedTeam }}</span>
            </div>
            <div>
                <span class="text-blue-500 text-sm font-bold">Bet Money:</span>
                <span class="text-sm font-semibold ml-1">{{ userCurrentBetDetails.betMoney }}</span>
            </div>
            <div>
                <span class="text-blue-500 text-sm font-bold">Other Team:</span>
                <span class="text-sm font-semibold ml-1">{{ userCurrentBetDetails.otherTeam }}</span>
            </div>
            <div>
                <span class="text-blue-500 text-sm font-bold">Match Schedule:</span>
                <span class="text-sm font-semibold ml-1">{{ userCurrentBetDetails.matchSchedule }}</span>
            </div>
            <div>
                <span class="text-blue-500 text-sm font-bold">Match Result:</span>
                <span class="text-sm font-semibold ml-1">{{ userCurrentBetDetails.matchResult }}</span>
            </div>
            <div>
                <span class="text-blue-500 text-sm font-bold">Bet Result:</span>
                <span class="text-sm font-semibold ml-1">{{ userCurrentBetDetails.betResult }}</span>
            </div>
        </div>
    </div>
</div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import userHeader from './userHeader.vue'
import betDetails from '../types/betDetails'
import axios from 'axios';

export default defineComponent({
    name: 'currentBetsComp',
    data() {
        return {
            userCurrentBetDetailsArray: [] as betDetails[]
            //Can store this page's fetched data into Vuex and use it in betHistory page? or write another get request in betHistory page
        }
    },
    components: {
        userHeader
    },
    methods: {
        async getCurrentBetData() {
            await axios.get("/api/currentbets")
                .then((res) => {
                    console.log(res);
                    //this.userCurrentBetDetailsArray.push(res);
                })
                .catch((err) => {
                    console.error(err)
                })
        }
    },
    mounted() {
        //this.getCurrentBetData()
    }
})
</script>

<style></style>
