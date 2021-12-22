<template>
  <div class="container my-5">
    <div class="row justify-content-center my-3 my-md-5">
      <div class="col-md-9 col-lg-8">
        <div class="w-100 cart-card shadow">
          <div class="cart-header d-flex">
            <button class="text-light" @click="openOrders"><img :src="orderImg" alt="orderimg" width="40"><br>orders</button>
            <button class="text-light" @click="openCart" :class="cartBtnClass"> <i class="fas fa-shopping-cart font-22 "></i><br>cart</button>
          </div>
          <div v-if="isCartOpen" class="card-body cart-card-body text-times">
            <h4 class="text-app-secondary text-times my-3">
              My Cart <span class="badge badge-dark">2</span>
            </h4>
            <div
              style="border: 1px solid #d7d7d7; border-radius: 5px"
              class="d-flex justify-content-between align-items-center p-3 my-3"
            >
              <p class="text-times text-app font-18">
                Total: {{ total_amount }} Tsh <br />
                <span class="text-muted text-times"
                  >{{ total_quantity }} items</span
                >
              </p>
              <button
                @click="pressOrder"
                class="btn btn-sm btn-warning text-light text-capitalize"
                :disabled="total_quantity > 0 ? false : true"
              >
                order now
              </button>
            </div>
            <CartItem
              v-for="(item, index) in cartItems"
              :key="index"
              :item="item"
            />
          </div>

                    <div
            v-if="isOrdersOpen && !access_token"
            class="card-body cart-card-body"
          >

              <h4
                
                class="text-muted text-times font-17 text-center"
              >
            Please login first...........
              </h4>
                    </div>

          <div
            v-if="isOrdersOpen && access_token"
            class="card-body cart-card-body"
          >
            <h4 class="text-app-secondary text-times my-3">
              My orders <span class="badge badge-dark">2</span>
            </h4>

            <div class="orders-container p-2">
              <h4
                v-if="!orders.length > 0"
                class="text-muted text-times font-17 text-center"
              >
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
                      <button
                        @click="activateOrder(order.id)"
                        class="btn btn-warning text-light"
                      >
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
                        class="
                          row
                          flex-column
                          py-2 py-md-1
                          font-20
                          text-capitalize
                          col-md-6
                        "
                      >
                        <p class="m-0 text-times font-16">{{ item.name }}</p>
                        <p class="m-0 font-16">
                          price:
                          <span class="text-app text-times"
                            >{{ item.price }} Tsh</span
                          >
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
        </div>
      </div>
    </div>
  </div>
  <spinner v-if="isLoading" />
</template>

<script>
import CartItem from "../components/CartItem.vue";
import Spinner from "../components/Spinner.vue";
import order from "../images/orders.png"
import cartImg from "../images/cart1.png"
import { mapState, mapActions } from "vuex";
export default {
  components: {
    CartItem,
    Spinner,
  },
  computed: {
    ...mapState("cartModule", [
      "cartItems",
      "total_quantity",
      "total_amount",
      "orders",
      "isLoading",
    ]),
    ...mapState(["access_token"]),
  },
  data() {
    return {
      orderImg: order,
      cartImg,
      isOrdersOpen: false,
      isCartOpen: true,
      activeOrderId: null,
      cartBtnClass: this.isCartOpen ? "text-light" : "text-app-secondary",
    };
  },
  methods: {
    ...mapActions("cartModule", ["saveOrder", "getOrders"]),
    activateOrder: function (orderId) {
      if (orderId === this.activeOrderId) {
        this.activeOrderId = null;
        return;
      }
      this.activeOrderId = orderId;
    },
    openCart: function () {
      this.isCartOpen = true;
      this.isOrdersOpen = false;
    },
    openOrders: function () {
      this.isOrdersOpen = true;
      this.isCartOpen = false;
    },
    pressOrder: async function () {
      if (this.access_token) {
        let orderData = {
          total_amount: this.total_amount,
          items_count: this.total_quantity,
          items: this.cartItems,
        };
        this.saveOrder(orderData);
      } else {
        alert("Login to Press your order..");
      }
    },
  },
  created() {},
  mounted() {
    console.log(this.cartItems);
  },
};
</script>

<style scoped>
</style>