<script lang="ts" setup>
import { category } from "~/composables/constants/category";

const isShow = ref(false);

defineEmits(["selectedCategory"]);
</script>


<template>
  <div class="relative select-none">
    <div class="border border-secondary flex items-center justify-center px-3 py-2 rounded-lg gap-4 cursor-pointer w-full transition duration-300 hover:border-secondary-hover" @click="isShow = !isShow">
      <span class="text-secondary font-medium">Genre</span>
      <i :class="`ri-arrow-down-s-line text-secondary text-xl text-bold transition duration-300 ${isShow ? 'rotate-180' : 'rotate-0'}`"></i>
    </div>
    <!-- Dropdown menu -->
    <div v-show="isShow" class="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-card w-full absolute top-14">
      <ul class="py-2 text-sm text-gray-700">
        <li>
          <span class="block px-4 py-2 hover:bg-secondary hover:text-white transition duration-200 cursor-pointer" @click="$emit('selectedCategory', '')">All</span>
        </li>
        <li v-for="(item, index) in category" :key="index">
          <span class="block px-4 py-2 hover:bg-secondary hover:text-white transition duration-200 cursor-pointer" @click="$emit('selectedCategory', item.name)">{{ item?.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

