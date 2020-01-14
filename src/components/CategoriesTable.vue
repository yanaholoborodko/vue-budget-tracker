<template>
  <div class="col s12">
  <div class="right-align"><button class="btn-small waves-effect waves-light" v-on:click="activeList = !activeList">
  <span v-if="activeList">{{'SeeArchived' | locale}}</span>
  <span v-else>{{'SeeActive' | locale}}</span>
  </button></div>
    <table class="mt-30">
      <thead>
        <tr>
          <th>#</th>
          <th>{{'Name' | locale}}</th>
          <th>{{'Type' | locale}}</th>
          <th>{{'Limit' | locale}}</th>
          <th>{{'Status' | locale}}</th>
        </tr>
      </thead>

      <tbody v-if="activeList">
        <tr v-for="(c, idx) in categories"
          :key="c.id"
          :value="c.id"
          class="category" v-if="!c.archived">
          <td>{{ idx + 1 }}</td>
          <td>{{ c.title }}</td>
          <td>{{ c.type }}</td>
          <td>{{ c.limit | currency('PLN')}}</td>
          <td>
            <button class="btn-small brown btn" @click="archiveCategory(c.id)">
              <i class="material-icons">archive</i>
            </button>
          </td>
        </tr>
      </tbody>

    <tbody v-else>
      <tr v-for="(c, idx) in categories"
        :key="c.id"
        :value="c.id"
        class="category" v-if="c.archived">
        <td>{{ idx + 1 }}</td>
        <td>{{ c.title }}</td>
        <td>{{ c.type }}</td>
        <td>{{ c.limit | currency('PLN')}}</td>
        <td>
          <button class="btn-small green btn" @click="activeCategory(c.id)">
            <i class="material-icons">beenhere</i>
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
   data: () => ({
      activeList: true
    }),
  methods: {
    async archiveCategory(catId) {
      try {
        await this.$store.dispatch('archiveCategory', catId)
        this.$message(localeFilter('catArchived'))
        const catIndex = this.categories.findIndex(c => c.id === catId)
        this.categories.splice(catIndex, 1)
      } catch (e) {}
    },
    async activeCategory(catId) {
          try {
            await this.$store.dispatch('activeCategory', catId)
            this.$message(localeFilter('catActive'))
            const catIndex = this.categories.findIndex(c => c.id === catId)
            this.categories.splice(catIndex, 1)
          } catch (e) {}
        },
  }
}

</script>
