describe("Cache", function() {
  var Cache = require('./lru');
  var cache = null;

  beforeEach(function() {
    cache = new Cache();
  }); 

  it('should put values into the cache and get them back', function() {
    cache.put('foo', 'bar');
    expect(cache.get('foo')).toBe('bar');
  });

  it('should let users set the cache size', function() {
    expect(cache.size()).toBe(100);
    cache.size(2);
    expect(cache.size()).toBe(2);
    cache.put('one', 1);
    cache.put('two', 2);
    cache.put('three', 3);
    expect(cache.contains('one')).toBe(false);
    expect(cache.contains('two')).toBe(true);
    expect(cache.contains('three')).toBe(true);
  });

  it('should remove the least recently used item', function(){
    expect(cache.size()).toBe(100);
    cache.size(2);
    expect(cache.size()).toBe(2);
    cache.put('one', 1);
    cache.put('two', 2);
    cache.get('one');
    cache.put('three', 3);
    expect(cache.contains('one')).toBe(true);
    expect(cache.contains('two')).toBe(false);
    expect(cache.contains('three')).toBe(true);
  });
});
