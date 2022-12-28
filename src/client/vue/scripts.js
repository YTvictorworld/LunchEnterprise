const { createApp } = Vue;
createApp({
  data() {
    return {
      count: 1,
    };
  },
  methods: {
    onSubmit() {
      this.count++;
      require("./ts.js");
    },
  },
}).mount("#app");
