<template>
  <section class="search-container">
    <search-field @update="(term) => terms.push(term)" />
    <ul>
      <li v-for="(term, index) in terms" :key="index">{{ term }}</li>
    </ul>
  </section>
</template>

<script>
  import SearchField from '@/components/SearchField';

  export default {
    components: { SearchField },
    data () {
      return {
        terms: [],
      };
    },
  };
</script>

<style lang="stylus" src="@/assets/styles/base.styl"></style>
