<template>
  <form class="search-field">
    <input
      :value="term"
      type="search"
      class="field"
      @input="input($event.target.value)"
      required
    />
    <div class="placeholder">
      <span id="placeholder">Pesquisar</span>
    </div>
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
        strings: ['Pesquisar', 'Custas', 'Intimações', 'Cursos', 'ou qualquer serviço ou informação da AASP'],
        typeSpeed: 30,
        startDelay: 1000
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

    > .field
      width: 100%
      height: 100%
      padding-left: $search-field-padding
      padding-right: @padding-left
      border: 1px solid #000
      border-radius: $search-field-height
      background-color: transparent
      background-image: none

    > .field:valid ~ .placeholder // Removo o ::placeholder customizado assim que o
      opacity: 0                  // <input /> for válido, que no caso é "não vazio".

    > .placeholder
      position: absolute
      top: 50%
      left: $search-field-padding
      right: @left
      user-select: none !important
      transform: translateY(-50%)
      transition: opacity .3s ease
      z-index: -1
</style>
