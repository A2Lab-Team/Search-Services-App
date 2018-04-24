<template>
  <transition-group name="result" class="search-results" tag="ul">
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
      display: flex
      flex-wrap: wrap
      justify-content: flex-start
      width: 100%
      margin: 0
      padding: 0
      list-style: none

    > .result
      box-sizing: border-box
      padding: $search-results-spacing
      width: 100%

      @media screen and (min-width: 768px)
        width: 50%

      @media screen and (min-width: 1024px)
        width: calc(100% / 3)

      @media screen and (min-width: 1366px)
        width: calc(100% / 4)

  .result-enter-active
  .result-leave-active
    transition: all 1s

  .result-enter
  .result-leave-to
    opacity: 0
    transform: translateY(30px)
</style>
