<template>
<userHeader :subHeaderName="userBlockedMessage" />

<div class="flex min-h-screen">

    <!--SIDE BAR TO LIST OUT THE COUNTRIES-->
    <div class="w-1/5 bg-gray-200">
        <div class="flex h-10 bg-gray-200"></div>
        <div class="flex h-10 bg-gray-200"></div>
        <div v-for="(countryDetail,i) in countryDetailsArray" :key="i">
            <button class="text-white w-full bg-blue-400 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" v-on:click="SelectedCntUpMatchDetails(countryDetail.countryName)">
                <div class="flex h-8">
                    <img :src="countryDetail.flag" width="30" height="30" class="mr-2" /><b>{{ countryDetail.countryName }}</b>
                </div>
            </button>
        </div>
    </div>

    <div class="w-4/5 bg-red-200 container">
        <!--SEARCH BAR-->
        <div class="flex h-13">
            <input type="text" class="p-2 border border-gray-300 rounded-l-md w-full" placeholder="Enter a team name..." v-model="searchTeam" />
            <button class="bg-green-400 hover:bg-blue-600 text-white p-2 rounded-r-md" ref="searchData">Search</button>
            <button class="bg-red-400 hover:bg-blue-600 text-white p-2 rounded-r-md" v-on:click="resetFilter()">Reset</button>
        </div>
        <nav class="bg-blue-300 border-gray-200 px-1 lg:px-2 py-1 text-white p-5 flex justify-center">
            <button class="bg-gray-700 hover:bg-gray-600 text-white py-1 px-1 rounded mr-4" type="button" v-on:click="dispUpMatches()">Upcoming Matches</button>
            <button class="bg-gray-700 hover:bg-gray-600 text-white py-1 px-1 rounded" type="button" v-on:click="dispLiveMatches()">Live</button>
        </nav>

        <!--DIV TO DISPLAY ALL UPCOMING MATCHES-->
        <div v-for="(countryDetail, i) in countryDetailsArray" :key="i" v-show="showUpcomingMatches">
            <div class="overflow-x-scroll">
                <div class="bg-green-200 h-8 flex border border-gray-300 justify-center container">
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
                                    <!--POP-UP TO PLACE BETS-->
                                    <div class="bg-gray-200 p-2">
                                        <div class="root">
                                            <button :disabled="isUserBlocked" v-on:click="teleportMatchDetail = matchDetail; showModal = true; teleportHomeTeamType = true" class="text-gray-900 bg-gray-200 border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 w-full">
                                                {{ matchDetail.homeTeamWinningOdds }}</button>
                                            <teleport to="body">
                                                <div class="modal" v-if="showModal">
                                                    <placeBetComp :mObj="teleportMatchDetail" :userId="userId" :teamType="teleportHomeTeamType" @bet-modal-event="handlePlaceBetEvent" />
                                                </div>
                                            </teleport>
                                        </div>
                                    </div>
                                    <div class="bg-gray-200 p-2">
                                        <div class="root">
                                            <button :disabled="isUserBlocked" v-on:click="teleportMatchDetail = matchDetail; showModal = true; teleportHomeTeamType=false" class="text-gray-900 bg-gray-200 border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 w-full">{{ matchDetail.awayTeamWinningOdds }}</button>
                                            <teleport to="body">
                                                <div class="modal" v-if="showModal">
                                                    <placeBetComp :mObj="teleportMatchDetail" :userId="userId" :teamType="teleportHomeTeamType" @bet-modal-event="handlePlaceBetEvent" />
                                                </div>
                                            </teleport>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-else></div>
                    </div>
                </div>

                <br />
            </div>

        </div>

        <!--DIV TO DISPLAY ONLY SELECTED COUNTRY'S UPCOMING MATCHES-->
        <div v-if="clickedCountryObject" v-show="showSelectedCntMatches">
            <div class="bg-green-200 h-8 flex border border-gray-300 justify-center container">
                <img :src="clickedCountryObject.flag" width="30" height="30" /><b>{{ clickedCountryObject.countryName}}</b>
            </div>
            <div class="grid grid-cols-2 gap-1">
                <div v-for="(matchDetail, j) in clickedCntMatchDetailsArray" :key="j" class="flex-shrink-0">
                    <!-- Don't think below v-if is needed -->
                    <div v-if="matchDetail.hostingCountry === clickedCountryObject.countryName">
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
                            <div class="grid grid-cols-2 gap-1 w-full text-sm">

                                <div class="bg-gray-400 p-2 font-semibold">Home Team</div>
                                <div class="bg-gray-400 p-2 font-semibold">Away Team</div>
                                <div class="bg-gray-200 p-2 flex">
                                    <img :src="matchDetail.homeTeamCrest" width="10" height="10" />{{ matchDetail.homeTeamName }}
                                </div>
                                <div class="bg-gray-200 p-2 flex">
                                    <img :src="matchDetail.awayTeamCrest" width="10" height="10" />{{ matchDetail.awayTeamName }}
                                </div>
                                <!--POP-UP TO PLACE BETS-->
                                <div class="bg-gray-200 p-2">
                                    <div class="root">
                                        <button :disabled="isUserBlocked" v-on:click="teleportMatchDetail = matchDetail; showModal = true; teleportHomeTeamType = true" class="text-gray-900 bg-gray-200 border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 w-full">{{ matchDetail.homeTeamWinningOdds }}</button>
                                        <teleport to="body">
                                            <div class="modal" v-if="showModal">
                                                <placeBetComp :mObj="teleportMatchDetail" :userId="userId" :teamType="teleportHomeTeamType" @bet-modal-event="handlePlaceBetEvent" />
                                            </div>
                                        </teleport>
                                    </div>
                                </div>
                                <div class="bg-gray-200 p-2">
                                    <div class="root">
                                        <button :disabled="isUserBlocked" v-on:click="teleportMatchDetail = matchDetail; showModal = true; teleportHomeTeamType=false" class="text-gray-900 bg-gray-200 border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 w-full">{{ matchDetail.awayTeamWinningOdds }}</button>
                                        <teleport to="body">
                                            <div class="modal" v-if="showModal">
                                                <placeBetComp :mObj="teleportMatchDetail" :userId="userId" :teamType="teleportHomeTeamType" @bet-modal-event="handlePlaceBetEvent" />
                                            </div>
                                        </teleport>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else>

                    </div>
                </div>

            </div>
        </div>

        <!--DIV TO DISPLAY ALL LIVE MATCHES-->
        <div v-show="showLiveMatches">
            <p>No Live Matches!</p>
        </div>

        <!--DIV TO DISPLAY ONLY SELECTED COUNTRY LIVE MATCHES-->
    </div>
</div>
</template>

<script lang="ts">
import {
    defineComponent
} from 'vue';
import userHeader from './userHeader.vue';
import countryDetails from '../types/countryDetails';
import matchDetails from '../types/matchDetails';
import placeBetComp from './placeBets.vue'
import {
    useStore
} from 'vuex';

export default defineComponent({
    name: 'landingComp',
    data() {
        return {
            userId: 1 as number,
            searchTeam: ''as string,
            teleportMatchDetail: {} as matchDetails,
            teleportHomeTeamType: true as boolean,
            countryDetailsArray: [] as countryDetails[],
            matchDetailsArray: [] as matchDetails[],
            clickedCountry: '',
            store: useStore(),
            showUpcomingMatches: true,
            showSelectedCntMatches: false,
            showLiveMatches: false,
            showSelectedCntLiveMatches: false,
            clickedCntMatchDetailsArray: [] as matchDetails[],
            showModal: false,
            userBlockedMessage: '' as string,
            isUserBlocked: false

        }
    },
    computed: {
        clickedCountryObject(): countryDetails | undefined {
            this.matchDetailsArray.forEach((matchObject) => {
                if (matchObject.hostingCountry === this.clickedCountry) {
                    this.clickedCntMatchDetailsArray.push(matchObject)
                }
            });
            return this.countryDetailsArray.find((country: countryDetails) => country.countryName === this.clickedCountry);
        }
    },
    components: {
        userHeader,
        placeBetComp
    },
    methods: {
        SelectedCntUpMatchDetails(countryName: string): void {
            this.showUpcomingMatches = false;
            this.showSelectedCntLiveMatches = false;
            this.showLiveMatches = false;
            this.showSelectedCntMatches = true;
            this.clickedCountry = countryName;
            this.clickedCntMatchDetailsArray = [];
        },
        dispUpMatches() {
            this.showSelectedCntMatches = false;
            this.showSelectedCntLiveMatches = false;
            this.showLiveMatches = false;
            this.showUpcomingMatches = true;
        },
        dispLiveMatches() {
            this.showSelectedCntMatches = false;
            this.showUpcomingMatches = false;
            this.showSelectedCntLiveMatches = false;
            this.showLiveMatches = true;
        },
        handlePlaceBetEvent(payload: boolean) {
            this.showModal = payload;
        },
        resetFilter():void {
            this.searchTeam = '';
            this.loadCompleteData();
        },
        loadCompleteData():void {
            this.countryDetailsArray = this.store.state.countryDetailsArray;
            this.matchDetailsArray = this.store.state.matchDetailsArray;
        },
        loadFilteredData():void {
            let matchDetailsArrayForFilter: matchDetails[] = this.store.state.matchDetailsArray;
            let clickedCntMatchDetailsArrayForFilter: matchDetails[] = this.clickedCntMatchDetailsArray;
            this.matchDetailsArray = [];
            this.clickedCntMatchDetailsArray = [];
            if (this.clickedCntMatchDetailsArray.length > 0) {
                this.clickedCntMatchDetailsArray = clickedCntMatchDetailsArrayForFilter.filter(matchDetail =>{
                    return matchDetail.homeTeamName == this.searchTeam || matchDetail.awayTeamName == this.searchTeam
                })
            } else {
                this.matchDetailsArray = matchDetailsArrayForFilter.filter(matchDetail => {
                    return matchDetail.homeTeamName == this.searchTeam || matchDetail.awayTeamName == this.searchTeam;
                })
            }
        },
        isUserBlockedFunc():void{
            // // let blockedStatus = this.store.state.userObject.blocked;
            // // if(blockedStatus){
            //     this.isUserBlocked = true;
            //     this.userBlockedMessage = 'You are banned from betting!'
            // // }
            console.log('object');
        }
    },
    mounted() {
        this.loadCompleteData();
        this.isUserBlockedFunc()
        //Once a user logs in, get the whole object. Use it for localStorage, isAdmin, isBlocked, name in header also
    },
    updated() {
        const searchDataElement = this.$refs.searchData as HTMLElement;
        searchDataElement.addEventListener('click', this.loadFilteredData);
    }
})
</script>

<style scoped>
.root {
    position: relative;
}

.modal {
    position: fixed;
    z-index: 999;
    top: 20%;
    left: 50%;
    width: 40%;
    height: 100%;
    margin-left: -150px;
}

.modal>div {
    background-color: #84dbd9;
    padding: 5%;
    border-radius: 10px;
}
</style>
