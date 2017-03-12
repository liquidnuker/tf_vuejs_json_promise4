import "./styles/main.scss";

import {store, vmA, vmB, vmC} from "./js/vue-components";
import {jsonLoader} from './js/jsonLoader.js';
import "./js/vendor/jPages.min.js";
import {jsonFilter} from './js/jsonFilter.js';

// 
// ======================================================/
const jsonUrl = "src/js/ajax/bonsai.json";

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
      jsonFilter.filterId(this.id);
    });

    $("#filterSpecies").on("click", function () {
      jsonFilter.filter("Jukan").then(function() {
        showPages();
      });
    });
  };

  if (document.readyState !== "loading") start();
  else if (document.addEventListener) document.addEventListener("DOMContentLoaded", start);
  else document.attachEvent("onreadystatechange", function () {
    if (document.readyState === "complete") start();
  });
})();