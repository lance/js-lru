/**
 * Create a new lru cache
 */
var Cache = function() {
  this.__arr   = []; // LRU list. New items push()'ed, old items shift()'ed
  this.__cache = {}; // The cache map
  this.__size  = Cache.DEFAULT_SIZE;
};

/**
 * The default cache size is 100 entries
 */
Cache.DEFAULT_SIZE = 100;

/**
 * Gets the value for @name if it exist. If the cache does not 
 * contain an entry with the key 'name', false is returned.
 * @param {string} name The key for the hash entry.
 * @return {{}|false} The cache entry if found, or false.
 */
Cache.prototype.get = function(name) {
  if (this.contains(name)) {
    var val = this.__cache[name];
    this.delete(name);
    return this.put(name, val);
  }
};

/**
 * Puts a value into the cache. If the number of cache entries is greater than
 * or equal to Cache.prototype.size(), it removes the least recently used
 * cache entry..
 */
Cache.prototype.put = function(name, value) {
  if (this.__size === this.__arr.length) {
    this.delete(this.__arr.shift());
  }
  this.__arr.push(name);
  this.__cache[name] = value;
  return value;
};

/**
 * The predefined cache size
 */
Cache.prototype.size = function(l) {
  if (l) { this.__size = l; }
  return this.__size;
};

/**
 * Returns true if the cache contains an entry with name
 */
Cache.prototype.contains = function(name) {
  return Object.prototype.hasOwnProperty.call(this.__cache, name);
};

/**
 * Deletes an entry from the cache
 */
Cache.prototype.delete = function(name) {
  if (this.contains(name)) delete this.__cache[name];
};

/**
 * Clars all entries from the cache
 */
Cache.prototype.clear = function() {
  this.__cache = {};
  this.__arr   = [];
};

/**
 * Clears all entries in the cache and resets the cache size limit to default
 */
Cache.prototype.reset = function() {
  this.__arr   = [];
  this.__cache = {};
  this.__size  = Cache.DEFAULT_SIZE;
};

module.exports = Cache;
