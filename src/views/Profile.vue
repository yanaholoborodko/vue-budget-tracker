<template>
  <div>
    <div class="page-title">
      <h3>{{'Profile' | locale}}</h3>
    </div>

    <form class="form" @submit.prevent="onSubmit">
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="name"
          :class="{ invalid: $v.name.$dirty && !$v.name.required }"
        >
        <label for="description" :class="{active: name.length}">{{ 'Name' | locale }}</label>
        <span
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
        >{{ 'EnterName' | locale }}</span>
      </div>

      <div class="switch">
        <label>
          Polski
        <input type="checkbox" v-model="isEnLocale">
        <span class="lever"></span>
          English
      </label>
    </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ "Update" | locale }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import {required} from 'vuelidate/lib/validators'

export default {
  metaInfo() {
    return {
      title: this.$title('Profile')
    }
  },
  data: () => ({
    name: '',
    isEnLocale: true
  }),
  validations: {
    name: {required}
  },
  mounted() {
    this.name = this.info.name
    this.isEnLocale = this.info.locale === 'en-GB'
  },
  computed: {
    ...mapGetters(['info'])
  },
  methods: {
    ...mapActions(['updateInfo']),
    async onSubmit() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        await this.updateInfo({
          name: this.name,
          locale: this.isEnLocale ? 'en-GB' : 'pl-PL'
        })
      } catch (e) {}

    }
  }
}
</script>

<style>
  .switch {
    margin-bottom: 2rem;
  }
</style>