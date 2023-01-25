import { createStore } from 'vuex'

const store = createStore({
    state:{
        cart:[],
    },
    mutations:{
        addProduct:(state,product)=>{
            state.cart.push(product)
        }
    },
    getters:{
        getCart:(state)=>{
            return state.cart
        }
    },
})
export default store;