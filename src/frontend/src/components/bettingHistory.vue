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
                <span class="text-sm font-semibold ml-1">{{ useBetHistoryDetails.betMoney }}€</span>
            </div>
            <div>
                <span class="text-blue-500 text-sm font-bold">Other Team:</span>
                <span class="text-sm font-semibold ml-1">{{ useBetHistoryDetails.otherTeam }}</span>
            </div>
            <div>
                <span class="text-blue-500 text-sm font-bold">Match Schedule:</span>
                <span class="text-sm font-semibold ml-1">{{ useBetHistoryDetails.matchSchedule.slice(0,10)}} / </span>
                <span class="text-sm font-semibold ml-1">{{ useBetHistoryDetails.matchSchedule.slice(11,16)}}</span>
            </div>
            <div>
                <span class="text-blue-500 text-sm font-bold">Match Result:</span>
                <span class="text-sm font-semibold ml-1">{{ useBetHistoryDetails.matchResult }}</span>
            </div>
            <div>
                <span class="text-blue-500 text-sm font-bold">Bet Result:</span>
                <span class="text-sm font-semibold ml-1">{{ useBetHistoryDetails.betResult }}€</span>
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
            yourUserID: ''as string | undefined | null,
            userBetHistoryDetailsArray: [] as betDetails[],
            sessionTk: ''as string | null,
        }
    },
    components:{
        userHeader
    },
    methods:{
        async getBetHistoryData(){
            const headers = {
                'Authorization': `Bearer ${this.sessionTk}`,
                'Content-Type': 'application/json',
            };
            await axios.get(`/api/user/${this.yourUserID}/bets`, {headers})
            .then((res)=>{
                let result = res.data;
                    for(let i=0; i<result.length;i++){
                        if(result[i].outcome != "scheduled"){
                            let userID: string = result[i]._id;
                            let competitionName: string = result[i].betEvent[0].competitionName;
                            let bettedTeam: string = result[i].betEvent[0].bettedTeam;
                            let betMoney: number = result[i].betAmount;
                            let otherTeam: string = result[i].betEvent[0].otherTeam;
                            let matchSchedule: string = result[i].betEvent[0].matchSchedule;
                            let matchResult: string = result[i].outcome;
                            let betResult: number = matchResult == "won" ? result[i].successBetReturnAmount : 0;
                            this.userBetHistoryDetailsArray.push({
                                userID,competitionName,bettedTeam,betMoney,otherTeam,matchSchedule,matchResult,betResult
                        })
                        }
                    }
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
        let sessTk = localStorage.getItem("sessiontoken");
        if(sessTk != null){
            sessTk = sessTk.substring(1, (sessTk.length - 1));
            this.sessionTk = sessTk;
        }
        let uID = localStorage.getItem("user-id");
        if (uID != null) {
            uID = uID.substring(1, (uID.length - 1));
            this.yourUserID = uID;
        }
        this.getBetHistoryData()
    }
})

</script>