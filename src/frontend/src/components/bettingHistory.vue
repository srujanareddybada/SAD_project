<template>
    <userHeader subHeaderName="Bet History"/>

<!-- DIV TO DISPLAY BET HISTORY DETAILS -->
<div class="grid grid-cols-2 gap-1">
    <div v-for="(useBetHistoryDetails, i) in userBetHistoryDetailsArray" :key="i">
        <div class="border border-gray-600">
            <div>
                <span class="text-blue-500 text-sm font-bold">Competition Name:</span>
                <span class="text-sm font-semibold ml-1">{{ useBetHistoryDetails.competitionName }}</span>
            </div>
            <div>
                <span class="text-blue-500 text-sm font-bold">Betted Team</span>
                <span class="text-sm font-semibold ml-1">{{ useBetHistoryDetails.bettedTeam }}</span>
            </div>
            <div>
                <span class="text-blue-500 text-sm font-bold">Bet Money:</span>
                <span class="text-sm font-semibold ml-1">{{ useBetHistoryDetails.betMoney }}</span>
            </div>
            <div>
                <span class="text-blue-500 text-sm font-bold">Other Team:</span>
                <span class="text-sm font-semibold ml-1">{{ useBetHistoryDetails.otherTeam }}</span>
            </div>
            <div>
                <span class="text-blue-500 text-sm font-bold">Match Schedule:</span>
                <span class="text-sm font-semibold ml-1">{{ useBetHistoryDetails.matchSchedule }}</span>
            </div>
            <div>
                <span class="text-blue-500 text-sm font-bold">Match Result:</span>
                <span class="text-sm font-semibold ml-1">{{ useBetHistoryDetails.matchResult }}</span>
            </div>
            <div>
                <span class="text-blue-500 text-sm font-bold">Bet Result:</span>
                <span class="text-sm font-semibold ml-1">{{ useBetHistoryDetails.betResult }}</span>
            </div>
        </div>
    </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import userHeader from './userHeader.vue'
import betDetails from '../types/betDetails'
import axios from 'axios';

export default defineComponent({
    name:'historyBetsComp',
    data(){
        return{
            userBetHistoryDetailsArray: [] as betDetails[]
        }
    },
    components:{
        userHeader
    },
    methods:{
        async getBetHistoryData(){
            await axios.get("/api/betshistory")
            .then((res)=>{
                console.log(res);
                //this.userBetHistoryDetailsArray.push(res);
            })
            .catch((err)=>{
                console.error(err);
            })
        }
    },
    mounted(){
        let userName =localStorage.getItem("full-name");
        if(!userName){
            return this.$router.push({name:'loginPage'})
        }
        //this.getBetHistoryData();
    }
})

</script>