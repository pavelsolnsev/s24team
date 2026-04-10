<template>
  <div
    class="flex flex-col relative min-h-dvh max-w-2560 mx-auto overflow-x-clip"
    data-layout="default"
  >
    <Header />
    <div class="flex flex-1 gap-20 items-stretch justify-center bg-white px-20 lg:px-40 relative">
      <Lk v-if="route.path.includes('/lk')" class="hidden lg:flex" />
      <main class="flex flex-col flex-1 max-w-full min-h-0">
        <slot />
      </main>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Header from '~/components/organisms/layout/Header.vue';
import Footer from '~/components/organisms/layout/Footer.vue';
import Lk from '~/components/organisms/layout/Lk.vue';

const route = useRoute();
</script>
