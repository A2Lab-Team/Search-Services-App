<template>
  <section class="search-container">
    <search-field @update="search($event)" />

    <ul class="search-results">
      <li class="search-result" v-for="result in results" :key="result.link">
        <h3>{{ result.name }}</h3>
        <p>{{ result.description }}</p>
      </li>
    </ul>
  </section>
</template>

<script>
  import CSV from 'parse-csv';
  import SearchField from '@/components/SearchField';
  import elasticlunr from 'elasticlunr';
  import services from '@/assets/services.csv';

  export default {
    components: { SearchField },
    data () {
      return {
        index: null,
        results: [],
        services: [],
      };
    },
    methods: {
      search (term) {
        const results = this.index.search(term);
        this.results = results.map((_) => {
          return this.services.find((service) => service.link === _.ref);
        });
      },
    },
    mounted () {
      this.services = CSV.toJSON(services, {
        headers: {
          included: true
        }
      });

      this.index = elasticlunr(function () {
        this.setRef('link');
        this.addField('name');
        this.addField('description');
        this.addField('category');
      });

      this.services.map((service) => this.index.addDoc(service));
    }
  };
</script>

<style lang="stylus" src="@/assets/styles/base.styl"></style>
