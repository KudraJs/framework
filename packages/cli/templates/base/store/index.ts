export const state = () => ({
    // ...
  });
  
export const getters = defineGetters(state, {
    // ...
})
  
export const mutations = defineMutations(state, {
    // ...
})
  
export const actions = defineActions({state, getters, mutations}, {
    // ...
})
  
export default defineStore({
    state,
    getters,
    mutations,
    actions,
});
  