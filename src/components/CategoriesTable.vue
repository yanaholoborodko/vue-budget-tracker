<template>
  <div class="col s12">
    <table class="mt-30">
      <thead>
        <tr>
          <th>#</th>
          <th>{{'Name' | locale}}</th>
          <th>{{'Type' | locale}}</th>
          <th>{{'Limit' | locale}}</th>
          <th>{{'Archive' | locale}}</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(c, idx) in categories"
          :key="c.id"
          :value="c.id"
          class="category" v-if="!c.archived">
          <td>{{ idx + 1 }}</td>
          <td>{{ c.title }}</td>
          <td>{{ c.type }}</td>
          <td>{{ c.limit | currency('PLN')}}</td>
          <td>
            <button class="btn-small brown btn" @click="deleteCategory(c.id)">
              <i class="material-icons">archive</i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import localeFilter from '@/filters/locale.filter'
export default {
  props: {
    categories: {
      type: Array,
      required: true
      }
  },
  methods: {
    async deleteCategory(catId) {
      try {
        await this.$store.dispatch('deleteCategory', catId)
        this.$message(localeFilter('catDeleted'))
        const catIndex = this.categories.findIndex(c => c.id === catId)
        this.categories.splice(catIndex, 1)
      } catch (e) {}
    }
  }
}

</script>
