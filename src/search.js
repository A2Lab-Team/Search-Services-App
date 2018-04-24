import lunr from 'lunr';
import normalize from 'normalize-text';

/**
 * Service model.
 * @typedef {object} Service
 * @property {string} name
 * @property {string} category
 * @property {string} description
 * @property {string} link
 */

/**
 * Resolves term.
 * @param {string} term
 * @returns {string}
 */
const resolveTerm = (term) => {
  if (!term)
    return ''
  const toFuzzy = (term) => term + '~1';
  return normalize(term).split(' ').map(toFuzzy).join(' ');
};

/**
 * Searchs using term in services.
 * @param {string} term
 * @param {lunr.Index} index
 * @param {Array.<Service>} services
 */
const search = (term, index, services) => {
  const results = index.search(resolveTerm(term));
  return services.filter((service) => {
    const isMatch = results.some((result) => result.ref === service.link);
    return isMatch;
  });
};

/**
 * Creates a lunr index using services.
 * @param {Array.<Service>} services
 * @return {lunr.Index}
 */
const createIndex = (services) => lunr(function () {
  this.ref('link');
  this.field('name');
  this.field('description');
  this.field('category');

  services.forEach((service) => this.add({
    name: normalize(service.name || ''),
    description: normalize(service.description || ''),
    category: normalize(service.category || ''),
    link: service.link
  }));
});

export { createIndex, search as default }
