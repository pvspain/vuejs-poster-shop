//jslint white

"use strict";

var PRICE = 9.99;
var LOAD_DELTA = 10;

// Create new Vue instance and anchor in DOM inside div ELement wih id 'app'  (index.html)
// - use CSS selector syntax to identify anchor point

new Vue({
  el: "#app",
  data: {
    total: 0,
    products: [],
    cart: [],
    results: [],
    newSearchTerm: "dropbear",
    previousSearchTerm: "",
    loading: false,
    price: PRICE
  },
  computed: {
      noMoreProducts: function () {
          return this.products.length === this.results.length && this.results.length > 0;
      }
  },
  methods: {
      appendProducts: function () {
        if (this.products.length < this.results.length) {
            var productsDelta = this.results.slice(this.products.length, this.products.length + LOAD_DELTA);
            this.products = this.products.concat(productsDelta);
        }
      },
      onSubmit: function () {
        this.products = [];
        this.loading = true;
        this.$http
            .get("/search/".concat(this.newSearchTerm))
            .then(
                function (response) {
              this.previousSearchTerm = this.newSearchTerm;
              this.results = response.data;
              this.appendProducts();
              this.loading = false;
            },
                function (reason) {
                    this.loading = false;
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
  },
  mounted: function () {
     this.onSubmit();
     var vueInstance = this;
     var watchedElem = document.getElementById("product-list-bottom")
     var watcher = scrollMonitor.create(watchedElem);
     watcher.enterViewport(function() {
         vueInstance.appendProducts();
      });
  }
});

