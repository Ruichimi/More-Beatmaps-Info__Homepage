<script setup>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <Navbar />
  <router-view />
  <Footer />

  <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <span
          v-for="i in 40"
          :key="i"
          class="absolute h-[4px] max-md:w-[2px] w-[4px] max-md:h-[2px] animate-pulse rounded-full bg-white/60"
          :style="{
          top: Math.random() * 100 + '%',
          left: Math.random() * 100 + '%',
          animationDelay: Math.random() * 3 + 's'
        }"
      />
  </div>
</template>