<template>
   <section
      class="add-product-div row justify-content-center"
    >
      <div class="col-md-7 col-lg-6">
        <h4 class="text-app text-capitalize my-5 form-title">
          Add new product
        </h4>

        <div v-if="productImages.length > 0">
          <h5 class="text-dark text-times">Product Images</h5>
          <div class="row">
            <div
              v-for="(image, index) in productImages"
              :key="index"
              class="col-6 col-md-4 px-2"
            >
              <img :src="image.name" alt="" class="img-fluid img-thumbnail" />
              <button
                @click="handleImgDelete(image.id)"
                id="img-delete-btn"
                class="p-0 text-danger"
              >
                remove
              </button>
            </div>
          </div>
        </div>
        <form @submit.prevent="handleFormSubmit" action="" class="form mt-5">
          <h5 class="text-times">Upload product images here</h5>
          <div class="form-group">
            <label for="image" class="btn btn-outline-info btn-sm">
              select image</label
            >
            <input
              @change="handleImageUpload"
              type="file"
              hidden
              id="image"
              class="form-control"
            />
          </div>
          <div class="form-group my-2">
            <label class="text-secondary" for="name">Product Title/Name</label>
            <input
              type="text"
              v-model="productData.name"
              name="name"
              class="py-1 px-1 text-input d-block my-2"
              id="name"
            />
          </div>

          <div class="form-group my-2">
            <label class="text-secondary" for="price">Product Price</label>
            <input
              type="number"
              step="any"
              v-model="productData.price"
              name="price"
              class="py-1 px-1 text-input d-block my-2"
              id="price"
            />
          </div>

          <div class="form-group my-2">
            <label class="text-secondary" for="category"
              >Product Category</label
            >
            <select
              name="category_id"
              v-model="productData.category_id"
              id="category"
              class="form-control"
            >
              <option
                v-for="(category, index) in categories"
                :key="index"
                :value="category.id"
              >
                {{ category.name }}
              </option>
            </select>
          </div>

          <div class="form-group my-2">
            <div class="d-flex justify-content-between">
              <label class="text-secondary" for="desc">
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
</template>

<script>
import { mapMutations,mapActions,mapState } from "vuex";
import axios from "axios";
export default {
  computed: {
    ...mapState(["isLoading", "categories"]),
  },
  data() {
    return {
      productData: {
        formId: Math.floor(Math.random() * 1000) + new Date().getSeconds(),
        name: "",
        price: null,
        desc: "",
        category_id: null,
        
      },
     productImages: [],
    };
  },
  methods: {
    ...mapMutations(["setIsLoading", "unSetIsLoading"]),
        ...mapActions(["postProduct","getUserProducts"]),
    handleFormSubmit: async function () {
      let data = this.productData;
      if (data.name && data.desc && data.price && data.category_id) {
        await this.postProduct(data);
        this.productData = {
        formId: Math.floor(Math.random() * 1000) + new Date().getSeconds(),
        name: "",
        price: null,
        desc: "",
        category_id: null,
        
      };
        this.productImages = [];
          this.getUserProducts();
          
      
      } else {
        alert("make sure you have filled all inputs");
      }
    },
    handleImageUpload: async function (e) {
      this.setIsLoading();
      let img = e.target.files[0];
      const formData = new FormData();
      formData.append("image", img, img.name);
      formData.append("formId", this.productData.formId);
      try {
        let rs = await axios.post(
          "http://onlinestore.mbeyamilk.com/api/upload/product_image",
          formData
        );
        if (rs.statusText === "OK") {
          let img = rs.data.image;
          img.name = "http://onlinestore.mbeyamilk.com/images/" + img.name;
          this.productImages.push(img);
          console.log("product images",this.productImages);
        }
        this.unSetIsLoading();
      } catch (error) {
        this.unSetIsLoading();
        console.log(error);
      }
    },
    handleImgDelete: async function (id) {
      this.setIsLoading();
      let url =
        "http://onlinestore.mbeyamilk.com/api/product_image/delete/" + id;
      try {
        let rs = await axios.delete(url);
        console.log(rs.data);
        if (rs.statusText === "OK") {
          this.productImages = this.productImages.filter((image) => {
            return image.id != id;
          });
        }

        this.unSetIsLoading();
      } catch (error) {
        // this.isLoading =  false;
        console.log(error);
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


#img-delete-btn {
  background-color: inherit;
  border: none;
}

</style>