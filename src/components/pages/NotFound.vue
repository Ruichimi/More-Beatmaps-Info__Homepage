<script setup lang="ts">
import {useRouter} from 'vue-router'

const router = useRouter()

function goHome() {
  router.push('/')
}
</script>

<template>
  <div class="flex-1 overflow-hidden pb-40">
    <div class="relative mt-30 z-10 flex flex-col items-center text-center">
      <div class="absolute inset-0 flex items-center justify-center gap-32 opacity-30 blur-3xl">
        <div class="relative right-[40px] bottom-[10px] h-96 w-96 rounded-full bg-pink-500/40"></div>
        <div class="relative left-[30px] top-[20px] h-96 w-96 rounded-full bg-purple-500/40"></div>
      </div>

      <div class="mb-4 text-[120px] font-extrabold leading-none text-pink-400 drop-shadow-lg relative z-10">
        404
      </div>

      <h1 class="mb-2 text-2xl font-semibold">
        Got lost?
      </h1>

      <p class="mb-8 max-w-md text-sm text-white/70">
        Looks like this page doesn’t exist. <br>
        Let’s get you back on track.
      </p>

      <button
          @click="goHome"
          class="rounded-xl bg-pink-500 px-6 py-3 text-sm font-semibold transition
               hover:bg-pink-400 active:scale-95 z-10">Back to homepage
      </button>
    </div>
  </div>
</template>

<style scoped>
</style>
