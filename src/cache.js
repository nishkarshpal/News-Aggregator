// File: src/cache.js
class Cache {
    constructor() {
      this.articles = {};
    }
  
    set(key, value) {
      this.articles[key] = value;
    }
  
    get(key) {
      return this.articles[key];
    }
  
    has(key) {
      return key in this.articles;
    }
  
    delete(key) {
      delete this.articles[key];
    }
  }
  
  module.exports = Cache;
  