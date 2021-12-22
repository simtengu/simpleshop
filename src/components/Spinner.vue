<template>
 <div class="loader">
   <div style="z-index: 110;" class="spinner-border spinner-light"></div>
 </div>
</template>
<script>
export default {

}
</script>

<style scoped>
  .loader {
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 100;
  }
</style>
