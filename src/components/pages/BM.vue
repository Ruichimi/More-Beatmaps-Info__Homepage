<script setup>
import { computed, ref } from 'vue';

const beatmapId = ref('');
const result = ref(null);
const error = ref('');
const isLoading = ref(false);

const serverUrl = computed(() => {
  const localHosts = ['localhost', '127.0.0.1'];
  return localHosts.includes(window.location.hostname)
      ? 'http://localhost:3000'
      : window.location.origin;
});

const canSubmit = computed(() => /^\d+$/.test(beatmapId.value.trim()) && !isLoading.value);
const endpoint = computed(() => `${serverUrl.value}/api/BeatmapBM/${beatmapId.value.trim()}`);
const formattedResult = computed(() => result.value ? JSON.stringify(result.value, null, 2) : '');

async function fetchBeatmapData() {
  if (!canSubmit.value) return;

  isLoading.value = true;
  error.value = '';
  result.value = null;

  try {
    const response = await fetch(endpoint.value);
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(data?.error || `Request failed with status ${response.status}`);
    }

    result.value = data;
  } catch (err) {
    error.value = err.message || 'Failed to fetch beatmap data';
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <main class="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-4 py-16 text-white">
    <section class="w-full rounded-2xl border border-pink-500/40 bg-purple-950/80 p-6 shadow-xl backdrop-blur">
      <h1 class="mb-2 text-2xl font-semibold">
        Beatmap BM Dev Tool
      </h1>

      <p class="mb-6 text-sm text-purple-200">
        Enter a beatmap id to fetch the .osu structure on the server and return calculated JSON.
      </p>

      <form class="flex flex-col gap-3 sm:flex-row" @submit.prevent="fetchBeatmapData">
        <input
            v-model="beatmapId"
            inputmode="numeric"
            autocomplete="off"
            placeholder="5319044"
            class="min-h-11 flex-1 rounded-xl border border-purple-700 bg-purple-900/70 px-4 py-2 text-white
                 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />

        <button
            type="submit"
            :disabled="!canSubmit"
            class="min-h-11 rounded-xl bg-pink-500 px-6 py-2 font-medium text-white transition
                 hover:bg-pink-400 disabled:cursor-not-allowed disabled:opacity-50">
          {{ isLoading ? 'Loading...' : 'Fetch JSON' }}
        </button>
      </form>

      <p class="mt-3 break-all text-xs text-purple-300">
        {{ endpoint }}
      </p>
    </section>

    <section v-if="error" class="mt-6 rounded-2xl border border-red-500/50 bg-red-950/60 p-4 text-red-100">
      {{ error }}
    </section>

    <section v-if="result" class="mt-6 overflow-hidden rounded-2xl border border-purple-500/50 bg-slate-950/90">
      <div class="border-b border-purple-500/30 px-4 py-3 text-sm font-semibold text-purple-100">
        Response JSON
      </div>

      <pre class="max-h-[70vh] overflow-auto p-4 text-sm leading-6 text-purple-50">{{ formattedResult }}</pre>
    </section>
  </main>
</template>
