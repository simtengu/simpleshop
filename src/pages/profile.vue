<template>
  <div class="container mt-1 mb-5">
    <div class="mb-5 d-flex account-links">
      <button
        class="btn px-1 mx-2"
        @click="activateSection('products')"
      >
        My Products
      </button>
      <button @click="activateSection('orders')" class="btn px-1 mx-2">Orders</button>
      <button
        @click="activateSection('new_product')"
        class="btn px-1 mx-2"
      >
        New Product
      </button>
    </div>
    <section
      v-if="activeSection === 'products'"
      class="row justify-content-center my-3 my-md-5 products-div"
    >
      <div
        v-for="(product, index) in userProducts"
        :key="index"
        class="col-sm-6 col-md-4 col-lg-3 my-1"
      >
 
          <div style="border-bottom: 4px solid #fbd7ca" class="card p-1">
            <img :src="product.images[0].name" alt="img0" class="card-img-top" />
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
              <div class="d-flex justify-content-around align-items-center">
                <button @click="deleteProduct(product.id)" class="btn btn-sm text-danger">delete</button>
                <button class="btn btn-sm text-warning" @click="handleProductUpdate(product)">edit</button>
              </div>
            </div>
          </div>
  
      </div>
    </section>
    <section v-if="activeSection === 'orders'" class="row justify-content-center" >
      
          <div class="card p-2 col-md-6 col-lg-8">
            <h4 v-if="orders.length > 0" class="text-app-secondary text-center text-times my-3">
              My orders <span class="badge badge-dark">2</span>
            </h4>

            <div class="orders-container p-2">
              <h4 v-if="!orders.length > 0" class="text-muted text-times font-17 text-center">
                You currently have no orders
              </h4>
              <div v-if="orders">
                <div
                  v-for="(order, index) in orders"
                  :key="index"
                  class="order-container"
                >
                  <div
                    class="
                      order-row
                      d-flex
                      justify-content-between
                      flex-wrap
                      px-2
                      py-2
                      mt-2
                    "
                  >
                    <div class="px-1 my-2">
                      <p class="text-dark font-16 text-arial">
                        Total amount<br />
                        <span class="text-danger font-weight-bold"
                          >{{ order.total_amount }} Tsh</span
                        >
                      </p>
                    </div>
                    <div class="px-1 my-2">
                      <p class="text-grey text-arial font-16">
                        Date placed <br />{{ order.date_placed }}
                      </p>
                    </div>
                    <div class="px-1 my-2">
                      <button @click="activateOrder(order.id)" class="btn btn-warning text-light">
                        view details
                      </button>
                    </div>
                  </div>
                  <div v-if="order.id === activeOrderId" class="card p-2">
                    <div class="card-header">
                      <div
                        class="
                          text-arial
                          font-weight-bold font-18
                          text-warning text-center
                        "
                      >
                        Order Items
                      </div>
                    </div>
                    <div
                      v-for="(item, i) in order.order_items"
                      :key="i"
                      class="
                        cart-row
                        d-flex
                        justify-content-between
                        flex-wrap
                        align-items-center
                        mb-1
                        px-1
                      "
                    >
                      <div class="text-capitalize col-md-4">
                        <div class="cartImgDiv">
                          <img
                            :src="item.image"
                            alt="item image"
                            class="img-fluid img-thumbnail"
                          />
                        </div>
                      </div>

                      <div
                        class="row flex-column py-2 py-md-1 font-20 text-capitalize col-md-6"
                      >
                        <p class="m-0 text-times font-16">{{ item.name }}</p>
                        <p class="m-0 font-16">
                          price:
                          <span class="text-app text-times">{{ item.price }} Tsh</span>
                        </p>
                        <p class="m-0 font-16">
                          quantity:
                          <span class="text-app">{{ item.quantity }} Tsh</span>
                        </p>
                        <p class="m-0 font-16">
                          total amount:
                          <span class="text-app">{{ item.amount }} Tsh</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </section>
    <ProductUpdate v-if="activeSection === 'updateProduct'" :updateProduct="updateProduct" />
    <NewProduct v-if="activeSection === 'new_product'" />
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import ProductUpdate from "../components/UpdateProduct.vue";
import NewProduct from '../components/NewProduct.vue';
export default {
  components: {
    ProductUpdate,
    NewProduct
  },
  computed: {
    ...mapState(["isLoading", "categories", "userProducts","access_token"]),
    ...mapState("cartModule",["orders"]),
  },
  data() {
    return {
      updateProduct: null,
      activeSection: "products",
      activeOrderId: null,
    };
  },
  methods: {
    ...mapActions([ "getUserProducts","removeProduct"]),
    ...mapActions("cartModule",["getOrders"]),
    ...mapMutations(["setIsLoading", "unSetIsLoading"]),
    deleteProduct: function(product_id){
     if (confirm("your are about to remove this product")) {
        this.removeProduct(product_id);
     }
    },
        activateOrder: function(orderId){
      if (orderId === this.activeOrderId) {
        this.activeOrderId = null;
        return;
      }
     this.activeOrderId = orderId;
    },
    activateSection: function(section){
      this.activeSection = section;
    
    },
      handleProductUpdate: function(product){
      this.activeSection = "updateProduct";
      this.updateProduct = product;
    }
  },
  mounted() {
    this.getUserProducts();
    this.getOrders();
  },
  created(){
    this.getUserProducts();
    if (!this.access_token) {
       this.$router.push('/')
    }
  }
};
</script>

<style scoped>
.account-links button {
  color: #888;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}


</style>