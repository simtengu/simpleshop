<template>
  <div class="col-sm-6 col-md-4 col-lg-3 my-1">
    <div style="border-bottom: 4px solid #fbd7ca" class="card p-1">
      <router-link
        :to="`/product_details/${product.id}`"
        class="text-decoration-none"
      >
        <div>
          <img :src="image" alt="img0" class="card-img-top" />
          <div class="c-footer text-center">
            <p
              style="color: #9f99ae; font-size: 12px"
              class="card-textt text-uppercase my-1"
              v-text="product.category"
            ></p>
            <p
              style="font-family: times; font-size: 19px"
              class="text-dark"
              v-text="product.name"
            ></p>
            <span class="text-app">{{ product.price }} Tsh</span>
            <hr />
          </div>
        </div>
      </router-link>

      <div class="c-footer text-center">
        <div class="d-flex justify-content-around align-items-center">
          <router-link
            :to="`/product_details/${product.id}`"
            class="text-decoration-none"
          >
            <p class="text-lead text-muted m-0">more..</p>
          </router-link>
          <button v-if="!(user_id && parseInt(user_id)  === parseInt(product.user_id)) " @click="addItem(product)" class="cartBtn"><i class="fas fa-shopping-cart"></i></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations,mapState } from "vuex";
export default {
  props: ["image", "product"],
  computed: {
    ...mapState(["user_id"]),
  },
  data() {
    return {};
  },
  methods: {
    ...mapMutations("cartModule", ["addItem"]),
  },
};
</script>

<style scoped>
.cartBtn {
  border: none;
  color: rgb(187, 65, 65);
  background-color: inherit;
  border-radius: 5px;
  padding: 4px;
}
.cartBtn:hover {
  background-color: rgb(57, 104, 57);
  color: #fff;
}
</style>