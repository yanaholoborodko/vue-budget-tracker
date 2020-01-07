<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{'Edit' | locale}}</h4>
      </div>

      <form @submit.prevent="onSubmit">
        <div class="input-field" >
          <span>{{'ChooseCategory' | locale}}</span>
          <select ref="select" v-model="current">
            <option
              v-for="c in categories"
              :key="c.id"
              :value="c.id"
            >{{c.title}}</option>
          </select>
        </div>

        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="title"
            :class="{ invalid: $v.title.$dirty && !$v.title.required }"
          >
          <label for="name">{{'Name' | locale}}</label>
          <span
            v-if="$v.title.$dirty && !$v.title.required"
            class="helper-text invalid">
            {{'EnterCatName' | locale}}
          </span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{ invalid: $v.limit.$dirty && !$v.limit.minValue }"
          >
          <label for="limit">{{'Limit' | locale}}</label>
          <span
            v-if="$v.limit.$dirty && !$v.limit.minValue"
            class="helper-text invalid">
            {{'MinimumValue' | locale}} {{$v.limit.$params.minValue.min}}</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{'Update' | locale}}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import {required, minValue} from 'vuelidate/lib/validators'
import localeFilter from '@/filters/locale.filter'
export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    title: '',
    limit: 50,
    select: null,
    current: null
  }),
  validations: {
    title: {required},
    limit: {minValue: minValue(50)}
  },
  watch: {
    current(catId) {
      const {title, limit} = this.categories.find(c => c.id === catId)
      this.title = title
      this.limit = limit
    }
  },
  computed: {
    categoryFromState() {
      return this.$store.getters.currentCategory
    }
  },
  created() {
    let index = this.categories.findIndex(category => category.id === this.categoryFromState)
    index = index >= 0 ? index : 0
    const {id, title, limit} = this.categories[index]
    this.current = id
    this.title = title
    this.limit = limit
  },
  methods: {
    async onSubmit() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit
        }
        await this.$store.dispatch('updateCategory', categoryData)
        this.$message(localeFilter('CatUpdated'))
        this.$emit('updated', categoryData)
      } catch (e) {}
    }
  },
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select)
    M.updateTextFields()
  },
  destroyed() {
    if(this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>