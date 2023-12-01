  <script lang="ts" setup>
  import { defineStore } from "pinia";
  import { defineProps } from 'vue';

  const props = defineProps({
    product: {
      type: Object,
      default: {},
    }
  });

  import { productsStore } from "~/stores/buku";

  const { baseStorageUrl } = useAppConfig();
  const useProductsStore = productsStore();
  const router = useRouter();

  const addCart = async () => {
    const payload = props.product;
    payload.isCart = !payload.isCart;
    await useProductsStore.updateProduct(payload, payload.id);
  }

  const deleteBook = async () => {
  const productId = props.product.id;

  // Tampilkan konfirmasi sebelum menghapus
  const isConfirmed = window.confirm("Anda yakin ingin menghapus buku ini?");

  if (isConfirmed) {
    try {
      const { baseUrl, apikey, secretKey } = useAppConfig();
      const { data, error } = await useFetch(`rest/v1/buku?id=eq.${productId}`, {
        baseURL: baseUrl,
        method: 'DELETE',
        headers: {
          apikey: apikey,
          Authorization: `Bearer ${secretKey}`,
        },
      });

      if (error.value) {
        console.error('Gagal menghapus buku:', error.value);
      } else {
        console.log('Buku berhasil dihapus:', data.value);
        // Perbarui state di store setelah penghapusan
        useProductsStore.deleteProduct;

        // Tambahkan auto-refresh setelah 1000ms (1 detik)
        setTimeout(() => {
  window.location.reload();
}, 10);

      }
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
    }
  }
};
</script>

<template>
  <section class="bg-white shadow-card rounded-xl overflow-hidden w-full sm:w-[300px] md:w-[400px] lg:w-[200px] relative mb-8">
    <div :class="`w-full h-[200px] p-3 bg-neutral-light`">
      <img :src="baseStorageUrl + props.product.image" class="w-full h-full object-contain" />
    </div>
    <div class="px-3 pb-3 pt-5">
      <NuxtLink :to="`/product/${props.product.id}`">
        <h3 class="text-lg font-bold mb-2 text-limit limit-2 text-primary">{{ props.product.name }}</h3>
      </NuxtLink>
      <div class="flex justify-between items-center animate-fade-in transform">
        <span class="text-sm font-normal text-secondary">{{ props.product.category }}</span>
        <span class="text-sm font-normal text-secondary">Rp. {{ props.product.price }}</span>
      </div>
    </div>
    <br>

    <!-- Tombol Update dan Delete -->
    <div class="absolute bottom-0 left-0 right-0 flex p-1">
      <NuxtLink :to="`/update/${props.product.id}`" class="text-white bg-green-500 px-2 py-1 rounded-md text-sm mx-2">Update</NuxtLink>

      <button @click="deleteBook" class="text-white bg-red-500 px-2 py-1 rounded-md text-sm">Delete</button>
    </div>
  </section>
</template>
