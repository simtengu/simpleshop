<template>
  <div class="container my-5 py-4">
    <div v-if="isLoginActive" class="row flex-md-row-reverse">

      <div class="col-md-6 p-3 d-flex justify-content-center">
        <div class="py-5 my-2 authDiv  d-inline-block p-2 px-md-5">
            
          <form action="" class="form">
            <h4 style="font-family: 'Source Sans Pro', sans-serif " class=" mb-3 text-danger">Login here</h4>
            <div class="form-group my-4">
              <input v-model="username" type="email" id="email" placeholder="enter email" required />
            </div>
            <div class="form-group my-4">
              <input v-model="pwd" type="email" id="password" placeholder="enter password" required />
            </div>
            <button
              @click.prevent="submitLoginForm"
              type="submit"
              class="btn btn-danger btn-md mt-3"
            >
              Login
            </button><br>
             <button @click="isLoginActive = !isLoginActive" class="mt-2 btn p-0"><span class=" text-muted text-times font-14 mt-4">I don't have an account</span></button>
          </form>
        </div>
      </div>
      <div id="loginRow" class="col-md-6">
          <img :src="img" alt="" class="img-fluid">
      </div>
    </div>

    <div v-if="!isLoginActive" class="row">
      <div class="col-md-5 text-right">
        <img :src="welcome" alt="" class="img-fluid">
      </div>
      <div class="col-md-7 p-3 d-flex justify-content-center">
        <div class="py-5 my-2 card authDiv d-inline-block p-2 px-md-5">
          <form action="" class="form">
            <h4 style="font-family: 'Source Sans Pro', sans-serif " class=" mb-3 text-danger">Register Here</h4>
            <div class="form-group my-4">
              <input
                v-model="name"
                type="text"
                id="name"
                placeholder="enter your name"
                required
                autocomplete="off"
              />
            </div>

            <div class="form-group my-4">
              <input
                v-model="email"
                type="email"
                id="email"
                placeholder="enter email"
                required
              />
            </div>
            <div class="form-group my-4">
              <input
                v-model="password"
                type="password"
                id="password"
                placeholder="enter password"
                required
              />
            </div>

            <div class="form-group my-4">
              <input
                v-model="cpassword"
                type="password"
                id="cpassword"
                placeholder="confirm password"
                required
              />
            </div>

            <button
              @click.prevent="submitRegistrationForm"
              type="submit"
              class="btn btn-danger btn-md mt-3"
            >
              Register
            </button><br>

            <button @click="isLoginActive=!isLoginActive" class="mt-2 btn p-0"><span class=" text-muted text-times font-14 mt-4">go to login</span></button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import img from "../images/login.jpg"
import welcome from "../images/signupp.png"
import axios from "axios"
 
import { mapActions,mapMutations ,mapState} from "vuex";
export default {
  computed:{
    ...mapState(['access_token'])
  },
  data() {
    return {
      email: "",
      password: "",
      Cpassword: "",
      name: "",
      isLoginActive: true,
      img,
      welcome,
      username: "",
      pwd: ""
    };
  },
  methods: {
    ...mapActions(["login", "register"]),
    ...mapMutations(["setIsLoading", "unSetIsLoading","setAccessToken"]),
    submitLoginForm: async function () {
      let data = {
        email: this.username,
          password: this.pwd,
        };
        
      if (this.username && this.pwd) {

      try {
        this.setIsLoading();
        let rs = await axios.post("https://simpleshop.chuobusiness.com/api/signin", data);
        let info = await rs.data;
        if (rs.status === 200) {
          let auth_data = {
            user: info.user,
            token: info.access_token
          }
          localStorage.setItem('user_token', info.access_token);
          localStorage.setItem('auth_user_id', info.user.id);
           this.setAccessToken(auth_data);
           this.$router.push('/');
        } else {
          alert("Wrong Username or Password..")
        }
        this.unSetIsLoading();
       

      } catch (error) {
        console.log("error", error.message);
       this.unSetIsLoading();
      }
  

      } else {
        alert("make sure you fill all fields");
      }
 

    },
    submitRegistrationForm: function () {
      let data = {
        name: this.name,
        email: this.email,
        password: this.password,
      };
      if (this.name && this.email && this.password) {

      if (this.password === this.Cpassword) {
        this.register(data);
      }else{
        alert("password doesn't match")
      }
      } else {
        alert("make sure you fill all fields");
      }
    },
  },
  created(){
    if (this.access_token) {
      
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
input {
  border: none;
  border-bottom: 1px solid #dfdfdf;
  padding: 4px 3px;
}
button,
input {
  box-sizing: border-box;
}
    /* font-family: 'Open Sans', sans-serif;

    font-family: 'Playfair Display', serif;

    font-family: 'Roboto', sans-serif;

    font-family: 'Source Sans Pro', sans-serif; */
</style>