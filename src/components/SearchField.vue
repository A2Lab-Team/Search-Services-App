<template>
  <form class="search-field" novalidate @submit.prevent="update()">
    <input
      :value="term"
      id="search-field"
      type="search"
      class="field"
      required
      @input="input($event.target.value)"
    />

    <label for="search-field" class="placeholder">
      <span id="placeholder">Pesquisar</span>
    </label>
  </form>
</template>

<script>
  import Typed from 'typed.js';
  import debounce from 'debounce';

  export default {
    data () {
      return {
        term: '',
      };
    },
    methods: {
      input (term) {
        this.term = term;
        this.update();
      },
      update: debounce(function () {
        this.$emit('update', this.term);
      }, 300),
    },
    mounted () {
      new Typed('#placeholder', {
        strings: ['Pesquisar', 'Custas', 'Intimações', 'Cursos', 'ou qualquer serviço ou informação da AASP', 'Pesquise'],
        typeSpeed: 30,
        startDelay: 1000,
        showCursor: false
      });
    },
  };
</script>

<style lang="stylus">
  $search-field-height = 60px
  $search-field-padding = ($search-field-height / 2)

  .search-field
    &
      position: relative
      width: 100%
      height: $search-field-height
      background-color: #fff
      border-radius: 0 $search-field-height $search-field-height 0
      box-shadow: 0 30px 40px 0 rgba(#10245e, .2),
            inset 0 -10px 0 0 rgba(#6775a1, .06)

    @media screen and (min-width: 480px)
      border-radius: $search-field-height

    > .field
      width: 100%
      height: 100%
      padding-left: $search-field-padding
      padding-right: @padding-left
      border: 0
      font: inherit
      background-color: transparent
      background-image: none

    > .field:valid ~ .placeholder // Removo o ::placeholder customizado assim que o
      opacity: 0                  // <input /> for válido, que no caso é "não vazio".

    > .placeholder
      position: absolute
      top: 50%
      left: $search-field-padding
      right: @left
      color: #818181
      user-select: none !important
      transform: translateY(-50%)
      transition: opacity .3s ease
</style>
