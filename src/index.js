import "./styles/main.scss";

const Vue = require("./js/vendor/vue.min.js");
import {jsonLoader} from './js/jsonLoader.js';
import {where} from "underscore";
import "./js/vendor/jPages.min.js";

// 
// ======================================================/
const jsonUrl = "src/js/ajax/bonsai.json";

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

// 
// ======================================================/
const showPages = () => {
  $("#paginator").jPages({
    containerID: "galleryContainer",
    first: "first",
    previous: "previous",
    next: "next",
    last: "last",
    links: "numeric", // blank || title
    delay: 0, // to remove fade
    fallback: 0, // to remove fade
    startPage: 1,
    perPage: 10,
    midRange: 5,
  });
};

jsonLoader.preloader();
jsonLoader.getJSON(jsonUrl).then(function (response) {
  store.state.message = response.bonsai;
  vmA.loading = false;
}).then(function () {
  showPages();
});

(function () {
  const start = () => {
    $(document.body).on("click", "img", function () {
      jsonLoader.filterId(this.id);
    });

    $("#filterSpecies").on("click", function () {
      jsonLoader.filter("Jukan");
    });
  };

  if (document.readyState !== "loading") start();
  else if (document.addEventListener) document.addEventListener("DOMContentLoaded", start);
  else document.attachEvent("onreadystatechange", function () {
    if (document.readyState === "complete") start();
  });
})();