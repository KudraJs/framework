interface Promotion {
  id: number;
  name: string;
  description: string;
}

export const state = () => ({
  promotions: [] as Promotion[],
});

export const getters = defineGetters(state, {
  getPromotions: (state) => state.promotions,
});
