<template>
  <div class="container">
    <section class="add-product-div row justify-content-center">
      <div class="col-md-7 col-lg-6">
        <h4 class="text-app text-capitalize my-5 form-title">
          Update a Product
        </h4>
        <form @submit.prevent="handleFormSubmit" action="" class="form mt-5">
          <div class="form-group my-2">
            <label class="text-secondary" for="name">Product Title/Name</label>
            <input
              type="text"
              v-model="productData.name"
              name="name"
              class="py-1 px-1 text-input d-block my-2 "
              id="name"
            />
          </div>

          <div class="form-group my-3">
            <label class="text-secondary" for="price">Product Price</label>
            <input
              type="number"
              step="any"
              v-model="productData.price"
              name="price"
              class="py-1 px-1 text-input d-block my-2 "
              id="price"
            />
          </div>

          <div class="form-group my-3">
            <div class="d-flex justify-content-between">
              <label class="text-secondary mb-2" for="desc">
                Product Description</label
              >
              <span class="text-secondary"></span>
            </div>
            <textarea
              v-model="productData.desc"
              name="desc"
              id="desc"
              class="w-100"
              rows="5"
            ></textarea>
          </div>
          <div class="form-group mt-3">
            <button type="submit" class="btn btn-danger">submit</button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import axios from "axios";
export default {
  props: ["updateProduct"],
  components: {},
  computed: {
    ...mapState(["isLoading", "categories", "userProducts","access_token"]),
  },
  data() {
    return {
      productData: {
        name: this.updateProduct.name,
        price: this.updateProduct.price,
        desc: this.updateProduct.desc,
        id: this.updateProduct.id,
      },
    };
  },
  methods: {
    ...mapMutations(["setIsLoading", "unSetIsLoading"]),
    ...mapActions(["getUserProducts"]),
    handleFormSubmit: async function () {
      let data = this.productData;
      if (data.name && data.desc && data.price) {
        try {
          this.setIsLoading();
          const rs = await axios.patch(
            `https://simpleshop.chuobusiness.com/api/products/${data.id}`,data,
            {headers:{ Authorization: `Bearer ${this.access_token}` }}
          );
          this.getUserProducts();
          if (rs.status === 200) {
            alert("A product was updated successfully")
          }
          this.unSetIsLoading();
        } catch (error) {
          console.log(error);
         this.unSetIsLoading();
        }
      } else {
        alert("make sure you have filled all inputs");
      }
    },
  },
};
</script>

<style  scoped>
.form-group {
  margin-top: 14px !important;
}

.form-title {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.text-input {
  border: none;
  border-bottom: 1px solid #ced4da;
  width: 100%;
}
.textarea {
  border: 1px solid #ced4da !important;
}
label {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  margin: 5px 0;
}
</style>