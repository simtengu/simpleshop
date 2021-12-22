<template>
    <div>
      
      <Hero />
      <Products />
      <weekly-deal />
     
    </div>
</template>

<script>
import Hero from "../components/Hero.vue"
import Products from "../components/Products.vue"
import WeeklyDeal from "../components/WeeklyDeal.vue"
    export default {
        components:  {
         Hero,
         Products,
         WeeklyDeal
        },
        mounted(){
            window.scrollTo(0, 0);
        }
    }
</script>

<style lang="scss" scoped>

</style>