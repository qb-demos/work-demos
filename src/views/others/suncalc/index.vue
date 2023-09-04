<template>
  <main id="main">
    <div class="ImageContainer">
      <img src="https://cdn.pixabay.com/photo/2017/03/29/15/18/tianjin-2185510_1280.jpg" />
    </div>
  </main>
</template>

<script setup>
import * as SunCalc from 'suncalc'
import useAppStore from '@/store/modules/app'

const appStore = useAppStore()
const isDark = computed(() => appStore.isDark)
watch(isDark, (n) => {
  const main = document.querySelector('#main')
  let time = 0
  if (n) {
    main.style.setProperty('--filter-opacity', '0')
    time = 1700
  } else {
    time = 0
  }
  setTimeout(() => {
    if (n === false) {
      main.style.setProperty('--color', '#111')
      main.style.setProperty('--filter-brightness', '2.4')
      main.style.setProperty('--filter-hue-rotate', '168deg')
      main.style.setProperty('--filter-opacity', '1')
    } else {
      main.style.setProperty('--color', '#eee')
      main.style.setProperty('--filter-brightness', '0.5')
      main.style.setProperty('--filter-hue-rotate', '179deg')
      main.style.setProperty('--filter-opacity', '1')
    }
  }, time)
})

function getPrecision (value, min, max) {
  const interval = max - min
  const distanceValue = value - min
  return Math.abs(Math.round(100 - distanceValue / (interval / 2) * 100))
}
function init () {
  const main = document.querySelector('#main')
  // Beijing
  const latitude = 39
  const longitude = 116

  // Use SunCalc to Calculate Sunrise Time
  const now = new Date()
  const times = SunCalc.getTimes(new Date(), latitude, longitude)
  const sunrise = new Date(times.sunrise)
  const sunset = new Date(times.sunset)
  const delayTime = 30 * 60 * 1000 // 30 min
  const sunriseStart = new Date(sunrise.getTime() - delayTime)
  const sunriseEnd = new Date(sunrise.getTime() + delayTime)
  const sunsetStart = new Date(sunset.getTime() - delayTime)
  const sunsetEnd = new Date(sunset.getTime() + delayTime)
  // const interval = delayTime * 2
  // const sunriseDistance = now - sunriseStart
  // const sunsetDistance = now - sunsetStart
  const isNight = now < sunrise || now > sunset

  const colorValue = isNight ? '#eee' : '#111'
  const brightnessValue = isNight ? '0.5' : '2.4'
  const hueRotateValue = isNight ? '179deg' : '168deg'
  const opacityValue = now > sunriseStart && now < sunriseEnd
    ? getPrecision(now, sunriseStart, sunriseEnd)
    : now > sunsetStart && now < sunsetEnd
      ? getPrecision(now, sunsetStart, sunsetEnd)
      : 100

  main.style.setProperty('--color', colorValue)
  main.style.setProperty('--filter-brightness', brightnessValue)
  main.style.setProperty('--filter-hue-rotate', hueRotateValue)
  main.style.setProperty('--filter-opacity', opacityValue + '%')
}

onMounted(() => {
  init()
})
onBeforeUnmount(() => { })
</script>

<style lang='scss' scoped>
#main {
  --filter-brightness: 2.4;
  --filter-contrast: 1.1;
  --filter-hue-rotate: 168deg;
  --filter-opacity: 1;
  --color: #111;
  width: 100%;
  height: 100%;
}

.ImageContainer {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.ImageContainer img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ImageContainer::after {
  content: "";
  position: absolute;
  inset: 0;
  backdrop-filter: brightness(var(--filter-brightness)) contrast(var(--filter-contrast)) hue-rotate(var(--filter-hue-rotate));
  opacity: var(--filter-opacity);
  transition: all 2s;
}
</style>
