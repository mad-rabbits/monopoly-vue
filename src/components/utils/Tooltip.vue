<template>
  <transition :name="transition">
    <div v-show="show"
      :class="classes"
    >
      <div class="tooltip__heading" :style="{'background-color': data.bgColor}">
        <i class="tooltip__heading__icon" />
        <div class="tooltip__heading__text" v-if="data.name">
          <p class="tooltip__heading__name">{{ data.name }}</p>
          <p class="tooltip__heading__group">{{ data.groupName }}</p>
        </div>
      </div>
      <div class="tooltip__text">
        <p>Build branches to increase rent.</p>
        <ul class="tooltip__rent" v-if="data.payment && data.payment.rent">
          <li class="tooltip__row" :class="{'bold-text': index < 2}" v-for="(price, index) in data.payment.rent" :key="index">
            <span v-if="index == 0">Base Rent</span>
            <span v-else-if="index == 1">Monopoly Rent</span>
            <span v-else class="tooltip__rent__icon" :class="['tooltip__rent-'+(index-1)]" />
            <span class="tooltip__row__right">{{ price | digit | k }}</span>
          </li>
        </ul>
        <ul class="tooltip__payment">
          <li class="tooltip__row">Square value <span class="tooltip__row__right">{{data.payment.cardPrice | digit | k }}</span></li>
          <li class="tooltip__row">Square pledge <span class="tooltip__row__right">{{data.payment.pledge | digit | k }}</span></li>
          <li class="tooltip__row">Buyback square <span class="tooltip__row__right">{{data.payment.buyout | digit | k }}</span></li>
          <li class="tooltip__row">Branch purchase <span class="tooltip__row__right">{{data.payment.branchPrice | digit | k }}</span></li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>

export default {
  name: 'Tooltip',
  props: {
    show: {
      type: Boolean,
      required: true
    },
    classes: {
      type: String,
      default: ''
    }, 
    transition: {
      type: String,
      default: 'bounce',
      required: true
    }, 
    data: {
      type: Object,
      default: () => {},
    }
  }
}
</script>

