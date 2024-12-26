// utils/cache.js
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 60 });

const getCache = (key) => cache.get(key);
const setCache = (key, value) => cache.set(key, value);

module.exports = { getCache, setCache };
