<template>
  <div>
    <div class="page-title">
      <h3>{{'Planning' | locale}}</h3>
      <h4>{{info.bill | currency('PLN')}}</h4>
    </div>

    <Loader v-if="loading" />

    <p v-else-if="!categories.length" class="center">{{'NoCategories' | locale}}.
      <router-link to="/categories">{{'CreateCategory' | locale}}</router-link>
    </p>

    <section v-else>
      <div v-for="cat in categories" :key="cat.id">
        <p>
          <strong>{{cat.title}}</strong>
          {{cat.spent | currency('PLN')}} {{'OutOf' | locale}} {{cat.limit | currency('PLN')}}
        </p>
        <div class="progress" v-tooltip.noloc="cat.tooltip">
          <div
            class="determinate"
            :class="[cat.progressColor]"
            :style="{width: cat.progressPercent + '%'}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import currencyFilter from '@/filters/currency.filter'
import localeFilter from '@/filters/locale.filter'
export default {
  name: 'planning',
  metaInfo() {
    return {
      title: this.$title('Planning')
    }
  },
  data: () => ({
    loading: true,
    categories: []
  }),
  computed: {
    ...mapGetters(['info'])
  },
  async mounted() {
    const records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchActiveCategories')
    this.categories = categories
        .filter(c => c.type === 'Expense')
        .map(cat => {
          const spent = records
            .filter(r => r.categoryId === cat.id)
            .filter(r => r.type === 'Expense')
            .reduce((total, record) => {
              return total += +record.amount
            }, 0)
      const percent = 100 * spent / cat.limit
      const progressPercent = percent > 100? 100 : percent

      const progressColor = percent < 60
          ? 'green'
          : percent < 100
            ? 'yellow'
            : 'red'

      const tooltipValue = cat.limit - spent
      const diff = currencyFilter(Math.abs(tooltipValue))
       const tooltip = `${
          tooltipValue < 0 ? localeFilter('ExceededLimitBy') : localeFilter('Remains')
          } ${currencyFilter(Math.abs(tooltipValue))}`

      return {
        ...cat,
        progressPercent,
        progressColor,
        spent,
        tooltip
      }
    })

    this.loading = false

  },
}
</script>