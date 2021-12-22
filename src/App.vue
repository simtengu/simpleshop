<template>
<Spinner v-if="isLoading" />
<Header />
<router-view />
<Footer />
</template>
<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import Spinner from "./components/Spinner.vue";
import { mapState,mapActions } from "vuex";

export default ({
components: {
  Header,
  Footer,
  Spinner
  
},
  computed: {
    ...mapState(['isLoading','access_token'])
  },
data(){
  return {
    
  }
},
methods:{
 ...mapActions(["getProducts", "getCategories","getOrders"]),
 ...mapActions('cartModule',["getOrders"]),

},
  created() {
    this.getProducts();
    this.getCategories();
    if (this.access_token) {
      this.getOrders();
    }
    
  },
  mounted(){
     this.getProducts();  

  }
})
</script>


<style scoped>

</style>
