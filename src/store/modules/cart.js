import CartItem from "../../models/cartItem";
import axios from "axios";
export default {
  namespaced: true,
  state: {
    cartItems: [],
    total_quantity: 0,
    total_amount: 0,
    orders: null,
    isLoading: false,
  },
  mutations: {
    setIsLoading(state) {
      state.isLoading = true;
    },
    unSetIsLoading(state) {
      state.isLoading = false;
    },

    addItem(state, product) {
      let productLastDetails = state.cartItems.find(
        (item) => item.id === product.id
      );
      let quantity = productLastDetails ? productLastDetails.quantity + 1 : 1;
      let amount = productLastDetails
        ? productLastDetails.total_amount + product.price
        : product.price;
      let image = productLastDetails
        ? productLastDetails.image
        : product.images[0].name;

      //the item to be added or replace the existing one......................
      let newItem = new CartItem(
        product.id,
        product.name,
        product.price,
        quantity,
        amount,
        image
      );

      if (productLastDetails) {
        const productIndex = state.cartItems.findIndex(
          (item) => item.id === product.id
        );
        //updated existing product.....................
        state.cartItems[productIndex] = newItem;
        state.total_amount += product.price;
        state.total_quantity += 1;
        return;
      } else {
        state.cartItems.push(newItem);
        state.total_amount += product.price;
        state.total_quantity += 1;
      }
    },

    reduceItem(state, product_id) {
      let product = state.cartItems.find(
        (product) => product.id === product_id
      );
      let productIndex = state.cartItems.findIndex(
        (product) => product.id === product_id
      );
      if (product.quantity > 1) {
        //update product details...........................................
        state.cartItems[productIndex].quantity = product.quantity - 1;
        state.cartItems[productIndex].total_amount =
          product.total_amount - product.price;
        state.total_amount = state.total_amount - product.price;
        state.total_quantity = state.total_quantity - 1;
        return;
      }

      state.total_amount = state.total_amount - product.price;
      state.total_quantity = state.total_quantity - 1;
      let newProductsArray = state.cartItems.filter(
        (item) => item.id != product_id
      );
      state.cartItems = newProductsArray;
    },
    updateOrders(state, orders) {
      state.orders = orders;
    },
    clearCart(state) {
      state.cartItems = [];
      state.total_quantity = 0;
      state.total_amount = 0;
    },
  },
  actions: {
    async getOrders({ commit }) {
      commit("setIsLoading");
      try {
        const rs = await axios(
          "http://localhost/onlineStore/public/api/orders",
          { headers: { Authorization: `Bearer ${localStorage.getItem('user_token')}` } }
        );
        const orders = await rs.data;
        commit("updateOrders", orders.data);
        console.log("orders from the server", orders);
        commit("unSetIsLoading");
      } catch (error) {
        commit("unSetIsLoading");
        console.log(error);
      }
    },
    async saveOrder({ commit }, orderData) {
      if (!orderData.total_amount > 0) {
        alert("YOU DON'T HAVE ITEMS IN YOUR CART YET");
        return;
      }
      commit("setIsLoading");
      let newOrder = {
        total_amount: orderData.total_amount,
        items_count: orderData.items_count,
      };

      try {
        const rs = await axios.post(
          "https://simpleshop.chuobusiness.com/api/order",
          newOrder,
          { headers: { Authorization: `Bearer ${localStorage.getItem('user_token')}` } }
        );
        let order = await rs.data;
        let items = {
          order_id: order.id,
          order_items: orderData.items,
        };

        const response = await axios.post(
          "https://simpleshop.chuobusiness.com/api/order/add_order_item",
          items,
          { headers: { Authorization: `Bearer ${localStorage.getItem('user_token')}` } }
        );

        if (response.statusText === "Created") {
          console.log(response.data.orders);
          commit("updateOrders", response.data.orders);
          commit("clearCart");
          commit("unSetIsLoading");
          alert("Order successfully saved");
        }
      } catch (error) {
        commit("unSetIsLoading");
        console.log(error);
      }
    },
  },
  getters: {},
};
