//jslint white

"use strict";

var PRICE = 9.99;

// Create new Vue instance and anchor in DOM inside div ELement wih id 'app'  (index.html)
// - use CSS selector syntax to identify anchor point

new Vue({
  el: "#app",
  data: {
    total: 0,
    products: [],
    cart: [],
    search: ""
  },
  methods: {
      onSubmit: function () {
        console.log(this.search);
        this.$http
            .get("/search/".concat(this.search))
            .then(function (response) {
              this.products = response.data
            })
      },
      addItem: function (index) {
      // console.log("addItem: " + index);
      this.total += PRICE;
      var product = this.products[index];
      var found = false;
      for (var i = 0; i < this.cart.length; i++) {
        if (this.cart[i].id === product.id) {
          this.cart[i].qty++;
          found = true;
          break;
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
    },
    inc: function (item) {
      item.qty++;
      this.total += item.price;
    },
    dec: function (item) {
      item.qty--;
      this.total -= item.price;
      if (item.qty === 0) {
        for (var i = 0; i < this.cart.length; i++) {
          if (this.cart[i].id === item.id) {
            this.cart.splice(i, 1);
          }
        }
      }
    }
  },
  filters: {
    currency: function (price) {
      return "$".concat(price.toFixed(2))
    }
  }
});