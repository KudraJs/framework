export default definePlugin(async () => {
  return {
    provide: {
      catFact: async (): Promise<{ fact: string; length: number }> => await fetch("https://catfact.ninja/fact").then((res) => res.json()),
    },
  };
});
