export const state = () => ({
    counter: 0,
    name: 'tuan'
})

export const mutations =  {
    increment(state) {
        state.counter++
    }
}
export const actions = {
    increment(context) {
        context.commit('increment')
    }
}