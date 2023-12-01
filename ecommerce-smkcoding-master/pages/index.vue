<template>
  <!-- component -->
  <div class="w-full h-full">
    <div class="flex bg-white" style="height: 600px;">
      <div class="flex items-center text-center lg:text-left px-8 md:px-12 lg:w-1/2">
        <div>
          <h2 class="text-3xl font-semibold text-gray-800 md:text-4xl">Selamat Datang di <br>
            <span class="text-secondary font-bold">Web Perpustakaan</span></h2>
          <p class="mt-2 text-sm text-gray-800 md:text-base">Jelajahi beragam koleksi buku kami dan temukan pengetahuan baru. Dengan layanan perpustakaan online, Anda dapat dengan mudah menemukan, meminjam, dan membaca buku-buku favorit Anda secara digital. Mari mulai petualangan literasi Anda!</p>
          <div class="flex justify-center lg:justify-start mt-6">
            <NuxtLink class="px-4 py-3 bg-primary text-white text-xs font-semibold rounded" href="/product">Lihat Buku</NuxtLink>
            <NuxtLink class="mx-4 px-4 py-3 bg-accent text-gray-900 text-xs font-semibold rounded hover:bg-secondary hover:text-white" href="/about">Learn More</NuxtLink>
          </div>
        </div>
      </div>
      <div class="hidden lg:block lg:w-1/2" style="clip-path:polygon(10% 0, 100% 0%, 100% 100%, 0 100%)">
        <div class="h-full object-cover">
          <img src="~/assets/images/library.jpg">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
