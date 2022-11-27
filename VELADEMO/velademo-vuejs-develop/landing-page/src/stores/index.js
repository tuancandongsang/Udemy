

import {createStore} from 'vuex'
import auth from './auth/auth'
import cart from './cart/cart'
import routerpath from './router/router'


const store = createStore({
    modules:{
        auth,
        cart,
        routerpath,
    }
})

export {store}
