<template>
  <div>
    <div class="page-title">
      <h3>{{'RecordHistory' | locale}}</h3>
    </div>

    <div class="row" v-if="records.length > 0">
      <div class="col s12 m6 l4 offset-l1 column-chart">
        <canvas id="column"></canvas>
      </div>

      <div class="col s12 m6 l6 history-chart">
        <canvas id="pie" ref="canvas"></canvas>
      </div>
    </div>

    <Loader v-if="loading"/>

    <p v-else-if="!records.length" class="center">{{'NoRecords' | locale}}
      <router-link to="/record">{{'CreateRecord' | locale}}</router-link>
    </p>

    <section v-else>
      <HistoryTable :records="items"/>

      <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="'Back' | locale"
        :next-text="'Forward' | locale"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
      />
    </section>
  </div>
</template>

<script>
import HistoryTable from '@/components/HistoryTable'
import paginationMixin from '@/mixins/pagination.mixin'
import {Pie} from 'vue-chartjs'
import localeFilter from '@/filters/locale.filter'
export default {
  metaInfo() {
    return {
      title: this.$title('History')
    }
  },
  name: 'history',
  extends: Pie,
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    records: []
  }),
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchActiveCategories')
    this.setup(categories)
    this.loading = false
    if(this.records.length > 0) {
      this.initColummChart()
    }
  },
  computed: {
    expTotal() {
      let tot = 0
      this.records.reduce((total, r) => {
        if(r.type === 'Expense') {
          total += +r.amount
        }
        tot = total
        return total
      }, 0)
      return tot
    },
    incTotal() {
      let tot = 0
      this.records.reduce((total, r) => {
        if(r.type === 'Income') {
          total += +r.amount
        }
        tot = total
        return total
      }, 0)
      return tot
    }
  },
  methods: {
    setup(categories) {
      this.setupPagination(this.records.map(record => {
        return {
          ...record,
          categoryName: categories.find(c => c.id === record.categoryId).title,
          typeClass: record.type === 'Income' ? 'green' : 'red',
          typeText:
              record.type === 'Income'
                  ? localeFilter('Income')
                  : localeFilter('Expense')
        }
      }))

      this.renderChart({
        labels: categories.filter(cat => cat.type === 'Expense').map(c => c.title),
        datasets: [{
          label: localeFilter('CategoryExpenses'),
          data: categories.filter(cat => cat.type === 'Expense').map(c => {
            return this.records.reduce((total, r) => {
              if(r.categoryId === c.id && r.type === 'Expense') {
                total += +r.amount
              }
              return total
            }, 0)
          }),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      })
    },
    initColummChart() {
      let ctx = document.getElementById('column').getContext('2d');
      let column = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
          labels: ['Incomes', 'Expenses'],
          datasets: [{
            label: 'January',
            data: [this.incTotal, this.expTotal],
            backgroundColor: [
              'rgba(75, 192, 192, 0.2)',
              'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            xAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });
    }
  },
  components: {
    HistoryTable
  }
}
</script>