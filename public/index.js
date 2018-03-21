/* global Vue, VueRouter, axios */

var SignupPage = {
  template: "#signup-page",
  data: function() {
    return {
      first_name: "",
      last_name: "",
      email: "",
      image_url: "",
      phone_number: "",
      zipcode: "",
      provider: "",
      password: "",
      passwordConfirmation: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        image_url: this.image_url,
        phone_number: this.phone_number,
        zipcode: this.zipcode,
        provider: this.provider,
        password: this.password,
        password_confirmation: this.passwordConfirmation
        };
      axios
        .post("/users", params)
        .then(function(response) {
          router.push("/login");
        })
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    }
  }
};

var ProfileShowPage = {
  template: "#profile-show-page",
  data: function() {
    return {
      current_user: {}

    };
  },
  created: function() {
    axios.get("/current_user/").then(function(response) {
      console.log(response.data);
      this.current_user = response.data;
    }.bind(this));
  }
};

 var DishesIndexPage = {
  template: "#dish-index-page",
  data: function() {
    return {
      dishes: [],
      currentDish: {},
      users: [],
      categories: [],
      // titleFilter: "",
      
      current_user: {},

      quantity: ""
     

      
    };
  },
  created: function() {

    axios.get("http://localhost:3000/dishes").then(function(response) {
      this.dishes = response.data; 
      // console.log(response.data);
    }.bind(this)),
    axios.get("http://localhost:3000/categories").then(function(response) {

      this.categories = response.data; 
      console.log(response.data);

    }.bind(this));
    axios.get("/current_user" ).then(function(response) {
      console.log(response.data);
      this.current_user = response.data;      
    }.bind(this));
  },

methods: {
  setCurrentDish: function(dish) {
    this.currentDish = dish;
    
    console.log(this.currentDish);
  },
  


  submit: function() {
      var params = {
        quantity: this.quantity,
        dish_id:  this.currentDish.id,
        status     
      };
      axios
        .post("/carted_dishes", params)
        .then(function(response) {
          console.log(response.data)
          router.push("/");
        })
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
        $('#exampleModal').modal('hide');
    }
 },

 // computed: {
 //  titleFilter() {
 //    return
 //    this.category.filter(post => {
 //      return post.title.toLowerCase().includes(this.search.toLowerCase())
 //    })
 //  }
 // }
};

var DishesNewPage = {
  template: "#dishes-new-page",
  data: function() {
    return {
      name: "",
      price: "",
      description: "",
      category_id: "",

      image_url: "",
     
      // user_id: "",
      errors: [],
      categories: []
    };
  },
  created: function() {
   $('#exampleModal').modal('hide');
    axios.get("http://localhost:3000/categories").then(function(response) {

      this.categories = response.data; 
      // console.log(response.data);

    }.bind(this));
  },
  methods: {
    submit: function() {
      var params = {
        name: this.name,
        price: this.price,
        description: this.description,
        category_id: this.category_id,
        image_url: this.image_url
       
      };
      axios
        .post("/dishes", params)
        .then(function(response) {
          router.push("/");
        })
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    }
  }
};

var DishesEditPage = {
  template: "#dishes-edit-page",
  data: function() {
    return {
      name: "",
      price: "",
      description: "",
      category_id: "",
      image_url: "",
      
      // dish_category: "",
      user_id: "",
      errors: [],
      categories: []

    };
  },
  created: function() {
    $('#exampleModal').modal('hide');

    axios.get("/dishes/" + this.$route.params.id).then(
      function(response) {
        this.name = response.data.name;
        this.price = response.data.price;
        this.description = response.data.description;
        // this.dish_category = response.data.category_id;
        this.image_url = response.data.image_url;
        
        this.user_id = response.data.user_id;
      }.bind(this)),
    axios.get("/categories/").then(function(response) {
      this.categories = response.data; 
      //console.log(response.data);
      }.bind(this));
    
    
  },


  
  methods: {
    submit: function() {
      var params = {
        name: this.name,
        price: this.price,
        description: this.description,
        category_id: this.category_id,
        image_url: this.image_url,
        availability: this.availability
      };
      axios
        .patch("/dishes/" + this.$route.params.id, params)
        .then(function(response) {
          router.push("/");
        })
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
           
          }.bind(this)
        );
    }
  },


};


var LoginPage = {
  template: "#login-page",
  data: function() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        auth: { email: this.email, password: this.password }
      };
      axios
        .post("/user_token", params)
        .then(function(response) {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          console.log(response.data.jwt);
          router.push("/");
        })
        .catch(
          function(error) {
            this.errors = ["Invalid email or password."];
            this.email = "";
            this.password = "";
          }.bind(this)
        );
    }
  }
};

var DishesDeletePage = {
  template: "#dishes-delete-page",
  data: function() {
    return {
      dish: {},
      message: {},
      error: []
    

    };
  },
  created: function() {
    $('#exampleModal').modal('hide');
    axios.delete("/dishes/" + this.$route.params.id).then(function(response) {
      // console.log(response.data);

      this.dish = response.data.delete;

      router.push("/");
        })
        .catch(
          function(error) {
            this.errors = error.response.data.errors;

            router.push("/");
    }.bind(this));
  }
};



var LogoutPage = {
  created: function() {
    axios.defaults.headers.common["Authorization"] = undefined;
    localStorage.removeItem("jwt");
    router.push("/");
  }
};


var CartedDishesIndexPage = {
  template: "#carted_dish-index-page",
  data: function() {
    return {

      carted_dishes: [],
      dishes: [],
     
      errors: []
      
    };
  },

  created: function() {
    axios.get("/carted_dishes").then(function(response) {
      this.carted_dishes = response.data; 
      console.log(response.data);
    }.bind(this)),
    axios.get("/dishes").then(function(response) {
      this.dishes = response.data; 
      console.log(response.data);
    }.bind(this));

  },

  methods: {
    checkout: function() {
        var params = {
          carted_dishes: this.carted_dishes,
        };
        axios
          .post("/orders", params)
          .then(function(response) {
            router.push("/");
          })
          .catch(
            function(error) {
              this.errors = error.response.data.errors;
              router.push("/login");
            }.bind(this)
          );
      }
  },
  
 
     
};

var CartedDishesDeletePage = {
  template: "#cartedDishes-delete-page",
  data: function() {
    return {
      dish: {}
    };
  },
  created: function() {
     $('#exampleModal').modal('hide');
    axios.delete("/carted_dishes/" + this.$route.params.id).then(function(response) {
      console.log(response.data);
      this.carted_dish = response.data.delete;
    }.bind(this));
  }
};


// var OrdersShowPage = {
//   template: "#orders-show-page",
//   data: function() {
//     return {
//       order: {},
//       dishes: [],
//       carted_dishes: []
//     };
//   },
//   created: function() {
//     axios.get("/orders/" + this.$route.params.id).then(function(response) {
//       console.log(response.data);
//       this.order = response.data; 
//       this.carted_dishes = this.order["carted_dishes"]
//     // console.log(carted_dishes);     
//     }.bind(this));
    
//   }
// };

var OrdersIndexPage = {
  template: "#orders-index-page",
  data: function() {
    return {

      orders: [],
      carted_dishes: [],
      dishes: []
            
    };
  },
  created: function() {
    axios.get("/carted_dishes").then(function(response) {
      this.carted_dishes = response.data; 
      console.log(response.data);
    }.bind(this)),
     axios.get("/dishes").then(function(response) {
      this.dishes = response.data; 
      console.log(response.data);
    }.bind(this)),
    axios.get("/orders/").then(function(response) {
      this.orders = response.data; 
      // this.carted_dishes = this.orders["carted_dishes"]
      // console.log(response.data);
    }.bind(this));
    
  },  
     
};





var router = new VueRouter({
  routes: [
    { path: "/", component: DishesIndexPage },
    { path: "/signup", component: SignupPage },
    { path: "/login", component: LoginPage },
    { path: "/logout", component: LogoutPage },
    { path: "/current_user", component: ProfileShowPage },
    { path: "/dishes/new", component: DishesNewPage },
    { path: "/dishes/:id/edit", component: DishesEditPage },
    { path: "/dishes/:id/delete", component: DishesDeletePage },
    { path: "/carted_dishes", component: CartedDishesIndexPage },
    { path: "/carted_dishes/:id/delete", component: CartedDishesDeletePage },
    { path: "/orders", component: OrdersIndexPage }
    // { path: "/categories", component: CaPage }

  
    
    
    
  ],
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

var app = new Vue({
  el: "#vue-app",
  router: router,
  
  created: function() {
    var jwt = localStorage.getItem("jwt");
    if (jwt) {
      axios.defaults.headers.common["Authorization"] = jwt;
    }
     
  }
});

