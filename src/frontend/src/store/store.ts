import {createStore, Store} from 'vuex'
import countryDetails from '../types/countryDetails'
import matchDetails from '../types/matchDetails'

interface State{
    countryDetailsArray: countryDetails[],
    matchDetailsArray: matchDetails[]
}

const store: Store<State> = createStore({
    state:{
        countryDetailsArray:[] as countryDetails[],
        matchDetailsArray:[] as matchDetails[]
    },
    mutations:{
        storeCountryData:(state,payload:countryDetails[]):void =>{
            state.countryDetailsArray = []
            state.countryDetailsArray.push(...payload)
        },
        storeMatchDetails:(state,payload:matchDetails[]):void =>{
            state.matchDetailsArray = []
            state.matchDetailsArray.push(...payload)
        }
    },
    actions:{
        storeCountryData:(context,payload:countryDetails[]) =>{
            context.commit('storeCountryData', payload)
        },
        storeMatchDetails:(context, payload:matchDetails) =>{
            context.commit('storeMatchDetails', payload)
        }
    }
})


export default store;