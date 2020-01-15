<template>
  <div>
    <div class="page-title">
      <h3>{{'NewRecord' | locale}}</h3>
    </div>

    <Loader v-if="loading"/>

    <p v-else-if="!categories.length" class="center">{{'NoCategories' | locale}}.
      <router-link to="/categories">{{'CreateCategory' | locale}}</router-link>
    </p>
    <form v-else class="form" @submit.prevent="onSubmit">
      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="Expense"
            v-model="type"
          />
          <span>{{'Expense' | locale}}</span>
        </label>
      </p>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="Income"
              v-model="type"
          />
          <span>{{'Income' | locale}}</span>
        </label>
      </p>

      <div>
        <select class="select-input" v-model="category">
          <option v-for="c in categories" v-bind:value="c.id" v-if="c.type === type">
              {{ c.title }} , {{ c.type }}
          </option>
        </select>
      </div>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{ invalid: $v.amount.$dirty && !$v.amount.minValue }"
        >
        <label for="amount">{{'Total' | locale}}</label>
        <span
          v-if="$v.amount.$dirty && !$v.amount.minValue"
          class="helper-text invalid">
          {{'MinimumValue' | locale}} {{$v.amount.$params.minValue.min}}
        </span>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="description"
          :class="{ invalid: $v.description.$dirty && !$v.description.required }"
        >
        <label for="description">{{'Description' | locale}}</label>
        <span
          v-if="$v.description.$dirty && !$v.description.required"
          class="helper-text invalid">
          {{'EnterDescription' | locale}}
        </span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{'Create' | locale}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import {required, minValue} from 'vuelidate/lib/validators'
import {mapGetters} from 'vuex'
import localeFilter from '@/filters/locale.filter'
export default {
  name: 'record',
  metaInfo() {
    return {
      title: this.$title('NewRecord')
    }
  },
  data: () => ({
    loading: true,
    categories: [],
    type: 'Expense',
    amount: 1,
    description: '',
    category: 'Choose category'
  }),
  validations: {
    amount: {minValue: minValue(1)},
    description: {required}
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchActiveCategories')
    this.loading = false

    setTimeout(() => {
      M.updateTextFields()
    }, 0)
  },
  computed: {
    ...mapGetters(['info']),
    canCreateRecord() {
      if(this.type === 'Income') {
        return true
      }

      return this.info.bill >= this.amount
    }
  },
  methods: {
    async onSubmit() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      if(this.canCreateRecord) {
        try {
          await this.$store.dispatch('createRecord', {
            categoryId: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON()
          })
          const bill = this.type === 'Income'
            ? this.info.bill + this.amount
            : this.info.bill - this.amount

          await this.$store.dispatch('updateInfo', {bill})
          this.$message(localeFilter('RecordCreated'))
          this.$v.$reset()
          this.amount = 1
          this.description = ''
        } catch (e) {}
      } else {
        this.$message(
            `${localeFilter('NotEnoughMoney')} (${this.amount -
            this.info.bill})`
        )
      }
    }
  }
}
</script>