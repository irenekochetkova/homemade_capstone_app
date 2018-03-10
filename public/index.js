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

 var DishesIndexPage = {
  template: "#dish-index-page",
  data: function() {
    return {
      dishes: [],
      currentDish: {}
      
    };
  },
  created: function() {

    axios.get("http://localhost:3000/dishes").then(function(response) {

      this.dishes = response.data; 
      console.log(response.data);

    }.bind(this));
  },
methods: {
  setCurrentDish: function(dish) {
    this.currentDish = dish;
    console.log(this.currentDish);
  }
 }

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
      availability: "",
      user_id: "",
      errors: [],
      categories: []
    };
  },
  created: function() {

    axios.get("http://localhost:3000/categories").then(function(response) {

      this.categories = response.data; 
      console.log(response.data);

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
      availability: "",
      user_id: "",
      errors: [],
      categories: []
    };
  },
  created: function() {
    

    axios.get("/dishes/" + this.$route.params.id).then(
      function(response) {
        this.name = response.data.name;
        this.price = response.data.price;
        this.description = response.data.description;
        this.category_id = response.data.category_id;
        this.image_url = response.data.image_url;
        this.availability = response.data.availability;
        this.user_id = response.data.user_id;
      }.bind(this)),
    axios.get("/categories/").then(function(response) {
      this.categories = response.data; 
      console.log(response.data);
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
            router.push("/login");
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
      dish: {}
    };
  },
  created: function() {
    axios.delete("/dishes/" + this.$route.params.id).then(function(response) {
      console.log(response.data);
      this.dish = response.data.delete;
    }.bind(this));
  }
}

var LogoutPage = {
  created: function() {
    axios.defaults.headers.common["Authorization"] = undefined;
    localStorage.removeItem("jwt");
    router.push("/");
  }
};

var router = new VueRouter({
  routes: [
    { path: "/", component: DishesIndexPage },
    { path: "/signup", component: SignupPage },
    { path: "/login", component: LoginPage },
    { path: "/logout", component: LogoutPage },
    { path: "/dishes/new", component: DishesNewPage },
    { path: "/dishes/:id/edit", component: DishesEditPage },
    { path: "/dishes/:id/delete", component: DishesDeletePage }
    
    
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

