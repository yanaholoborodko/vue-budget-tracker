<template>
  <div>
    <div class="page-title">
      <h3>Record history</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>

    <section>
      <table>
        <thead>
        <tr>
          <th>#</th>
          <th>Total</th>
          <th>Date</th>
          <th>Category</th>
          <th>Type</th>
          <th>Open</th>
        </tr>
        </thead>

        <tbody>
        <tr>
          <td>1</td>
          <td>1000</td>
          <td>02.09.19</td>
          <td>Business</td>
          <td>
            <span class="white-text badge red">Expenses</span>
          </td>
          <td>
            <button class="btn-small btn">
              <i class="material-icons">open_in_new</i>
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>