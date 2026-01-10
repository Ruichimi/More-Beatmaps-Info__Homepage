<script setup lang="ts">
import {onMounted, ref} from "vue";

const mobileMenuDisplayed = ref(false);
const navbarLogo = ref(null);
const navbarBar = ref(null);
const borderHider = ref(null);
const menu = ref(null);
const btn = ref(null);

const toggleMenu = (menu) => {
  if (!menu.classList.contains('hidden')) {
    menu.classList.add('hidden');
  } else {
    menu.classList.remove('hidden');
  }

  mobileMenuDisplayed.value = !mobileMenuDisplayed.value;
}

const navbarMobileStyleUpdate = (navbarLogo, navbarBar, borderHider) => {
  navbarBar.classList.toggle('border-l-0');
  navbarBar.classList.toggle('border-l-3');
  navbarBar.classList.toggle('rounded-bl-none');

  navbarLogo.classList.toggle('rounded-br-none');
  navbarLogo.classList.toggle('border-r-0');
  navbarLogo.classList.toggle('z-50');
  navbarLogo.classList.toggle('left-[3px]');

  borderHider.classList.toggle('hidden');
}

onMounted(() => {
  const updateWidth = () => {
    const width = window.innerWidth;
    if (mobileMenuDisplayed.value === true && width > 768) {
      toggleMenu(menu.value);
      navbarMobileStyleUpdate(navbarLogo.value, navbarBar.value, borderHider.value);
    }
  }

  window.addEventListener('resize', updateWidth);

  updateWidth();

  btn.value.addEventListener('click', () => {
    toggleMenu(menu.value);
    navbarMobileStyleUpdate(navbarLogo.value, navbarBar.value, borderHider.value);
  });
});
</script>

<template>
  <nav class="max-sm:w-[98%] w-[80%] max-md:w-[95%] flex items-start pt-3 mx-auto">
    <div ref="navbarLogo" class="navbar-bg p-[10px] relative rounded-full
                                 rounded-tr-none border-[3px] border-pink-500">

      <router-link to="/"><img src="../assets/images/logo.png" width="84" height="84" alt="logo"></router-link>
    </div>

    <div ref="navbarBar" class="navbar-bg flex-1 flex rounded-[30px]
     rounded-tl-none rounded-bl-none border-[3px] border-l-0 border-pink-500">
      <div ref="borderHider" class="navbar-bg self-stretch relative w-[3px] right-[3px] z-100"></div>
      <div class="w-full h-full flex justify-end items-center px-3 py-[12px]">
        <ul class="hidden md:flex space-x-6 items-center mr-3">
          <li>
            <router-link to="/feedback" class="hover:text-gray-300 text-xl">Feedback</router-link>
          </li>

          <li>
            <router-link to="/privacy" class="hover:text-gray-300 text-xl">Privacy</router-link>
          </li>

          <li>
            <a href="https://osu.ppy.sh/community/forums/topics/2100298?n=1"
               class="hover:text-gray-300 text-xl"
               target="_blank" rel="noopener noreferrer">Discussion</a>
          </li>
        </ul>

        <ul class="navbar-bg hidden flex-col mx-auto rounded-[20px] " ref="menu">
          <li>
            <router-link to="/feedback" class="block px-4 py-2 hover:bg-[#271e46] rounded">
              Feedback
            </router-link>
          </li>

          <li>
            <router-link to="/privacy" class="block px-4 py-2 hover:bg-[#271e46] rounded">
              Privacy
            </router-link>
          </li>

          <li>
            <a href="https://osu.ppy.sh/community/forums/topics/2100298?n=1"
               target="_blank" rel="noopener noreferrer"
               class="block px-4 py-2 hover:bg-[#271e46] rounded">Discussion</a>
          </li>
        </ul>

        <div class="md:hidden flex justify-center">
          <button ref="btn" class="focus:outline-none">
            <svg class="w-6 h-6" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>

.navbar-bg {
  background-color: #181333;
}
</style>
