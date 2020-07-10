<template>
  <div>
    <form v-on:submit.prevent="singIn" class="border rounded">
      <div class="form-group row px-3 py-1 pt-3">
        <label for="login" class="col-sm-2 col-form-label">Email</label>
        <div class="col-sm-10">
          <input type="email" id="login" name="login" class="form-control-plaintext border px-3" v-model="login">
        </div>
      </div>
      <div class="form-group row px-3 py-1">
        <label for="password" class="col-sm-2 col-form-label">Password</label>
        <div class="col-sm-10">
          <input type="password" id="password" name="password" class="form-control-plaintext border px-3" v-model="password">
        </div>
      </div>
      <div class="form-group row px-3">
        <div class="col-sm-2"></div>
        <button type="submit" class="col-sm-2 btn btn-primary mx-3">Submit</button>
      </div>
    </form>
  </div>
</template>


<script>
import { mapActions } from 'vuex'
import oClientUser from '../../assets/js/client-user';
import oClientTransport from '../../assets/js/client-transport';
import axios from 'axios';

export default {
  name: 'TabLogIn',
  data() {
    return {
      login: '',
      password: '',
    }
  },
  methods: {
    ...mapActions([
      'updateProfile'
    ]),
    async singIn() {
      const config = {
        headers: {
          'Accept': 'application/hal+json, application/vnd.lm-error+json',
          'Content-Type': 'application/json',
        }
      };
      var gotResp;
      const response = await axios
        .post(
                `/security/login`,
                {
                  username: this.login, rawPassword: this.password
                },
                config
        )
        // .then(response => (this.response = response.data))
        .then(response => {
          gotResp = response;
        })
        .catch(e => console.log('Error log in user', e));
      if (gotResp) {
        let jwtParts = gotResp.data.jwtToken.split('.')
                , jwtEncoded = JSON.parse(atob(jwtParts[1]));
        gotResp.data.nickname = jwtEncoded.nickname;
        gotResp.data.userId = jwtEncoded.userId;
        this.updateProfile(gotResp.data);
        oClientUser.init(gotResp.data);
        oClientTransport.connect(); //Init object and connect to the server
      }

      return response;
    }
  }
}
</script>

