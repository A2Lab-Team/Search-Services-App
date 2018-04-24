<template>
  <section :class="classes">
    <search-field @update="search($event)" />

    <ul class="search-results">
      <li class="result" v-for="result in results" :key="result.link">
        <search-result v-bind="result" />
      </li>
    </ul>
  </section>
</template>

<script>
  import CSV from 'parse-csv';
  import lunr from 'lunr';
  import database from '@/assets/services.csv';
  import normalize from 'normalize-text';
  import SearchField from '@/components/SearchField';
  import SearchResult from '@/components/SearchResult';

  export default {
    components: { SearchField, SearchResult },
    data () {
      return {
        index: null,
        results: [],
        services: [],
        isLoading: true,
      };
    },
    computed: {
      classes () {
        return [
          'search-container', {
            '-is-loading': this.isLoading,
          }
        ]
      }
    },
    methods: {
      normalize (term) {
        if (!term)
          return ''
        const toFuzzy = (term) => term + '~1';
        const normalized = normalize(term).split(' ').map(toFuzzy).join(' ');
        return normalized
      },
      search (term) {
        const results = this.index.search(this.normalize(term));
        this.results = results.map((_) => {
          return this.services.find((service) => service.link === _.ref);
        });
      },
    },
    mounted () {
      const services = CSV.toJSON(database, {
        headers: {
          included: true
        }
      });

      this.index = lunr(function () {
        this.ref('link');
        this.field('name', { boost: 3 });
        this.field('description');
        this.field('category', { boost: 2 });

        services.forEach((service) => this.add({
          name: normalize(service.name || ''),
          description: normalize(service.description || ''),
          category: normalize(service.category || ''),
          link: service.link
        }));
      });

      this.services = services
      setTimeout(() => this.isLoading = false, 1 * 1000)
    }
  };
</script>

<style lang="stylus">
  .search-container
    &
      display: flex
      align-items: center
      flex-direction: column
      justify-content: center
      min-height: 100vh

    &::before
      position: fixed
      bottom: 0
      z-index: -1
      display: block
      width: 100%
      height: 100%
      background-position: bottom right
      background-repeat: no-repeat
      background-image: url('~@/assets/images/background.jpg')
      background-size: cover
      filter: blur(1px)
      transition: filter .3s ease
      content: ''

    &.-is-loading::before
      filter: blur(5px)
</style>
