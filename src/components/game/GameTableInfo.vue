<template>
  <div class="game-info border m-2 p-2 bg-light overflow-auto">
    <div><b>Turn:</b> {{aData.turn}}</div>
    <div><b>Round:</b> {{aData.round}}</div>
    <div><b>Phase:</b> {{aData.phase}}</div>
  </div>
</template>

<script>

export default {
  name: 'GameTableInfo',
  props: ['aData'],
}
</script>

