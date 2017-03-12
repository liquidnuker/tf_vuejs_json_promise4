const Vue = require("./vendor/vue.min.js");

// 
// ======================================================/
const store = {
  debug: true,
  state: {
    message: "",
    filteredId: ""
  }
};

// 
// ======================================================/
const vmA = new Vue({
  el: "#app",
  data: {
    privateState: {},
    sharedState: store.state,
    loading: true
  },
  methods: {}
});

const vmB = new Vue({
  el: "#app2",
  data: {
    privateState: {},
    sharedState: store.state
  }
});

const vmC = new Vue({
  el: "#descriptionBox",
  data: {
    privateState: {},
    sharedState: store.state
  }
});

export {store, vmA, vmB, vmC};