<template>
  <div>
    <div class="page-title">
      <h3>{{'Categories' | locale}}</h3>
    </div>
    <section>
      <Loader v-if="loading"/>
      <div v-else class="row">
        <CategoryCreate @created="addNewCategory"/>
<!--когда :key меняется, то Vue вынужден перерисовать элемент, что нам и нужно-->
        <div v-if="categories.length">
          <!--<CategoryEdit-->
            <!--:categories="categories"-->
            <!--:key="categories.length + updateCount"-->
            <!--@updated="updateCategories"-->
          <!--/>-->
         <CategoriesTable
            :categories="categories"
            :key="categories.length + updateCount"
            @updated="updateCategories"/>
        </div>
        <p v-else class="center">{{'NoCategories' | locale}}</p>
      </div>
    </section>
  </div>
</template>

<script>
  import CategoryCreate from '@/components/CategoryCreate'
  import CategoryEdit from '@/components/CategoryEdit'
  import CategoriesTable from "../components/CategoriesTable";
export default {
  metaInfo() {
    return {
      title: this.$title('Categories')
    }
  },
  name: 'categories',
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0
  }),
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
  },
  components: {
    CategoriesTable,
    CategoryCreate,
    CategoryEdit
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category)
    },
    updateCategories(category) {
      const idx = this.categories.findIndex(c => c.id === category.id)
      this.categories[idx].title = category.title
      this.categories[idx].limit = category.limit
      this.updateCount++
    }
  }
}
</script>