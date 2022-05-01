<template>
  <header class="">
    <div class="bg-app-secondary w-100 px-2 container-fluid">
      <div
        style="min-height: 30px"
        class="container d-flex flex-column justify-content-center"
      >
        <div class="d-flex justify-content-between text-times">
          <div>
            <span class="text-light mx-2"><i class="fas fa-phone text-danger"></i> 0710162838</span>
            <span class="text-light mx-2 d-none d-md-inline-block"><i class="fas fa-envelope-square text-danger"></i> albertsimtengu@gmail.com</span>
          </div>
          <div>
            <router-link
              v-if="!access_token"
              to="/login"
              class="
                text-danger text-uppercase text-decoration-none text-times
                font-14
                mx-2
              "
              >login/Register</router-link
            >
            <router-link
              v-if="access_token"
              to="/account"
              class="
                text-danger text-uppercase text-decoration-none text-times
                font-14
              "
              >my account</router-link
            >
            <button
              @click="logout"
              v-if="access_token"
              class="btn btn-sm mx-2 p-1 text-danger text-uppercase"
            >
              <i class="fas fa-sign-out-alt"></i>logout
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      style="min-height: 100px"
      class="container-fluid bg-black d-flex flex-column justify-content-center pb-4 pt-1"
    >
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-6 d-flex">
            <div class="d-flex align-items-end">
              <router-link class="text-decoration-none" to="/">
                <h2
                  class="text-light font-weight-bold brand"
                  style="
                    font-weight: 5em;
                    font-family: 'Montserrat', sans-serif;
                  "
                >
                  <i class="fas fa-shopping-basket text-danger"></i>simpleShop
                </h2>
              </router-link>
              
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div>
              <div class="d-flex justify-content-md-around justify-content-between align-items-center">
                <form action="" class="form-inline">
                  <div class="form-group d-inline-flex">
                    <input
                      @focus="openSearchSection"
                      type="text"
                      class="form-control"
                      placeholder="search product"
                      id="inputSearch"
                    />
                    <button @click.prevent="" id="searchBtn" class="btn btn-danger"><i class="fas fa-search"></i></button>
                  </div>
                </form>

                <h1 class="text-light font-weight-bold">
                  <router-link
                    to="/cart"
                    class="text-decoration-none   text-danger font-20"
                    >
                    <div class="d-flex ms-4 ms-md-0"><i class="fas fa-shopping-cart"></i>
                    <sup class="text-light"
                      >{{ $store.state.cartModule.total_quantity }}
                    </sup></div>

                  </router-link>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
  <search-item
    :closeSearchSection="closeSearchSection"
    v-if="searchItemShown"
  />
</template>

<script>
import SearchItem from "../components/SearchItem.vue";
import { mapState, mapMutations } from "vuex";
import axios from "axios";
export default {
  components: {
    SearchItem,
  },
  computed: {
    ...mapState(["access_token"]),
  },
  data() {
    return {
      searchItemShown: false,
    };
  },
  methods: {
    ...mapMutations(["unSetAccessToken"]),
    async logout() {
      try {
        const rs = await axios(
          "http://onlinestore.mbeyamilk.com/api/logout",
          {
            headers: {
              Authorization: `Bearer ${this.access_token}`,
            },
          }
        );
        if (rs.status === 200) {
          this.unSetAccessToken();
          this.$router.push("/");
        }
      } catch (error) {
        console.log("error: ", error.message);
      }
    },
    openSearchSection: function () {
      this.searchItemShown = true;
    },
    closeSearchSection: function () {
      this.searchItemShown = false;
    },
  },
  watch: {
    "$route.params.id": function () {
      this.searchItemShown = false;
    },
  },
};
</script>

<style  scoped>
#inputSearch {
  border-radius: 5px 0px 0px 5px !important;
}

#searchBtn {
  border-radius: 0px 10px 10px 0px !important;
}
</style>