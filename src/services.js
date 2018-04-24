import CSV from 'parse-csv';

/**
 * Service model.
 * @typedef {object} Service
 * @property {string} name
 * @property {string} category
 * @property {string} description
 * @property {string} link
 */

/**
 * Import and parse services.
 * @returns {Promise.<Array.<Service>>}
 */
const getServices = async () => {
  const { 'default': data } = await import('@/assets/services.csv');
  const services = CSV.toJSON(data, {
    headers: {
      included: true
    }
  });
  return services;
};

export default getServices;
