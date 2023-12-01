<script lang="ts" setup>
definePageMeta({
  layout: "blank",
})
</script>

<template>
  <NuxtLink to="/" class="absolute top-4 left-4 bg-blue-600 text-white h-[45px] w-[45px] flex justify-center items-center rounded-full shadow-lg cursor-pointer">
        <i class="ri-arrow-left-line"></i>
      </NuxtLink>
  <!-- component -->
<div class="bg-gray-100 flex justify-center items-center h-screen">
    <!-- Left: Image -->
<div class="w-1/2 h-screen hidden lg:block">
  <img src="~/assets/images/library3.jpg" alt="Placeholder Image" class="object-cover w-full h-full">
</div>
<!-- Right: Login Form -->
<div class="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
    <!-- Remember Me Checkbox -->
    <Login />
</div>
</div>
</template>