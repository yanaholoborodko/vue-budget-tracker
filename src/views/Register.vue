<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
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
      <div class="input-field">
        <input
                id="name"
                type="text"
                v-model.trim="name"
                :class="{invalid : ($v.name.$dirty && !$v.name.required)}"
        >
        <label for="name">Name</label>
        <small
                class="helper-text invalid"
                v-if="$v.name.$dirty && !$v.name.required"
        >Name field should not be empty</small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree"/>
          <span :class="{ noagree : ($v.name.$dirty && !agree.selected )}">
            I agree with all the privacy policy statements
          </span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
                class="btn waves-effect waves-light auth-submit"
                type="submit"
        >
          Register
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Already have an account?
        <router-link to="/login">Log in</router-link>
      </p>
    </div>
  </form>
</template>

<script>
  import {email, required, minLength} from 'vuelidate/lib/validators'

export default {
  name: 'register',
  data: () => ({
    email: '',
    password: '',
    name: '',
    agree: false
  }),
  validations: {
    email: {email, required},
    password: {required, minLength: minLength(6)},
    name: {required},
    agree: {checked: v=> v}
  },
  methods: {
    submitHandler() {
      if(this.$v.$invalid) {
        this.$v.$touch();
        return
      }

      const formData = {
        email: this.email,
        password: this.password,
        name: this.name
      }

      this.$router.push('/');
    }
  }
}

</script>