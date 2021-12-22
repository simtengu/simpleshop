<template>
  <div class="container mt-5">
    <hr class="mt-3">
      <h4 style="font-family: 'Source Sans Pro', sans-serif " class="text-dark text-capitalize">Weekly Offer</h4>
    <div class="row  text-center">
      <div class="col-12 col-md-6 p-3 my-2">
        <div
           
          class="h-full d-flex flex-column justify-content-center"
        >
          <h3 style="font-family: 'Source Sans Pro', sans-serif " class="display-5 text-capitalize font-weight-bold">
            Get a powerful {{ weeklyProduct.name }} laptop with more than
            <span class="text-app">30%</span> discounted
          </h3>
          <div>
            <router-link
              :to="`/product_details/${weeklyProduct.id}`"
              class="text-decoration-none"
            >
              <button class="app-btn mt-2 rounded-pill">view product</button>
            </router-link>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-6 my-2">
        <div
          style="min-height: 400px"
          class="
            h-full
            d-flex
            flex-column
            justify-content-center
            align-items-center
          "
        >
          <img
            :src="setWeeklyOfferImg"
            style="width: 70%; height: auto"
            :alt="weeklyProduct.name"
          />
          <h4
            style="color: #1e1f29"
            class="font-18 text-capitalize font-weight-bold mt-3"
          >
            {{ weeklyProduct.name }}
          </h4>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState(["weeklyProduct","setWeeklyOfferImg"]),
  },
  data() {},
  methods: {
    ...mapActions(["getWeeklyOfferProduct"]),
  },
  created() {
    this.getWeeklyOfferProduct();
  },
  mounted() {
    setTimeout(() => {
      console.log("weekly deal mounted");
      console.log(
        "from weeklyDeal ",
        this.$store.state.weeklyProduct.images[0].name
      );
    }, 2000);
  },
};
</script>

<style scoped>
/* .app-btn{
  border-radius: 10px;
} */
</style>