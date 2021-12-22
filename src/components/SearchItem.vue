<template>
  <div @click="closeSearchSection" class="search-container">
    <div @click.stop="" class="search-div pt-2">
      <form action="#" class="form">
        <div class="d-flex justify-content-between">
          <input
            v-model="searchItem"
            id="searchField"
            @keyup="searchProduct"
            type="text"
            class="search-input"
            placeholder="enter product name"
            autocomplete="off"
          />
          <button @click="closeSearchSection" class="closeBtn">X</button>
        </div>
      </form>
      <div v-if="searchedItems != null">

      <div class="mt-2" v-if="searchedItems.length > 0">
        <div v-for="item in searchedItems" :key="item.id" class="card p-1 my-1">
          <router-link
            :to="`/product_details/${item.id}`"
            class="text-decoration-none"
          >
            <div class="d-flex">
              <div>
                <img
                  width="86"
                  :src="item.images[0].name"
                  alt=""
                  class="img-thumbnail"
                />
              </div>
              <div class="mx-2 d-flex flex-column">
                <p class="text-serif text-capitalize">{{ item.name }}</p>
                <span class="text-times text-muted font-13">{{
                  item.category
                }}</span>
                <span class="text-times text-danger font-13"
                  >{{ item.price }} Tsh</span
                >
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <div v-else>
        <h5 class="text-center text-times font-14 mt-3 font-weight-bold">Nothing to show....</h5>
      </div>
      <center>
        <div v-if="isLoading" class="spinner-border text-danger"></div>
      </center>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["closeSearchSection"],
  data() {
    return {
      searchItem: "",
      searchedItems: '',
      isLoading: false
    };
  },
  methods: {
    searchProduct: async function () {
      if (this.searchItem != "") {
        try {
          this.isLoading = true;
          let rs = await axios(
            `https://simpleshop.chuobusiness.com/api/search_product/${this.searchItem}`
          );
          let products = await rs.data;
          console.log(products.data);
          if (rs.status === 200) {
            this.searchedItems = products.data;
            console.log("searched items", this.searchedItems);
            console.log("searched items array len", this.searchedItems.length);
          }
            this.isLoading = false;
        } catch (error) {
          this.isLoading = false;
          console.log(error);
        }
      } else {
        this.searchedItems = null;
      }
    },
  },
  mounted() {
    document.getElementById("searchField").focus();
    this.searchedItems = [];
  },
};
</script>

<style scoped>
</style>