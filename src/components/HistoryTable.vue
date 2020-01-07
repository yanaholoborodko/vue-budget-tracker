<template>
  <table>
    <thead>
    <tr>
      <th>#</th>
      <th>{{'Total' | locale}}</th>
      <th>{{'Date' | locale}}</th>
      <th>{{'Category' | locale}}</th>
      <th>{{'Type' | locale}}</th>
      <th>{{'Open' | locale}}</th>
    </tr>
    </thead>

    <tbody>
    <tr v-for="(record, idx) in records" :key="record.id">
      <td>{{ idx + 1 }}</td>
      <td>{{ record.amount | currency('PLN')}}</td>
      <td>{{ record.date | date('datetime')}}</td>
      <td>{{ record.categoryName }}</td>
      <td>
        <span class="white-text badge" :class="[record.typeClass]">{{ record.typeText }}</span>
      </td>
      <td>
        <button
          class="btn-small btn"
          @click="$router.push('/detail/' + record.id)"
          v-tooltip="'See details'"
        >
          <i class="material-icons">open_in_new</i>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    records: {
      required: true,
      type: Array
    }
  }
}
</script>