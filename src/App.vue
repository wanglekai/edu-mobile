<template>
   <div class="app-container">
      <router-view />
      <layout-footer />
   </div>
</template>
<script>
import LayoutFooter from '@/components/LayoutFooter'

export default {
  name: 'App',
  components: {
    LayoutFooter
  }
}
</script>
