<template>
  <section class="search-container">
    <input
      v-model.trim="term"
      type="search"
      class="search-field"
    />
  </section>
</template>

<script>
  export default {
    data () {
      return {
        term: '',
      };
    },
  };
</script>

<style lang="stylus" src="@/assets/styles/base.styl"></style>

<style lang="stylus">
  .search-field
    width: 100%
    height: 60px
    padding-left: (@height / 2)
    padding-right: @padding-left
    border: 1px solid #000
    border-radius: @height
</style>
