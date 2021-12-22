import { createStore } from "vuex";
import axios from "axios";
import cartModule from "./modules/cart";
export default createStore({
  state: {
    products: [],
    product: {},
    weeklyProduct: {},
    categories: [],
    isLoading: false,
    userProducts: [],
    setWeeklyOfferImg: null,
    access_token: localStorage.getItem('user_token'),
    user_id: localStorage.getItem('auth_user_id'),


  },
  mutations: {
    setAccessToken(state, data) {
      state.access_token = data.token;
      state.user_id = data.user.id;
    },
    unSetAccessToken(state) {
      state.access_token = null;
      state.user_id = null;
      localStorage.removeItem('user_token');
      localStorage.removeItem('auth_user_id');

    },
    setWeeklyOfferImg(state, img) {
      state.setWeeklyOfferImg = img;
    },
    setWeeklyOffer(state, product) {
      state.weeklyProduct = product;
    },
    deleteProduct(state, product_id) {
      const newProductsList = state.userProducts.filter(item => item.id != product_id);
      state.userProducts = newProductsList;
    },
    pushUserProducts(state, products) {
      state.userProducts = products;
    },
    addCategories(state, payload) {
      state.categories = payload;
    },
    setIsLoading(state) {
      state.isLoading = true;
    },
    unSetIsLoading(state) {
      state.isLoading = false;
    },
    setProducts(state, payload) {
      state.products = payload;
    },
    getProduct(state, product_id) {
      state.isLoading = true;
      let item = state.products.find(
        (product) => product.id === parseInt(product_id)
      );
      if (item) {
        state.product = item;
        state.isLoading = false;
        return;
      }
      state.isLoading = false;

    }
  },
  actions: {
    getProducts(context) {
      context.commit("setIsLoading");
      axios
        .get("https://simpleshop.chuobusiness.com/api/products")
        .then((rs) => {
          context.commit("unSetIsLoading");
          context.commit("setProducts", rs.data.data);

          console.log("products from the server", rs.data);
        })
        .catch((error) => {
          context.commit("unSetIsLoading");
          console.error(error);
        });
    },
    async postProduct(context, productData) {

      try {

        context.commit("setIsLoading");
        await axios.post("https://simpleshop.chuobusiness.com/api/products", productData,
          { headers: { Authorization: `Bearer ${context.state.access_token}` } });
        context.commit("unSetIsLoading");
        alert("A product was added successfully")
      } catch (error) {
        context.commit("unSetIsLoading");
        console.error(error);
   }


    },
    updateData({ commit }, { title, body }) {
      commit("setIsLoading");
      let data = {
        title,
        body,
      };
      axios
        .patch("https://simpleshop.chuobusiness.com/api/post/14", data)
        .then((rs) => {
          commit("unSetIsLoading");
          console.log(rs.statusText);
        })
        .catch((error) => {
          commit("unSetIsLoading");
          console.error(error);
        });
    },
    deleteData({ commit }) {
      commit("setIsLoading");
      axios
        .delete("https://simpleshop.chuobusiness.com/api/post/14")
        .then((rs) => {
          commit("unSetIsLoading");
          console.log(rs.statusText);
        })
        .catch((error) => {
          commit("unSetIsLoading");
          console.error(error);
        });
    },
    async getCategories({ commit }) {
      try {
        const rs = await axios('https://simpleshop.chuobusiness.com/api/categories');
        const categories = await rs.data.data;
        commit("addCategories", categories);
        console.log("all categories", categories);
      } catch (error) {
        console.log(error);
      }
    },
    async getUserProducts({ commit, state }) {
      commit('setIsLoading');
      let rs = await axios('https://simpleshop.chuobusiness.com/api/user/products', { headers: { Authorization: `Bearer ${state.access_token}` } });
      let products = await rs.data.data;
      console.log(products);
      commit('pushUserProducts', products);
      commit('unSetIsLoading');

    },
    async removeProduct({ commit, state }, product_id) {
      commit('setIsLoading');
      const rs = await axios.delete(`https://simpleshop.chuobusiness.com/api/products/${product_id}`, {
        headers: {
          Authorization: `Bearer ${state.access_token}`
        }
      });
      const data = await rs.data;
      if (data.status === "deleted") {
        commit('deleteProduct', product_id);
        alert("A product was deleted successfully")
      }
      commit("unSetIsLoading")

    },
    async getWeeklyOfferProduct({ commit }) {
      let rs = await axios('https://simpleshop.chuobusiness.com/api/weeklyOffer');
      let product = await rs.data.data;
      console.log("weekly product", product);
      commit('setWeeklyOffer', product);
      commit('setWeeklyOfferImg', product.images[0].name);
    }
    ,
    async register({ commit }, info) {

      try {


        commit('setIsLoading');
        let response = await axios.post('https://simpleshop.chuobusiness.com/api/register', info);
        let data = await response.data;
        if (response.status === 201) {
          let auth_data = {
            user: data.user,
            token: data.access_token
          }
          localStorage.setItem('user_token', data.access_token);
          localStorage.setItem('auth_user_id', data.user.id);
          console.log('server response data ', data);
          commit('setAccessToken', auth_data);
          commit('unSetIsLoading');
        }

      } catch (error) {
        commit('unSetIsLoading');
        console.log("ERROR ..message = ", error.message);
      }
    },
  },
  getters: {},
  modules: {
    cartModule
  }
});