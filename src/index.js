import "./styles/main.scss";

import {store, vmA} from "./js/vue-components";
import {jsonLoader} from './js/jsonLoader.js';
import {jsonFilter} from './js/jsonFilter.js';
import {showPages} from "./js/paginator.js";

// 
// ======================================================/
const jsonUrl = "src/js/ajax/bonsai.json";

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