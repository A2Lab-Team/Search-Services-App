<template>
  <transition-group name="search-results-transition" class="search-results" tag="ul">
    <li
      class="result"
      v-for="result in results"
      :key="result.link"
    >
      <search-result v-bind="result" />
    </li>
  </transition-group>
</template>

<script>
  import SearchResult from '@/components/SearchResult';

  export default {
    components: { SearchResult },
    props: {
      results: {
        type: Array,
        required: true,
      },
    },
  };
</script>

<style lang="stylus">
  $search-results-spacing = 16px

  .search-results
    &
      box-sizing: border-box
      margin: 0
      padding: 0 $search-results-spacing
      list-style: none

    > .result + .result
      margin-top: $search-results-spacing
</style>
