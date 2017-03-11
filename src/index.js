import "./styles/main.scss";

const Vue = require("./js/vendor/vue.min.js");
import {where} from "underscore";
import "./js/vendor/jPages.min.js";

// 
// ======================================================/
const jsonUrl = "src/js/ajax/bonsai.json";
const jsonLoader = {
  start: (url) => {
    return new Promise(function (resolve, reject) {
      let req = new XMLHttpRequest();
      req.open("GET", url);

      req.onload = () => {
        if (req.status == 200) {
          resolve(req.response);
        } else {
          reject(Error(req.statusText));
        }
      };

      req.onerror = () => {
        reject(Error("error"));
      };

      req.send();
    });
  },
  getJSON: (url) => {
    return jsonLoader.start(url).then(JSON.parse);
  },
  filter: (speciesToFilter) => {
    return new Promise(function (resolve, reject) {
      $("#paginator").jPages("destroy");
      store.state.message = where(store.state.message, {
        species: speciesToFilter
      });

      resolve(store.state.message);
      // reject(Error("error"));

    }).then(function (resolved) {
      // success
      // console.log(resolved); 
      // return store.state.message;
      showPages();
    }, function (err) {
      console.log(err); // error
    });
  },
  filterId: (idToFilter) => {
    store.state.filteredId = where(store.state.message, {
      id: idToFilter
    });
    console.log(store.state.filteredId);
  },
  preloader: () => {
    const spinner = `<div class="sk-wave">
      <div class="sk-rect sk-rect1"></div>
      <div class="sk-rect sk-rect2"></div>
      <div class="sk-rect sk-rect3"></div>
      <div class="sk-rect sk-rect4"></div>
      <div class="sk-rect sk-rect5"></div>
      </div>`;
    document.getElementById("loader").innerHTML = spinner;
  }
};

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