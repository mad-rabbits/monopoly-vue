<template>
  <div>
    <form v-on:submit.prevent="requestGame" class="border rounded" id="gameRequest">
      <div v-if="status === 'none'" class="form-group px-3 py-1 pt-3">
        <div class="form-check">
          <input class="form-check-input" type="radio" id="gameModeSolo" value="solo" v-model="picked">
          <label class="form-check-label" for="gameModeSolo">Solo (FFA) - 1 vs 3</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" id="gameModeDuo" value="duo" v-model="picked">
          <label class="form-check-label" for="gameModeDuo">Duo (Team) - 2 vs 2</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" id="gameModeDuel" value="duel" v-model="picked">
          <label class="form-check-label" for="gameModeDuel">Duel - 1 vs 1</label>
        </div>
        <div class="form-check pt-3">
          <input class="form-check-input" type="checkbox" value="" id="privateGame" v-model="privateRoom">
          <label class="form-check-label" for="privateGame">
            Private game (VIP)
          </label>
        </div>
      </div>
      <div v-else-if="status === 'request'" class="form-group row px-3">requesting...</div>
      <div v-else class="form-group row px-3">You are busy and can't join to any game</div>
      <div class="form-group row px-3">
        <button v-if="status === 'none'" type="submit" class="col-sm-2 btn btn-success mx-3">Play</button>
        <button v-else-if="status === 'request'" type="submit" class="col-sm-2 btn btn-warning mx-3">Cancel</button>
      </div>
    </form>
  </div>
</template>


<script>
import oClientRequest from '../../assets/js/client-request'
import store from '../../store';

export default {
  name: 'TabRequest',
  store,
  data() {
    return {
      picked: 'duel',
      privateRoom: false,
      usersInRequest: [this.$store.state.userId],
    }
  },
  computed: {
    status() {

      return this.$store.state.status
    },
    users() {
      let oStore = this.$store.state
              , oUser = {userId: oStore.userId, avatar: oStore.avatar, nickname: oStore.nickname}
      ;

      return [oUser];
    }
  },
  methods: {
    requestGame() {
      let status = this.$store.state.status;
      switch (status) {
        case 'none':
          oClientRequest.userStartRequest({
            gameMode : this.picked,
            isPrivateRoom : this.privateRoom,
            usersInRequest : this.usersInRequest
          });
          break;
        case 'request':
          oClientRequest.userCancelRequest();
          break;
      }
    }
  }
}
</script>

