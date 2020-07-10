<template>
  <div class="game-info border m-2 p-2 bg-light overflow-auto">
    <div v-for="(val, key) in aData" :key="key"><b>{{key}}:</b> {{val}}</div>
  </div>
</template>

<script>

export default {
  name: 'GameTableRules',
  props: ['aData'],
}
</script>

