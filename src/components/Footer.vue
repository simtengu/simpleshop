<template>
  <div class="container-fluid footer bg-dark mt-4 p-0">
    <img :src="wave" alt="wave">
    <div class="container">
      <div class="row flex-md-row-reverse align-items-center my-2">
        <div class="col-md-6 text-center">
            <div class="w-75 mx-auto">
            <h3 style="font-family: 'Playfair Display', serif" class="text-light text-capitalize my-2 display-5">Subscribe now</h3>
          <form @submit.prevent  action="" class="form-inline my-2">
            <div class="form-group d-inline-flex">
              <input
                type="text"
                class="form-control"
                placeholder="enter email"
              />
              <button style="font-family: 'Playfair Display', serif" type="submit" class="btn btn-danger">Subscribe</button>
            </div>
          </form>
            <p style="font-family: 'Playfair Display', serif" class=" text-grey font-17 my-3">For news about our latest offers,big deals,new products in the market and much more.</p>

            </div>
        </div>
          <div class="col-md-6 text-center">
              <img :src="subscribeImg" style="width: 60%;height: auto" alt="subscribe img" class="img-block">
          </div>
      </div>
      
      <div class="row mt-4">
        <div class="col-6 col-md-4 my-2">
          <ul class="footer-group-item">
            <li class="">
              <span class="text-grey font-weight-bold text-arial font-16"
                >Home</span
              >
            </li>
            <li class="">
              <span class="text-grey font-weight-bold text-arial font-16"
                >about us</span
              >
            </li>
            <li class="">
              <span class="text-grey font-weight-bold text-arial font-16"
                >contact us</span
              >
            </li>
            <li class="">
              <span class="text-grey font-weight-bold text-arial font-16"
                >our services</span
              >
            </li>
          </ul>
        </div>
        <div class="col-md-4 my-2 col-6">
          <ul class="footer-group-item">
            <li class="">
              <span class="text-grey font-weight-bold text-arial font-16"
                >Home</span
              >
            </li>
            <li class="">
              <span class="text-grey font-weight-bold text-arial font-16"
                >profile</span
              >
            </li>
            <li class="">
              <span class="text-grey font-weight-bold text-arial font-16"
                >cart</span
              >
            </li>
            <li class="">
              <span class="text-grey font-weight-bold text-arial font-16"
                >orders</span
              >
            </li>
          </ul>
        </div>
        <div class="col-md-4 my-2 col-6">
          <ul class="footer-group-item">
            <li class="">
              <span class="text-grey font-weight-bold text-arial font-16"
                >Home</span
              >
            </li>
            <li class="">
              <span class="text-grey font-weight-bold text-arial font-16"
                >profile</span
              >
            </li>
            <li class="">
              <span class="text-grey font-weight-bold text-arial font-16"
                >cart</span
              >
            </li>
            <li class="">
              <span class="text-grey font-weight-bold text-arial font-16"
                >orders</span
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import subscribeImg from "../images/subOne.svg";
import wave from "../images/wave7.svg";
export default {
  props: {
    title: {
      type: String,
    },
  },
  data(){
    return {
      subscribeImg,
      wave
    }
  }
};
</script>

<style lang="scss" scoped>
</style>