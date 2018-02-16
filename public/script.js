//jslint white

"use strict";

var PRICE = 9.99;

// Create new Vue instance and anchor in DOM inside div ELement wih id 'app'  (index.html)
// - use CSS selector syntax to identify anchor point

new Vue({
  el: "#app",
  data: {
    total: 0,
    products: [{
        id: 1,
        title: "alpha"
      },
      {
        id: 2,
        title: "beta"
      },
      {
        id: 3,
        title: "gamma"
      },
    ],
    cart: []
  },
  methods: {
    addItem: function (index) {
      // console.log("addItem: " + index);
      this.total += PRICE;
      var product = this.products[index];
      var found = false;
      for (var i = 0; i < this.cart.length; i++) {
        if (this.cart[i].id === product.id) {
          this.cart[i].qty++;
          found = true;
        }
      }
      if (!found) {
        this.cart.push({
          id: product.id,
          title: product.title,
          qty: 1,
          price: PRICE
        });
      }


      // console.log("cart size: " + this.cart.length);
    }
  }
});