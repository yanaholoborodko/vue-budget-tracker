<template>
  <form class="card auth-card" @submit.prevent="onSubmit">
    <div class="card-content">
      <span class="card-title">Budget tracker</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{invalid : ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
        >
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-if="$v.email.$dirty && !$v.email.required"
        >Email field should not be empty</small>
        <small
          class="helper-text invalid"
          v-else-if="$v.email.$dirty && !$v.email.email"
        >Please provide correct email</small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{invalid : ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
        >
        <label for="password">Password</label>
        <small
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.required"
        >Password field should not be empty</small>
        <small
          class="helper-text invalid"
          v-else-if="$v.password.$dirty && !$v.password.minLength"
        >Min. password length is {{$v.password.$params.minLength.min}} characters. Now it`s only {{password.length}}</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
        >
          Log in
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Don`t have an account yet?
        <router-link to="/register">Register</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import {email, required, minLength} from 'vuelidate/lib/validators'
import toasts from '@/utils/toasts'

export default {
  name: 'login',
  data: () => ({
    email: '',
    password: ''
  }),
  validations: {
    email: {email, required},
    password: {required, minLength: minLength(6)}
  },
  mounted() {
    if(toasts[this.$route.query.message]) {
      this.$message(toasts[this.$route.query.message]);
    }
  },
  methods: {
    async onSubmit() {
      if(this.$v.$invalid){
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password
      }

      try {
        await this.$store.dispatch('login', formData)
        this.$router.push('/')
      } catch(e) {
      }
    }
  }
}
</script>