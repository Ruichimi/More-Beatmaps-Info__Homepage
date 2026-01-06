<script setup>

</script>

<template>
  <footer class="mt-full w-full border-pink-500 border-0 border-t-3 bg-[#181333]/50 items-start
 px-2 2xl:px-20 md:px-10 sm:px-8 py-8 grid grid-cols-3 max-xl:grid-cols-2 gap-y-6 justify-self-end">

    <div class="flex items-center h-full max-xl:row-start-1 max-md:col-span-2">
      <img src="../assets/images/logo.png" width="65" height="65" alt="logo" class="mr-3"/>
      <div class="flex flex-col">
        <h1 class="text-4xl">More Beatmaps Info</h1>
        <p class="ml-[0.150rem] text-gray-300">Made with love</p>
      </div>
    </div>

    <div class="flex w-full h-full justify-start xl:justify-center">
      <div class="flex max-sm:w-[80%] self-end flex-col max-xl:mb-auto max-xl:items-start
         items-center justify-end text-gray-300 text-[1rem] max-xl:col-start-1 max-xl:row-start-2">
        <div>Open-source project under the AGPL-3.0 license.</div>
        <p class="max-sm:mt-2">&copy; 2025-2026 More Beatmaps Info</p>
      </div>
    </div>

    <div
        class="flex justify-end items-start w-full max:md:cal-start-1 max-xl:col-start-2 max-xl:row-start-1 max-md:row-start-2">
      <div class="flex flex-col">
        <div class="flex justify-center items-center font-bold">
          <i class="fa-brands fa-github mr-1"></i>Source
        </div>
        <ul class="mt-2">
          <li>
            <a href="https://github.com/Ruichimi/More-Beatmaps-Info"
               class="hover:underline">Extension
            </a>
          </li>
          <li>
            <a href="https://github.com/Ruichimi/More-Beatmaps-Info__Server"
               class="hover:underline">Server
            </a>
          </li>
          <li>
            <a href="https://github.com/Ruichimi/More-Beatmaps-Info__Homepage"
               class="hover:underline">Homepage
            </a>
          </li>
        </ul>
      </div>

      <div class="flex flex-col xl:ml-20 ml-8 mt-auto">
        <div class="font-bold">Resources</div>
        <ul class="mt-2">
          <li>
            <a href="Feedback.vue" class="hover:underline">Feedback</a>
          </li>
          <li>
            <a href="Privacy.vue" class="hover:underline">Privacy</a>
          </li>
          <li>
            <a href="https://osu.ppy.sh/community/forums/topics/2100298?n=1"
               target="_blank" rel="noopener noreferrer" class="hover:underline">
              Discussion
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<style scoped>

</style>