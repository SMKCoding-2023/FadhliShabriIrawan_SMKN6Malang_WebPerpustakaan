<template>
  <div>
    <!-- Tambahkan logika navigasi ke halaman update di sini -->
    Redirecting to update page...
  </div>
</template>

<script>
export default {
  async fetch() {
    // Handle logic to determine the update page URL
    const updatePageUrl = `/update/${this.$route.params.id}`;

    // Redirect to the update page
    this.$router.push(updatePageUrl);
  }
}
</script>
