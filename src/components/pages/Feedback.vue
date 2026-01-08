<script setup>
import {ref, computed} from 'vue';

const serverUrl = 'https://morebeatmapinfo.com';

const type = ref('suggestion');
const message = ref('');
const email = ref('');
const isSending = ref(false);

const emailValid = computed(() => {
  if (type.value !== 'question') return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
});

const canSend = computed(() => {
  return message.value.trim().length >= 10
});

async function submit() {
  if (!canSend.value) return
  if (!emailValid.value) return

  isSending.value = true

  try {
    const response = await fetch(`${serverUrl}/api/feedback/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: type.value,
        message: message.value,
        email: email.value,
      }),
    })
    console.log(response);
    if (!response.ok) {
      throw new Error('Request failed')
    }

    message.value = ''
    email.value = ''
    type.value = 'suggestion'
  } catch (err) {
    console.error('Feedback send error:', err)
  } finally {
    isSending.value = false
  }
}

</script>

<template>
  <div class="flex justify-center py-20 px-4">
    <div
        class="w-full max-w-xl rounded-2xl border border-pink-500/40
             bg-gradient-to-br from-purple-900/60 to-purple-950/80
             p-6 shadow-xl backdrop-blur"
    >
      <h2 class="text-xl font-semibold text-white mb-4">
        Feedback
      </h2>

      <!-- buttons -->
      <div class="flex gap-3 mb-5">
        <button
            @click="type = 'suggestion'"
            :class="[
            'flex-1 rounded-xl px-4 py-2 transition',
            type === 'suggestion'
              ? 'bg-pink-500 text-white'
              : 'bg-purple-800/60 text-purple-200 hover:bg-purple-700'
          ]"
        >
          💡 Suggestion
        </button>

        <button
            @click="type = 'question'"
            :class="[
            'flex-1 rounded-xl px-4 py-2 transition',
            type === 'question'
              ? 'bg-pink-500 text-white'
              : 'bg-purple-800/60 text-purple-200 hover:bg-purple-700'
          ]"
        >
          ❓ Question
        </button>
      </div>

      <!-- email (only for question) -->
      <transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 -translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
      >
        <div v-if="type === 'question'" class="mb-4">
          <input
              v-model="email"
              type="email"
              placeholder="Your email for reply"
              class="w-full rounded-xl bg-purple-900/70
                   border px-4 py-2 text-white
                   placeholder-purple-400
                   focus:outline-none focus:ring-2 focus:ring-pink-500"
              :class="email && !emailValid
              ? 'border-red-500'
              : 'border-purple-700'"
          />

          <p
              v-if="email && !emailValid"
              class="mt-1 text-xs text-red-400"
          >
            Enter valid email
          </p>
        </div>
      </transition>

      <textarea
          v-model="message"
          rows="4"
          class="w-full rounded-xl bg-purple-900/70
               border border-purple-700
               px-4 py-3 text-white
               placeholder-purple-400
               focus:outline-none focus:ring-2 focus:ring-pink-500"
          :placeholder="type === 'question'
          ? 'Describe your question in detail...'
          : 'Share your idea or suggestion...'"
      />

      <div class="mt-4 flex justify-end">
        <button
            @click="submit"
            :disabled="!canSend || isSending"
            class="rounded-xl px-6 py-2 font-medium transition
                 bg-pink-500 text-white
                 disabled:opacity-50 disabled:cursor-not-allowed
                 hover:bg-pink-400"
        >
          {{ isSending ? 'Sending...' : 'Send' }}
        </button>
      </div>

      <p class="mt-2 text-xs text-purple-400">
        Minimum 10 characters
        <span v-if="type === 'question'"> and valid email</span>
      </p>
    </div>
  </div>
</template>