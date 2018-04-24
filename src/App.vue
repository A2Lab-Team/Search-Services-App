<template>
  <section class="search-container">
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
      };
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
    }
  };
</script>

<style lang="stylus" src="@/assets/styles/base.styl"></style>
