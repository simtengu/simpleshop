<template>
  <div v-if="product" class="container my-4">
    <div class="row my-2">
      <div class="col-12 col-md-6 my-2">
        <div id="productsDetailsImageContainer">
          <div id="productDetailsImageCol">
            <div
              style="transition: opacity 700ms, display"
              id="productDetailsImageDiv"
              :class="index === activeImageId ? `opacity-1` : `opacity-0`"
              v-for="(image, index) in product.images"
              :key="index"
            >
              <img
                :src="image.name"
                style="width: 95%; height: auto"
                alt=" image"
              />
            </div>
          </div>
        </div>
        <div class="row my-2">
          <div
            v-for="(image, index) in product.images"
            :key="index"
            class="col-3 col-lg-2"
          >
            <img
              @click="changeActiveImage(index)"
              :src="image.name"
              class="img-fluid"
              alt=" image"
            />
          </div>
        </div>
      </div>

      <div class="col-12 col-md-5 p-3 my-2">
        <h5
          class="text-dark text-arial my-2 my-md-4"
          v-text="$store.state.product.name"
        ></h5>
        <div class="price-flex-div d-flex align-items-center p-1 ml-2">
          <div
            class="
              arrow-div
              bg-app
              d-flex
              align-items-center
              justify-content-center
            "
          >
            <span
              style="width: 6px; height: 6px"
              class="rounded-circle bg-light"
            ></span>
          </div>
          <p class="text-light text-times text-14">{{ product.price }} Tsh</p>
        </div>
        <p
          class="text-muted py-2 text-times font-16"
          v-text="product.category"
        ></p>
        <p class="text-times font-18">{{ product.desc }}</p>
        <button v-if="!(user_id && parseInt(user_id)  === parseInt(product.user_id)) " @click="addToCart(product)" class="btn btn-sm btn-outline-danger my-2">+<i class="fas fa-shopping-cart"></i></button>
         
      </div>
    </div>

    <div v-if="relatedProducts" class="px-3 aling-items-center mt-md-5 mt-3 pt-3 pt-md-4">
      <h4 class="text-app-secondary text-capitalize">Related products</h4>
    <hr />
    </div>
    <div v-if="relatedProducts" class="row">
    
      <Product
        v-for="product in relatedProducts"
        :product="product"
        :key="product.id"
        :image="product.images[0].name"
      />
  
    </div>
    <div>

    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import Product from "../components/Product.vue"
export default {
  components:{
    Product
  },
  computed: {
    ...mapState(["products", "product","user_id"]),
  },
  data() {
    return {
      activeImageId: 0,
      relatedProducts: "",
      

    };
  },
  methods: {
    ...mapMutations(["setIsLoading", "unSetIsLoading", "getProduct"]),
    ...mapMutations('cartModule',['addItem']),
    toPageTop: () => {
      window.scrollTo(5, 5);
     
    },
    changeActiveImage: function (index) {
      this.activeImageId = index;
    },
    addToCart: function(product){
      this.addItem(product);
    },
    getRelatedProducts: function(){

      let relatedP = this.products.filter(product=>{
     return  product.category === this.product.category && parseInt(product.id)  != parseInt(this.product.id);
      });
    this.relatedProducts = relatedP;
    console.log("here are the related products ", relatedP);

    }
  },
  mounted() {
   
    console.log('component mounted');
    this.toPageTop();
     this.getProduct(this.$route.params.id);
    setTimeout(() => {

      console.log("selected product id",this.$route.params.id); 
      console.log("item",this.product);
      
    }, 1000);

    this.getRelatedProducts();
  },
  created() {
    console.log("component created");
    this.getProduct(this.$route.params.id);
    
    
  },
    watch: {
    '$route.params.id': function() {
       this.getProduct(this.$route.params.id);
        this.getRelatedProducts();
          this.toPageTop();
    }
  }
};
</script>

<style scoped>
/* .inActiveImg {
  position: absolute;
  left: 0px;
  top: 0px;
} */
.opacity-0 {
  opacity: 0;
}
.opacity-1 {
  opacity: 1;
}
</style>