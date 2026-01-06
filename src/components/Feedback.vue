<script setup>
import {ref, computed} from 'vue'
import Navbar from '@/components/Navbar.vue'

const type = ref('suggestion');
const message = ref('')
const isSending = ref(false)

const canSend = computed(() => {
  return message.value.trim().length >= 10
})

function submit() {
  if (!canSend.value) return

  isSending.value = true
}
</script>

<template>
  <Navbar/>
  <div class="flex justify-center py-20 px-4">
    <div
        class="w-full max-w-xl rounded-2xl border border-pink-500/40
             bg-gradient-to-br from-purple-900/60 to-purple-950/80
             p-6 shadow-xl backdrop-blur">
      <h2 class="text-xl font-semibold text-white mb-4">
        Feedback
      </h2>

      <div class="flex gap-3 mb-5">
        <button
            @click="type = 'suggestion'"
            :class="[
            'flex-1 rounded-xl px-4 py-2 transition',
            type === 'suggestion'
              ? 'bg-pink-500 text-white'
              : 'bg-purple-800/60 text-purple-200 hover:bg-purple-700'
          ]">
          💡 Suggestion
        </button>

        <button
            @click="type = 'question'"
            :class="[
            'flex-1 rounded-xl px-4 py-2 transition',
            type === 'question'
              ? 'bg-pink-500 text-white'
              : 'bg-purple-800/60 text-purple-200 hover:bg-purple-700'
          ]">
          ❓ Question
        </button>
      </div>

      <textarea
          v-model="message"
          rows="4"
          class="w-full rounded-xl bg-purple-900/70
               border border-purple-700
               px-4 py-3 text-white
               placeholder-purple-400
               focus:outline-none focus:ring-2 focus:ring-pink-500"
          :placeholder="type === 'question'
          ? 'Describe your question in as much detail as possible...'
          : 'Share your idea or suggestion...'"/>

      <div class="mt-4 flex justify-end">
        <button
            @click="submit"
            :disabled="!canSend || isSending"
            class="rounded-xl px-6 py-2 font-medium transition
                 bg-pink-500 text-white
                 disabled:opacity-50 disabled:cursor-not-allowed
                 hover:bg-pink-400">
          {{ isSending ? 'Sending...' : 'Send' }}
        </button>
      </div>

      <p class="mt-2 text-xs text-purple-400">
        Minimum 10 characters
      </p>
    </div>
  </div>
</template>