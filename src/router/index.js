import { createRouter, createWebHistory } from "vue-router";
import ProductDetails from "../pages/ProductDetails.vue";
import Home from "../pages/Home.vue";
import Cart from "../pages/Cart.vue";
import Profile from "../pages/profile.vue";
import Login from "../pages/Login.vue";

const routes = [
  {
    path: "/product_details/:id",
    name: "product_details",
    component: ProductDetails,
  },
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/cart",
    name: "cart",
    component: Cart,
  },
  {
    path: "/account",
    name: "account",
    component: Profile,
  },
    {
    path: "/login",
    name: "signup",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
