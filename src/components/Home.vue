<script setup>
import { onMounted } from "vue";
import AnimationManager from "../js/AnimationManager";

let animationManager;

onMounted(() => {
  animationManager = new AnimationManager();
  animationManager.init();
});
</script>

<template>
  <div class="text-white  w-screen min-h-screen flex flex-col max-md:overflow-hidden">

    <main class="w-full flex flex-col items-center mb-15 md:mb-40 lg:mb-60 xl:mb-80 max-md:overflow-hidden">
      <div id="content-top" class="grid grid-cols-2 pt-[2%] h-[27vw] max-md:h-[35vw]">
        <div id="content-left" class="w-full z-1">
          <h1 id="content-text-main" class="typewrite w-[93%] leading-[1] font-bold"
              style="text-shadow: 0 0 20px rgba(168,85,247,0.6);"
              data-speed="50" data-delay="5000" data-cursor="false"
              data-texts='["Easily pick your next beatmap with<br>More Beatmaps Info",
                         "Count the PP you’d get for the SS rank",
                         "No more navigation to the every beatmap page to check its info"]'>
          </h1>
        </div>

        <div id="content-right" class="w-full  flex justify-center items-center">
          <div class="w-[100%] h-[100%] ds-bg-red-400 relative">
            <div id="cards-animated-block" class="rotate-10 w-[95%] mt-[25%]">

              <div class="card-stack w-full h-full absolute z-10 bottom-[200%]" data-switch-time="5105"
                   data-animation-time="2000">
                <div class="card deep-info-block">
                  Aim diff: 3.3, Speed diff: 3.0, Circles: 1526, Sliders: 438, Speed note count: 1338.5, FL
                  Diff: 4.29
                </div>
                <div class="card deep-info-block">
                  Aim diff: 4.4, Speed diff: 2.6, Circles: 353, Sliders: 128, Speed note count: 386.2, FL
                  Diff: 3.33
                </div>
                <div class="card deep-info-block">
                  Aim diff: 3.5, Speed diff: 3.5, Circles: 2232, Sliders: 604, Speed note count: 1123.4, FL
                  Diff: 5.00
                </div>
              </div>

              <div id="beatmaps-cards" class="card-stack w-[90%] h-full z-100"
                   data-switch-time="5105" data-animation-time="2000">
                <img class="card w-full select-none opacity-95 transition-transform duration-700 ease-in-out"
                     src="../assets/images/beatmap-card.png" alt="Beatmapset card">
                <img class="card w-full select-none opacity-95 transition-transform duration-700 ease-in-out"
                     src="../assets/images/beatmap-card2.png" alt="Beatmapset card">
                <img class="card w-full select-none opacity-95 transition-transform duration-700 ease-in-out"
                     src="../assets/images/beatmap-card3.png" alt="Beatmapset card">
              </div>

              <h1 id="pp-text" class="typewrite-cards absolute left-[85%] top-[30%]
                     text-responsive max-w-[60%] z-50  text-white"
                  data-delay="3850"
                  data-speed="120" data-cursor="false"
                  data-texts='["506pp", "588pp", "763pp"]'>
              </h1>

              <h1 id="beatmaps-params" class="typewrite-cards max-w-[65%]
                 z-50 translate-y-[370%] translate-x-[33%] text-white"
                  data-delay="3350"
                  data-speed="17" data-cursor="false"
                  data-texts='["6.67★ bpm 186 combo 2465 ar 9.7 cs 4.2 od 9 hp 5",
                                "7.83★ bpm 230 combo 610 ar 9.8 cs 4 od 9.8 hp 4.5",
                                "7.42★ bpm 184 combo 3845 ar 9.6 cs 4.2 od 10 hp 5"]'>
              </h1>
            </div>

          </div>
        </div>
      </div>

      <div class="flex w-full max-sm:mt-30 mt-13 justify-center max-sm:flex-col max-sm:items-center mb-10">
        <a href="https://chromewebstore.google.com/detail/osu-more-beatmaps-info/kcmncagpgeadocepdaobeeifhlgfibof"
           target="_blank"
           class="animated-btn">
          <img src="../assets/images/chromium-logo.png" width="40" height="40" alt="chromium logo">
          <span class="ml-2 text-[1.2rem] text-center">Chromium Browsers download</span>
          <i class="fa-solid fa-download text-[1.5rem] ml-2"></i>
        </a>

        <a href="https://addons.mozilla.org/ru/firefox/addon/osu-more-beatmaps-info/" target="_blank"
           class="animated-btn sm:ml-[4%] max-sm:mt-4 max-sm:h-15">
          <img src="../assets/images/firefox-logo.png" width="40" height="40" alt="firefox logo">
          <span class="ml-2 text-[1.2rem]">Firefox download</span>
          <i class="fa-solid fa-download text-[1.5rem] ml-2"></i>
        </a>
      </div>
    </main>
  </div>
</template>

<style scoped>
@reference "tailwindcss";

main {
  --base-content-size-factor: 0.93;

  --base-content-size: calc(var(--base-content-size-factor) * 1vw);

  --duration: 3.5s;
  --max-scale: 1.5;
  --easing: cubic-bezier(.22, .9, .35, 1);
}

@media (max-width: 640px) {
  main {
    --base-content-size-factor: 0.95;
  }
}

#content-top {
  width: calc(var(--base-content-size-factor) * 100%);
}

#content-text-main {
  font-weight: bolder;
  font-size: calc(var(--base-content-size) * 4.9);
  margin-bottom: calc(var(--base-content-size) * 3);
}

#beatmaps-cards {
  box-shadow: calc(3 * var(--base-content-size)) calc(5 * var(--base-content-size)) calc(9 * var(--base-content-size)) calc(4 * var(--base-content-size)) rgba(168, 85, 247, 0.6);
}

#beatmaps-params {
  font-size: calc(var(--base-content-size) * 1.27);
}

#pp-text {
  font-size: calc(var(--base-content-size) * 1.6);
  backface-visibility: hidden;
}

#content-left {
  padding-top: calc(var(--base-content-size) * 6);
}

@layer utilities {
}

.typewrite-cards {
  backface-visibility: hidden;
}

@layer components {
  .deep-info-block {
    @apply
    relative
    left-1/2 -translate-x-1/2
    inline-block whitespace-nowrap
    font-bold
    border border-white;

    border-width: calc(var(--base-content-size) * 0.2);
    background: linear-gradient(180deg, #7c35fd, #9039f4, #a323ee);
    padding: calc(var(--base-content-size) * 0.595) calc(var(--base-content-size) * 0.893);
    font-size: calc(var(--base-content-size) * 1.1);
    border-radius: calc(var(--base-content-size) * 1.1);
  }
}

.btn-pulse {
  will-change: transform, opacity;
  animation: growFade var(--duration) var(--easing) infinite;
}

@layer components {
  .animated-btn {
    @apply
    relative
    flex
    justify-between
    items-center
    bg-purple-400
    px-3
    cursor-pointer
    rounded-[1rem]
    font-bold
    shadow-[0_4px_30px_rgba(168,85,247,0.6)]
    max-sm:h-15
    w-80;

    background: linear-gradient(150deg, #b655f7, #7c35fd);
    transition: background 0.5s ease,
    transform 0.5s ease;
  }
}

.animated-btn:hover {
  background: linear-gradient(150deg, #ab33fa, #7014d3);
  transform: translateY(-4px);
}

.animated-btn::before {
  content: "";
  position: absolute;
  inset: -10px;
  z-index: -1;

  background: radial-gradient(
      ellipse at center,
      rgba(140, 0, 255, 0.4) 0%,
      rgba(140, 0, 255, 0.2) 40%,
      rgba(140, 0, 255, 0.1) 70%,
      rgba(140, 0, 255, 0) 100%
  );

  border-radius: calc(1rem + 10px);

  filter: blur(1px);
  will-change: transform, opacity, filter;

  animation: growFade var(--duration) var(--easing) infinite;
  pointer-events: none;
}


@keyframes growFade {
  0% {
    transform: scale(1);
    opacity: 0.6;
  }

  70% {
    transform: scale(calc(var(--max-scale) * 0.9));
    opacity: 0;
  }

  100% {
    transform: scale(var(--max-scale));
    opacity: 0;
  }
}
</style>