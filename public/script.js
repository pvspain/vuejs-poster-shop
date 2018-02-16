//jslint white

"use strict";

// Create new Vue instance and anchor in DOM inside div ELement wih id 'app'  (index.html)
// - use CSS selector syntax to identify anchor point

new Vue({
  el: "#app",
  data: {
    total: 0,
    items: [
      {"title": "alpha"},
      {"title": "beta"},
      {"title": "gamma"},
    ],
    cart: []
  },
  methods: {
    "addItem": function (index) { 
      console.log("addItem: " + index);
      this.total += 9.99 
    }
  } 
});