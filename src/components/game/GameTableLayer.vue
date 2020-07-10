<template>
  <div id="game-map">
    <div id="game-map__wrap">
      <div id="game-map__fields">
        <GameTableTile 
          :aData="tile"
          v-for="tile in fields" 
          :key="tile.id"
        />
      </div>
      <GameTableLog :aData="aLog"></GameTableLog>
      <GameTableChatForm />
      <img class="square" src="@/assets/images/pixel.png" alt="">
    </div>
  </div>
</template>

<script>

export default {
  name: 'GameTableLayer',
  props: ['aData', 'aLog'],
  data() {
    let fields = Object.values(this.aData);
    fields.forEach((val, i) => {
      val.classes = 'field__';
      if (i>10 && i < 20) val.classes += 'right';
      else if (i > 20 && i < 30) val.classes += 'bottom';
      else if (i > 30 && i < 40) val.classes += 'left';
      else if (i == 0 || i == 10 || i == 20 || i == 30) val.classes += 'corner';
      else val.classes += 'top';
    });
    // old table view
    let aTiles = Object.values(this.aData)
            , tiles = {
              top: []
              , middle: []
              , bottom: []
            }
            , aRight, aLeft, aBottom
    ;
    tiles.top = aTiles.splice(0, 11);
    aRight = aTiles.splice(0, 9);
    aBottom = aTiles.splice(0, 11)
    //Add reverse to the bottom line
    tiles.top.forEach((val) => {
      tiles.bottom.push(aBottom.pop());
    });
    aLeft = aTiles.splice(0, 9);
    aRight.forEach((val) => {
      tiles.middle.push({
        left: aLeft.pop()
        , right: val
      });
    });

    return {
      tiles: tiles,
      fields
    };
  }
}
</script>

