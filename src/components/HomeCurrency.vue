<template>
  <div class="col s12 m6 l8">
    <div class="card indigo darken-2 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">{{'ExchangeRate' | locale}}</span>
        </div>
        <table>
          <thead>
          <tr>
            <th>{{'Currency' | locale}}</th>
            <th>{{'ExchangeRate' | locale}}</th>
            <th>{{'Date' | locale}}</th>
          </tr>
          </thead>

          <tbody>
          <tr v-for="cur in currencies" :key="cur">
            <td>{{cur}}</td>
            <td>{{rates[cur].toFixed(3)}}</td>
            <td>{{date | date('date')}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['rates', 'date'],
  data: () => ({
    currencies: ['EUR', 'USD', 'UAH']
  }),
}
</script>