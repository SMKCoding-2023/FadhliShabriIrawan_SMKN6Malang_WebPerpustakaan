<script lang="ts" setup>
import type { Products } from '~/types/products';
import { productsStore } from '~/stores/buku';

const useProductsStore = productsStore();
const products = ref<Products[]>([]);
const isLoading = ref(false);



const totalProduct = computed(() => {
  if (products) {
    return products.value.reduce((total, product) => total + ((product.price || 0) * (product.quantity || 0)), 0);
  }
  return 0;
})

const getProducts = async () => {
  isLoading.value = true;
  await useProductsStore.filterByIsCart(true);
  products.value = useProductsStore.products;
  isLoading.value = false;
  console.log(products.value); // Tambahkan ini
}

getProducts();

const removeCart = async (id: number) => {
  const product = products.value.find((item: any) => item.id === id);
  if(product){
    product.isCart = !product.isCart
  }
  await useProductsStore.updateProduct(product, id);
  getProducts();
}

const setQuantity = async (id: number, state: string) => {
  const product = products.value.find((item) => item.id === id);
  if(state === "plus"){
    if(product?.quantity){
      product.quantity += 1;
      await useProductsStore.updateProduct(product, id);
    }
  }else if (state === 'minus') {
    if (product?.quantity && product.quantity !== 1) {
      product.quantity -= 1;
      await useProductsStore.updateProduct(product, id);
    }
  }
}
onMounted(() => {
  getProducts();
});


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
  <br>
  <br>
  <br>
  <section>
    <div class="container">
      <div class="py-10 flex gap-6">
        <div class="w-[70%]">
          <div class="flex justify-between items-center pb-7 border-b border-gray-300 mb-6">
            <h1 class="text-3xl font-medium">Transaksi Anda</h1>
            <p class="text-3xl font-medium">{{ products.length }} Buku</p>
          </div>
            <div v-if="products.length > 0" class="flex flex-col gap-6">
              <template v-for="(item, index) in products" :key="index">
                <CardsCardCart :product="item" @removeCart="removeCart" @setQuantity="setQuantity"/>
              </template>
            </div>
            <div v-else>
              <h5 class="text-xl font-light text-center">Transaksi Kosong</h5>
            </div>
        </div>
        <div class="w-[30%] bg-white shadow-card h-max p-6">
          <h3 class="text-xl font-medium mb-6">Ringkasan Transaksi</h3>
          <div class="flex flex-col gap-3 border-b border-gray-300 pb-4">
            <div v-if="products.length > 0">
              <div v-for="(item, index) in products" :key="index" class="flex gap-4 items-center">
                <span class="text-limit limit-1 text-sm">{{ item.name }}</span>
                <span class="text-sm font-semibold">Rp.{{ (item.price || 0) * (item.quantity || 0) }}</span>
              </div>
            </div>
            <div v-else>
              <p class="text-sm text-center font-light">Tidak ada Transaksi</p>
            </div>
          </div>
          <div class="pt-4 flex items-center justify-between mb-6">
            <span class="text-base">Total</span>
            <span class="text-base font-bold">Rp.{{ totalProduct }}</span>
          </div>
          <button class="bg-secondary text-white text-base font-bold w-full py-2 rounded-lg">Beli Sekarang</button>
        </div>
      </div>
      <div class="mb-8">
        <h3 class="text-2xl font-bold text-primary mb-2">Buku Lainnya !!</h3>
        <div class="border-b-2 border-secondary"></div>
      </div>
      <!--Lihat lainnya!!-->
      <div class="flex gap-6 flex-wrap mx-auto">
          <template v-for="(item, index) in allProducts" :key="index">
            <CardsCardProduct :product="item" class="w-[calc(100%/6-20px)]"/>
          </template>
        </div>
    </div>
    
  </section>
 
</template> 
