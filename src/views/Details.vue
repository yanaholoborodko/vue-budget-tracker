<template>
  <div>
    <Loader v-if="loading"/>
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">{{'History' | locale}}</router-link>
        <a @click.prevent class="breadcrumb">
          {{ record.typeText === 'Income' ? 'Income' : 'Expense' | locale }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="[record.typeClass]">
            <div class="card-content white-text">
              <p>{{'Description' | locale}}: {{record.description}}</p>
              <p>{{'Total' | locale}}: {{record.amount | currency('PLN')}}</p>
              <p>{{'Category' | locale}}: {{record.categoryName}}</p>

              <small>{{ record.date | date('datetime')}}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p v-else class="center">
      {{'RecordDoesntExist' | locale}}
    </p>
  </div>
</template>

<script>
export default  {
  metaInfo() {
    return {
      title: this.$title('Details')
    }
  },
  name: 'detail',
  data: () => ({
    record: null,
    loading: true
  }),
  async mounted() {
    const id = this.$route.params.id
    const record = await this.$store.dispatch('fetchRecordById', id)
    const category = await this.$store.dispatch('fetchCategoryById', record.categoryId)

    this.record = {
      ...record,
      categoryName: category.title,
      typeClass: record.type === 'income' ? 'green' : 'red',
      typeText: record.type === 'income' ? 'Income' : 'Expense'
    }

    this.loading = false
  },
}
</script>