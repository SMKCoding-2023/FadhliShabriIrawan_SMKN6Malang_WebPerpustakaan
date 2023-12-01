<template>
    <section class="flex justify-center py-10">
      <div class="w-[500px]">
        <h1 class="text-2xl mb-7 font-medium">Update Buku</h1>
        <div v-if="isShowAlert" :class="`p-4 mb-4 text-sm rounded-lg ${isSuccess ? 'bg-green-100 text-green-800' : 'text-red-800 bg-red-100'}`" role="alert">
          {{ message }}
        </div>
        <form @submit.prevent="updateProduct">
          <div v-for="(item, index) in formUpdateProduct" :key="index" class="mb-6">
            <label :for="item.name" class="block mb-2 text-sm font-medium text-gray-900">
              {{ item.label }}
            </label>
            
            <select
              v-if="item.type === 'select' && item.name === 'category'"
              :id="item.name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2.5"
              v-model="item.value"
            >
              <option disabled value="">Pilih Genre</option>
              <option v-for="(category, index) in categories" :key="index" :value="category.name">{{ category.name }}</option>
            </select>
            <!-- File Input for Image -->
            <input
              v-else-if="item.type === 'file'"
              :type="item.type"
              :id="item.name"
              @change="item.value = $event"
              class="w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:bg-accent file:border-none file:px-3 file:py-2 file:text-white file:mr-3 mb-2.5"
            >
            <!-- Default Input Types -->
            <input
              v-else
              :type="item.type"
              :id="item.name"
              v-model="item.value"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2.5"
              :placeholder="item.placeholder"
            >
          </div>
          <button type="submit" class="text-white bg-accent hover:bg-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
            <span v-if="!isLoading">Update</span>
            <div v-else class="flex items-center gap-3">
              <div class="w-5 h-5 rounded-full border-2 border-t-blue-500 animate-spin"></div>
              <span>Loading</span>
            </div>
          </button>
        </form>
      </div>
    </section>
  </template>
  
  <script lang="ts" setup>
    import { categoryStore } from '~/stores/category';
    import { storageStore } from "~/stores/storage";
    import { productsStore } from '#imports';
    import type { FormField } from '~/types/products';
    import { useRouter } from 'vue-router';
    import { ref, onMounted } from 'vue';
  
    const useCategoryStore = categoryStore();
    const useStorageStore = storageStore();
    const useProductStore = productsStore();
    const isSuccess = ref(false);
    const isShowAlert = ref(false);
    const message = ref("");
    const router = useRouter();
    const isLoading = ref(false);
    const productId = ref('');
    const categories = computed(() => useCategoryStore.category);
    useCategoryStore.getAllCategory();
    
  
    const formUpdateProduct = [
      { name: "name", label: "Nama Buku", type: "text", value: "", placeholder: " ", required: true },
      { name: "description", label: "Deskripsi Buku", type: "text", value: "", placeholder: " ", required: true },
      { name: "penerbit", label: "Penerbit", type: "text", value: "", placeholder: "", required: true },
      { name: "price", label: "Harga Buku", type: "number", value: "", placeholder: "   ", required: true },
      { name: "image", label: "Gambar Buku", type: "file", value: {}, placeholder: "" },
      { name: "category", label: "Genre Buku", type: "select", value: "", placeholder: "", required: true },
    ];
  
    // Fungsi untuk mengambil data buku berdasarkan ID dan mengisi formulir
    const getBookDetails = async () => {
      const bookId = Number(router.currentRoute.value.params.id);
      await useProductStore.detailProduct(bookId);
  
      if (useProductStore.status) {
        const book = useProductStore.oneProduct;
        formUpdateProduct.forEach((item: FormField) => {
          if (item.name && book.hasOwnProperty(item.name)) {
            item.value = book[item.name];
          }
        });
      } else {
        // Handle error case, misalnya dengan me-redirect atau menampilkan pesan kesalahan
        console.error("Gagal mengambil detail buku");
      }
    };
  
    // Panggil fungsi getBookDetails setelah komponen dimount
    onMounted(() => {
      getBookDetails();
    });
  
    const updateProduct = async () => {
      isLoading.value = true;
      let file = formUpdateProduct.find((item) => item.type === "file");
      file = await uploadFile(file?.value);
      const result: { [key: string]: any } = {};
      formUpdateProduct.forEach((item: FormField) => {
        if (item.name) {
          result[item.name] = item.value;
        }
      });
      result.image = file;
  
      const bookId = Number(router.currentRoute.value.params.id)
      await useProductStore.updateProduct(result, bookId);
  
      if (!useProductStore.status) {
        isSuccess.value = useProductStore.status;
        message.value = useProductStore.message;
        isShowAlert.value = true;
        isLoading.value = false;
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } else {
        isSuccess.value = useProductStore.status;
        message.value = useProductStore.message;
        isShowAlert.value = true;
        isLoading.value = false;
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        setTimeout(() => {
          router.push({ path: "/product" });
        }, 1000);
      }
    };
  
    const uploadFile = async (formFile: any) => {
      const file = formFile?.target?.files[0];
      if (file) {
        const payload = new FormData();
        payload.append("file", file);
        const pathname = `${Date.now().toString()}.${file.type.split("/")[1]}`;
        await useStorageStore.uploadFile(pathname, payload);
        if (useStorageStore.status) {
          return useStorageStore.storage.Key;
        }
      }
    };
  </script>
  
  <style scoped>
    /* Tambahkan gaya khusus jika diperlukan */
  </style>
  