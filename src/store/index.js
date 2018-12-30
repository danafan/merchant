import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		isLoading: false
	},
	mutations: {
    	// 控制loading显示隐藏
    	UPDATE_STATUS(state, payload) {
    		state.isLoading = payload.isLoading
    	}
    },
    actions: {
        update_status(state, payload){
            state.commit('UPDATE_STATUS', payload)
        }
    },
    getters: {
        get_status(state){
            return state.isLoading
        }
    }

})