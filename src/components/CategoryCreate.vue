<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{'Create' | locale}}</h4>
      </div>

      <form @submit.prevent="onSubmit">
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
          <span>{{'ChooseType' | locale}}</span>
          <select ref="selectType" v-model="type">
            <option id="income">{{'Income' | locale}}</option>
            <option id="expense" selected="selected">{{'Expense' | locale}}</option>
          </select>
          <!--<span-->
            <!--v-if="!$v.type.required"-->
            <!--class="helper-text invalid">-->
            <!--{{'ChooseType' | locale}}-->
          <!--</span>-->
        </div>

        <div v-if="type=='Expense'" class="input-field">
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
          {{'Create' | locale}}
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
  data: () => ({
    title: '',
    limit: 50,
    type: 'Expense'
  }),
  validations: {
    title: {required},
    limit: {minValue: minValue(50)},
    // type: {required}
  },
  mounted() {
    this.selectType = M.FormSelect.init(this.$refs.selectType)
    M.updateTextFields()
  },
  methods: {
    async onSubmit() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        const category = await this.$store.dispatch('createCategory', {
          title: this.title,
          limit: this.limit,
          type: this.type,
          archived: false
        })
        this.title = ''
        this.limit = '50'
        this.type = null
        this.$v.$reset()
        this.$message(localeFilter('CatCreated'))
        this.$emit('created', category)
      } catch(e) {}
    }
  }
}
</script>