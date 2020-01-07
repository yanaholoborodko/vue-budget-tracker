<template>
  <form class="card auth-card" @submit.prevent="onSubmit">
    <div class="card-content">
      <span class="card-title">{{'AppTitle' | locale}}</span>
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
        >{{'EmailNotEmpty' | locale}}</small>
        <small
          class="helper-text invalid"
          v-else-if="$v.email.$dirty && !$v.email.email"
        >{{'ProvideEmail' | locale}}</small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{invalid : ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
        >
        <label for="password">{{'Password' | locale}}</label>
        <small
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.required"
        >{{'PasswordNotEmpty' | locale}}</small>
        <small
          class="helper-text invalid"
          v-else-if="$v.password.$dirty && !$v.password.minLength"
        >{{'MinPassLength' | locale}} {{$v.password.$params.minLength.min}} {{'MinPassLength2' | locale}} {{password.length}}</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
        >
          {{'Login' | locale}}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{'NoAccount' | locale}}
        <router-link to="/register">{{'Register' | locale}}</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import {email, required, minLength} from 'vuelidate/lib/validators'
import toasts from '@/utils/toasts'
import localeFilter from '@/filters/locale.filter'

export default {
  name: 'login',
  metaInfo() {
    return {
      title: this.$title('Login')
    }
  },
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
      this.$message(localeFilter(toasts[this.$route.query.message]))
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
      } catch (e) {}
    }
  }
}
</script>