<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import type { Artisan } from '@/types'
import { renderMii } from '@/backend'
import { countries } from '@/countries'

const props = defineProps<Artisan>()
const mii_img = await renderMii(props.mii_data)
const country_flag = computed(() => countries[props.country_id]?.flag)
const twemoji = ref(null)

// Import twemoji from the CDN
onMounted(() => {
  const script = document.createElement('script')
  script.src = 'https://cdn.jsdelivr.net/npm/@twemoji/api@latest/dist/twemoji.min.js'
  script.crossOrigin = 'anonymous'
  script.onload = () => {
    twemoji.value = window.twemoji
  }
  document.head.appendChild(script)
})

// Use twemoji to render the country flag
const countryFlagHtml = computed(() => {
  if (twemoji.value && country_flag.value) {
    return twemoji.value.parse(country_flag.value)
  }
  return ''
})

const isMaster = computed(() => {
  if (props.is_master) {
    return true
  } else {
    return false
  }
})
</script>

<template>
    <li
      @mousemove="handleMouseMove"
      @mouseleave="resetTransform"
      :class="rankingClass, { 'bg-yellow-600/30 dark:bg-yellow-600/30 border-yellow-300/50 dark:border-yellow-300/50': isMaster}"
      class="p-3 rounded-xl border flex flex-col justify-between relative z-20 dark:border-slate-600/60 dark:bg-slate-700/60 dark:text-white hover:shadow-xl transition-shadow overflow-hidden backdrop-blur-md bg-opacity-50"
      ref="card"
    >
    <RouterLink :to="`/artisans/${artisan_id}`" class="hover:no-underline">
      <span
        v-if="isMaster"
        class="w-full text-7xl font-bold opacity-30 z-0 absolute select-none -ml-0 mb-[9.75rem] text-yellow-500 -rotate-6"
        ><i class="fa-solid fa-crown"></i></span
      >
      <div class="z-10 flex flex-col w-full items-center justify-between">
        <span class="self-end text-2xl" v-html="countryFlagHtml"></span>
        <img class="w-28 h-30 bottom-3 relative" :src="mii_img" :alt="`${name}'s Mii`"/>
        <h1 class="text-3xl relative bottom-5 text-center text-black">{{ name }}</h1>
      </div>
      <div class="blur"></div>
    </RouterLink>
    <span class="w-full text-2xl flex items-center justify-between gap-3 flex-wrap"
          ><span><i class="fa-solid fa-thumbs-up"></i> {{ total_likes }}</span
          ><span>{{ number_of_posts }} <i class="fa-solid fa-user"></i></span></span
        >
    </li>
  </template>
  
  <style>
  .emoji {
    height: 30px !important;
  }
  
  .blur {
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
    height: 30px;
    transform: translate(100%, 100%) scale(400%);
    filter: blur(8px) opacity(0.03);
    background: rgb(255, 255, 255);
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
    display: none;
  }
  
  .bg-gold {
    background: linear-gradient(145deg, #ffd70020, #ffdf0030, #ffd70030);
    border: 1px solid #ffd70030;
    grid-column: span 2;
  }
  
  .bg-silver {
    background: linear-gradient(145deg, #c0c0c020, #dcdcdc30, #c0c0c030);
    border: 1px solid #dcdcdc30;
  }
  
  .bg-bronze {
    background: linear-gradient(145deg, #cd7f3220, #e07a2d30, #cd7f3230);
    border: 1px solid #e07a2d30;
  }
  </style>
  
  <script lang="ts">
  export default {
    data() {
      return {
        // Your existing data properties
      }
    },
    methods: {
      handleMouseMove(event) {
        const card = this.$refs.card
        const blur = card.querySelector('.blur')
        const { width, height, left, top } = card.getBoundingClientRect()
        const mouseX = event.clientX - left - width / 2
        const mouseY = event.clientY - top - height / 2
  
        // Adjust these values to control the rotation sensitivity
        const rotateY = (mouseX / width) * 20 // Rotation around the Y axis
        const rotateX = (-mouseY / height) * 20 // Rotation around the X axis
  
        card.style.transform = `perspective(800px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.05)`
  
        // Use the card's rect for positioning the blur element
        const rect = card.getBoundingClientRect()
        blur.style.left = event.clientX - rect.left - 50 + 'px'
        blur.style.top = event.clientY - rect.top - 50 + 'px'
        blur.style.display = 'block'
      },
      resetTransform() {
        const card = this.$refs.card
        const blur = card.querySelector('.blur')
        card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)'
        blur.style.display = 'none'
      }
    }
  }
  </script>
  