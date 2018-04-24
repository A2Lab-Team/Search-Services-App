<template>
  <a class="search-result" :href="link" target="_blank">
    <h5 class="category">{{ category }}</h5>
    <h3 class="name">{{ name }}</h3>
    <p class="description" v-html="description" />
  </a>
</template>

<script>
  export default {
    props: {
      link: {
        type: String,
        default: '',
      },
      name: {
        type: String,
        default: '',
      },
      category: {
        type: String,
        default: '',
      },
      description: {
        type: String,
        default: '',
      },
    },
  };
</script>

<style lang="stylus">
  .search-result
    &
      position: relative
      display: block
      padding: 16px
      background-color: #fff
      box-shadow: 0 2px  5px 0 rgba(#000, .16),
                  0 2px 10px 0 rgba(#000, .12)

    > .category
      position: absolute
      top: 0
      right: 0
      width: 120px
      margin: 0
      padding: 4px
      border: 1px solid #000
      border-top: 0
      border-right: 0
      border-radius: 0 0 0 8px
      font-weight: 400

    > .name
      margin: 0
      margin-bottom: 16px

    > .description
      margin: 0
</style>
