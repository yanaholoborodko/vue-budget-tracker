<template>
    <ul class="sidenav app-sidenav" :class="{open : value}">

      <router-link
        v-for="link in links"
        :key="link.url"
        tag="li"
        active-class="active"
        :to="link.url"
        :exact="link.exact"
      >
        <a href="#" class="waves-effect waves-orange pointer">{{link.title}}</a>
      </router-link>

    </ul>
</template>

<script>
  import localeFilter from '@/filters/locale.filter'
  export default {
    props: ['value'],
    data: () => ({
      links: [
        {title: localeFilter('Account'), url:'/', exact: true},
        {title: localeFilter('History'), url:'/history'},
        {title: localeFilter('Planning'), url:'/planning'},
        {title: localeFilter('NewRecord'), url:'/record'},
        {title: localeFilter('Categories'), url:'/categories'}
      ]
    })
  }
</script>