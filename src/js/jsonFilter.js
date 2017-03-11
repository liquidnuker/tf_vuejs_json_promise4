import {store} from "./vue-components";
import {where} from "underscore";

export const jsonFilter = {
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
      console.log("resolved"); 
      return store.state.message;
      
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