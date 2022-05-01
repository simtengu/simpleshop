<template>
            <div
              class="
                cart-row
                my-1
                px-1
              "
            >
              <div class="text-capitalize d-flex justify-content-center align-items-center">
  <div class="cartImgDiv">
      <img :src="item.image" alt="item image" class="img-fluid img-thumbnail">
  </div>
              <div class="row cartBtnsDiv flex-column justify-content-center ms-1">
                <button @click="addItem(item)" class=" ">+</button>
                <button class="">{{item.quantity}}</button>
                <button @click="reduceItem(item.id)" class="">-</button>
              </div>

              </div>

              <div class="row cartItemDetailsDiv flex-column text-capitalize ms-sm-2 ms-lg-4">
                <p class="m-0">{{item.name}}</p>
                <p class="m-0">
                  price: <span class="text-app">{{ item.price }} Tsh</span>
                </p>
                <p class="m-0">
                  total: <span class="text-app">{{ item.total_amount }} Tsh</span>
                </p>
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

</style>