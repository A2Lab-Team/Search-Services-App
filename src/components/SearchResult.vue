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
      box-sizing: border-box
      position: relative
      display: block
      width: 100%
      padding: 28px 16px 16px
      background-color: #fff
      border-radius: 15px
      box-shadow: 0 30px 40px 0 rgba(#10245e, .2),
            inset 0 -10px 0 0 rgba(#6775a1, .06)

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
      font-weight: 500
      margin: 0
      margin-bottom: 16px

    > .description
      -webkit-box-orient: vertical
      box-orient: vertical
      display: -webkit-box
      display: box
      margin: 0
      overflow: hidden
      -webkit-line-clamp: 6
      line-clamp: 6
      text-overflow: ellipsis
</style>
