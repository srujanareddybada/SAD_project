<template>
  <div>
    <div>
      <!-- <div :v-model="(yourUserID = userId)">
        <b class="mr-14">User ID: </b>{{ userId }}
      </div> -->
      <div :v-model="(compName = mObj.competitionName)">
        <b class="mr-4">Competition Name: </b> {{ mObj.competitionName }}
      </div>
      <div :v-model="(hTeam = mObj.homeTeamName)">
        <b class="mr-14">Home Team:</b> {{ mObj.homeTeamName }}
      </div>
      <div :v-modeel="(aTeam = mObj.awayTeamName)">
        <b class="mr-14">Away Team: </b>{{ mObj.awayTeamName }}
      </div>
      <div :v-model="(matchSch = mObj.matchDateandTime)">
        <b class="mr-14">Match Day: </b>
        {{ mObj.matchDateandTime.slice(0, 10) }} -
        {{ mObj.matchDateandTime.slice(11, 16) }}
      </div>

      <div v-if="teamType">
        <div :v-model="(bettedHomeTeamOdd = mObj.homeTeamWinningOdds)">
          <b class="mr-2">Home Team Odds: </b>
          {{ mObj.homeTeamWinningOdds }}
        </div>
        <div class="flex">
          <label><b>Your Bet On Home Team:</b> </label>
          <input type="number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" v-model="yourBetMoney"/>
        </div>
        <button
          @click="handleBetOnHomeTeam"
          class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Submit
        </button>
        <button
          @click="cancelPlacingBet"
          class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Cancel
        </button>
      </div>
      <div v-else>
        <div :v-model="(bettedAwayTeamOdd = mObj.awayTeamWinningOdds)">
          <b class="mr-2">Away Team Odds: </b>
          {{ mObj.awayTeamWinningOdds }}
        </div>
        <div class="flex">
          <label class="mr-3"><b>Your Bet On Away Team: </b></label
          ><input
            type="number"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2"
            v-model="yourBetMoney"
          />
        </div>
        <button
          @click="handleBetOnAwayTeam"
          class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Submit
        </button>
        <button
          @click="cancelPlacingBet"
          class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import matchDetails from "../types/matchDetails";
import axios from "axios";
export default defineComponent({
  name: "placeBetComp",
  data() {
    return {
      yourUserID: '' as string | undefined | null,
      compName: "" as string,
      hTeam: "" as string,
      aTeam: "" as string,
      matchSch: "" as string,
      yourBetMoney: 0 as number,
      bettedHomeTeamOdd: 0 as number,
      bettedAwayTeamOdd: 0 as number,
      sessionTk: "" as string | null
    };
  },
  props: {
    userId: String,
    teamType: Boolean,
    mObj: {
      type: Object as () => matchDetails,
      required: true,
    },
  },
  methods: {
    async handleBetOnHomeTeam() {
      this.$emit("bet-modal-event", false);
      //HTTP POST REQUEST TO STORE BET DATA IN THE MONGODB COLLECTION USERBETS
      const headers = {
        Authorization: `Bearer ${this.sessionTk}`,
        "Content-Type": "application/json",
      };
      await axios
        .post(`/api/user/${this.yourUserID}/bets`,
          [
            {
              betAmount: this.yourBetMoney,
              betEvent: { 
                odds: this.bettedHomeTeamOdd, 
                bettedTeam: this.hTeam,
                otherTeam: this.aTeam,
                competitionName: this.compName,
                matchSchedule: this.matchSch
              },
              successBetReturnAmount: (this.bettedHomeTeamOdd * this.yourBetMoney).toFixed(2),
              outcome: "scheduled",
              match: {"_id": this.mObj.matchID}, 
            },
          ],
          { headers }
        )
        .then((res) => {
          alert('Your successfully placed your bet!');
          console.log(res);
        })
        .catch((err) => {
          alert('Failed to place your bet, please try again!')
          console.error(err);
        });
    },
    async handleBetOnAwayTeam() {
      this.$emit("bet-modal-event", false);
      //HTTP POST REQUEST TO STORE BET DATA IN THE MONGODB COLLECTION USERBETS
      const headers = {
        Authorization: `Bearer ${this.sessionTk}`,
        "Content-Type": "application/json",
      };
      await axios
        .post(`/api/user/${this.yourUserID}/bets`,
        [
            {
                betAmount: this.yourBetMoney,
                betEvent: { 
                odds: this.bettedAwayTeamOdd, 
                bettedTeam: this.aTeam,
                otherTeam: this.hTeam,
                competitionName: this.compName,
                matchSchedule: this.matchSch
              },
              successBetReturnAmount: (this.bettedAwayTeamOdd * this.yourBetMoney).toFixed(2),
              outcome: "scheduled",
              match: {"_id": this.mObj.matchID}, 
            },
          ],
          { headers }
        )
        .then((res) => {
          alert('Your successfully placed your bet!');
          console.log(res);
        })
        .catch((err) => {
          alert('Failed to place your bet, please try again!')
          console.error(err);
        });
    },
    cancelPlacingBet() {
      console.log("Bet cancelled");
      this.$emit("bet-modal-event", false);
    }
  },
  mounted() {
    let sessTk = localStorage.getItem("sessiontoken");
    if(sessTk != null){
      sessTk = sessTk.substring(1, (sessTk.length - 1));
      this.sessionTk = sessTk;
    }
    let uID = localStorage.getItem("user-id");
    if(uID != null){
      uID = uID.substring(1, (uID.length - 1));
      this.yourUserID = uID;
    }
    
  },
});
</script>

<style></style>
