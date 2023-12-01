<script lang="ts" setup>
import { products } from "~/composables/constants/products";
import { productsStore } from "~/stores/buku";

const props = defineProps({
  product: {
    type: Object,
    default: {},
  }
})

const { baseStorageUrl } = useAppConfig();
const useProductsStore = productsStore();

const addCart = async () => {
  const payload = props.product;
  payload.isCart = !payload.isCart;
  await useProductsStore.updateProduct(payload, payload.id);
}
</script>

<template>
  <section class="py-10">
    <div class="container">
      <NuxtLink to="/product" class="bg-white border border-slate-300 w-max flex items-center gap-1 py-2 px-5 rounded-full mb-7 cursor-pointer">
        <i class="ri-arrow-left-s-line text-base font-medium"></i>
        <span class="text-base font-medium">Kembali</span>
      </NuxtLink>
      <div class="flex items-center">
        <div class="w-1/3 bg-gray-100 mr-5 rounded-2xl flex justify-center items-center p-5 h-[500px] product-image-container">
          <img :src="baseStorageUrl + props.product.image" class="w-full h-full object-contain product-image"/>
        </div>
        <div class="w-1/2 pl-5">
          <p class="text-2xl font-light mb-3">{{ props.product.category }}</p>
          <h1 class="text-4xl font-bold mb-3">{{ props.product.name }}</h1>
          <h3 class="text-4xl font-light mb-3">Rp. {{ props.product.price }}</h3>
          <p class="mb-10">{{ props.product.description }}</p>
          <div class="flex flex-col gap-4">
            <div v-if="!props.product.isCart" class="w-full flex items-center gap-2 bg-blue-600 text-white py-3 justify-center rounded-lg cursor-pointer hover:bg-blue-600/80 transition duration-300 relative" @click="addCart">
              <i class="ri-shopping-cart-2-line"></i>
              <span>Tambahkan ke Pembelian</span>
            </div>         
            <div v-if="props.product.isCart" class="w-full border-2 border-red-500 text-red-500 py-3 flex justify-center items-center rounded-lg cursor-pointer hover:bg-red-500 hover:text-white transition duration-300" @click="addCart">
              Batalkan ke Pembelian
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
  /* Style untuk efek zoom-in */
  .product-image {
    transition: transform 0.3s ease-in-out;
    padding: 10px;
    
  }

  .product-image-container {
    position: relative;
    overflow: hidden;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  .product-image:hover {
    transform: scale(1.1); /* Sesuaikan faktor zoom sesuai kebutuhan Anda */
  }
</style>
