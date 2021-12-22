<template>
            <div
              class="
                cart-row
                d-flex
                justify-content-around
                align-items-center
                my-1
                px-1
              "
            >
              <div class="text-capitalize col-md-4">
  <div class="cartImgDiv">
      <img :src="item.image" alt="item image" class="img-fluid img-thumbnail">
  </div>
              </div>

              <div class="row flex-column font-20 text-capitalize col-md-6">
                <p class="m-0">{{item.name}}</p>
                <p class="m-0">
                  price: <span class="text-app">{{ item.price }} Tsh</span>
                </p>
                <p class="m-0">
                  total amount: <span class="text-app">{{ item.total_amount }} Tsh</span>
                </p>
              </div>
              <div class="row flex-column text-center col-md-2">
                <button @click="addItem(item)" class="p-0 m-0 text-app">+</button>
                <label for="qnt" class="text-app font-12">{{item.quantity}}</label>
                <button @click="reduceItem(item.id)" class="p-0 m-0 text-app">-</button>
              </div>
            </div>
</template>

<script>
import { mapMutations } from "vuex";
    export default {
        computed:{
           
        },
        props: ['item'],
        methods: {
            ...mapMutations('cartModule',['addItem','reduceItem']),

        }
    }
</script>

<style scoped>
.cartImgDiv{
    width: 100px;
}
</style>