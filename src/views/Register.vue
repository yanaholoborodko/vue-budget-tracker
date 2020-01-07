<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
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
        >{{'MinPassLength' | locale}} {{$v.password.$params.minLength.min}} {{'MinPassLength2' | locale}} {{password.length}}</small>    </div>
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model.trim="name"
          :class="{invalid : ($v.name.$dirty && !$v.name.required)}"
        >
        <label for="name">{{'Name' | locale}}</label>
        <small
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
        >{{'NameNotEmpty' | locale}}</small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree" id="agree-to-terms"/>

          <span for="agree-to-terms" :class="{noagree : ($v.name.$dirty && !agree.selected ), 'agreed' : agree}">
            {{'Agreement' | locale}}
          </span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit">
          {{'Register' | locale}}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{'AlreadyRegistered' | locale}}
        <router-link to="/login"> {{'Login' | locale}}</router-link>
      </p>
    </div>
  </form>
</template>

<script>
  import {email, required, minLength} from 'vuelidate/lib/validators'

export default {
  name: 'register',
  metaInfo() {
    return {
      title: this.$title('Register')
    }
  },
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
    async submitHandler() {
      if(this.$v.$invalid) {
        this.$v.$touch();
        return
      }

      const formData = {
        email: this.email,
        password: this.password,
        name: this.name
      }

      try {
        await this.$store.dispatch('register', formData)
        this.$router.push('/')
      } catch(e) {}
    }
  }
}

</script>