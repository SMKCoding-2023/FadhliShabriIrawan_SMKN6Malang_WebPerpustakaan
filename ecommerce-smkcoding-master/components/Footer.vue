<template>
  <br>
  <footer class="w-full border-t border-slate-200 py-5 bg-neutral">
    <div class="container flex flex-col lg:flex-row justify-between space-y-8 lg:space-y-0">
      <div class="w-full lg:w-1/4">
        <h1 class="text-2xl font-bold text-primary mb-2 font-serif">Web Perpustakaan</h1>
        <p class="text-sm text-slate-500">Web Perpustakaan kami hadir untuk menginspirasi, memberdayakan, dan memperkaya hidup melalui pengetahuan.</p>
      </div>
      <div class="w-full lg:w-1/4">
        <h2 class="text-lg font-bold text-primary mb-2">Quick Access</h2>
        <ul class="list-none">
          <li><NuxtLink to="/" class="text-base text-slate-500 hover:text-secondary transition">Beranda</NuxtLink></li>
          <li><NuxtLink to="/product" class="text-base text-slate-500 hover:text-secondary transition">Buku</NuxtLink></li>
          <li><NuxtLink to="/cart" class="text-base text-slate-500 hover:text-secondary transition">Transaksi</NuxtLink></li>
        </ul>
      </div>
      <div class="w-full lg:w-1/4">
        <h2 class="text-lg font-bold text-primary mb-2">Contact Me</h2>
        <p class="text-base text-slate-500 mb-2">Email: fadhlishabri416@gmail.com</p>
          
        <div class="flex justify-center lg:justify-start items-center space-x-2">
          <a href="https://wa.me/083146270144" target="_blank" rel="noopener noreferrer">
            <img src="/images/wa.png" alt="WhatsApp" class="w-[35px] h-[35px]">
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <img src="/images/fb.png" alt="Facebook" class="w-[35px] h-[35px]">
          </a>
          <a href="https://www.instagram.com/fabb.416/" target="_blank" rel="noopener noreferrer">
            <img src="/images/ins.png" alt="Instagram" class="w-[35px] h-[35px]">
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <img src="/images/tele.png" alt="Telegram" class="w-[35px] h-[35px]">
          </a>
        </div>
      </div>
    </div>
    <br>
    <div class="flex justify-center items-center">
      <p class="text-sm">&copy; 2023. Fadhli Shabri Irawan. All rights reserved</p>
    </div>
  </footer>
</template>

<style scoped>
  @media (min-width: 768px) {
    /* Tambahkan gaya CSS khusus untuk tata letak desktop di sini jika diperlukan */
  }
</style>
