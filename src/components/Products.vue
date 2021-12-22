<template>
  <div class="container">
    <div
      class="
        d-flex
        justify-content-between
        px-3
        aling-items-center
        mt-md-5 mt-3
        pt-3 pt-md-4
      "
    >
      <h4 style="font-family: 'Source Sans Pro', sans-serif " class="text-dark text-capitalize">{{ category }} products</h4>
      <div style="font-family: 'Source Sans Pro', sans-serif " class="px-1 text-capitalize d-flex align-items-center d-none d-md-inline-block">
        <button
          v-for="(category, index) in categories"
          :key="index"
          class="categoryBtn text-lowercase text-lead text-muted mx-2 "
          @click="filterCategoryProducts(category.name)"
          
        >
          {{ category.name }}
        </button>
 
      </div>
    </div>
    <hr />
    <div v-if="selectedProducts" class="row">
      <Product
        v-for="product in selectedProducts"
        :product="product"
        :key="product.id"
        :image="product.images[0].name"
      />
    </div>

    <div v-else class="row">
      <Product
        v-for="product in products"
        :key="product.id"
        :product="product"
        :image="product.images[0].name"
      />
    </div>
  </div>
</template>

<script>
import Product from "./Product.vue";
import { mapState,mapActions } from "vuex";
export default {
  components: {
    Product,
  },
  props: {},
  computed: {
    ...mapState(["isLoading", "products", "categories"]),
  },
  data() {
    return {
      category: "our",
      selectedProducts: null,
    };
  },
  methods: {
    ...mapActions(["getProducts","getWeeklyOfferProduct"]),
    filterCategoryProducts: function(category_name) {

      let filteredProducts = this.products.filter(product=>{
        return product.category === category_name;
      });
      if (filteredProducts && filteredProducts.length > 0) {
        this.selectedProducts = filteredProducts;
        this.category = category_name;
        console.log("selected products by category ",this.selectedProducts);
        console.log("selected products array length ",this.selectedProducts.length);
        
      }else {
        alert('nothing was found')
      }
    }
  },
  created() {
    this.category = "our";

  },
  mounted() {
    this.getProducts();
    this.getWeeklyOfferProduct();
    setTimeout(() => {
      console.log("vuex products",this.products);
      
    }, 2000);
  },
};
</script>

<style  scoped>
.categoryBtn {
  border:none;
  background-color: inherit;
}

#filter {
  background-color: inherit;
  border: none;
}
</style>