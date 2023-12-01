<script lang="ts" setup>
definePageMeta({
  middleware: ["user-access"]
});

import { productsStore } from "~/stores/buku";

const useProductStore = productsStore();
const allProducts = ref<any>([]);

useProductStore.getAllProducts().then(() => {
  allProducts.value = useProductStore.products;
});

const filterByCategory = async (event: string) => {
  if (event) {
    await useProductStore.filterByCategory(event);
    if (useProductStore.status) {
      allProducts.value = useProductStore.products;
    } else {
      allProducts.value = [];
    }
  } else {
    await useProductStore.getAllProducts();
    if (useProductStore.status) {
      allProducts.value = useProductStore.products;
    } else {
      allProducts.value = [];
    }
  }
};
</script>

<template>
  <section>
    <br>
    <br>
    <br>
    <div class="container">
      <div class="py-10">
        <div class="mb-6 flex justify-end gap-6">
          <NuxtLink to="/category/create" class="bg-secondary text-white flex justify-center items-center px-3 rounded-lg hover:bg-primary transition">
            <svg class="w-6 h-6 mr-1 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.546.5a9.5 9.5 0 1 0 9.5 9.5 9.51 9.51 0 0 0-9.5-9.5ZM13.788 11h-3.242v3.242a1 1 0 1 1-2 0V11H5.304a1 1 0 0 1 0-2h3.242V5.758a1 1 0 0 1 2 0V9h3.242a1 1 0 1 1 0 2Z"/>
            </svg>
            Tambah Genre
          </NuxtLink>
          <NuxtLink to="/product/create" class="bg-secondary text-white flex justify-center items-center px-3 rounded-lg hover:bg-primary transition">
            <svg class="w-6 h-6 mr-1 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
              <path d="M16 14V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 0 0 0-2h-1v-2a2 2 0 0 0 2-2ZM4 2h2v12H4V2Zm8 16H3a1 1 0 0 1 0-2h9v2Z"/>
            </svg>
            Tambah Buku
          </NuxtLink>
          <Dropdown @selected-category="filterByCategory" />
        </div>
        <template v-if="allProducts?.length === 0">
          <h1 class="text-3xl text-center">Buku Kosong</h1>
        </template>
        <div v-else class="flex gap-6 flex-wrap mx-auto">
          <template v-for="(item, index) in allProducts" :key="index">
            <CardsCardProduct :product="item" class="w-[calc(100%/4-18px)]"/>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>
