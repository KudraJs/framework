export default definePlugin((nuxt) => {
  return {
    provide: {
      sayStuff: (msg: string) => {
        console.log(msg);
      },
    },
  };
});
