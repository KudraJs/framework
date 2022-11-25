import * as promotion from "./promotion";

export const state = () => ({
  emails: ["jacobgardos@gmail.com", "sodrag@outlook.com"] as string[],
});

export const getters = defineGetters(state, {
  getEmails: (state) => state.emails,
});

export const mutations = defineMutations(state, {
  addEmail: (state, email: string) => {
    state.emails.push(email);
  },
});

export default defineStore({
  state,
  getters,
  mutations,
  modules: {
    promotion,
  },
});
