import HashStorage from '../../src/services/HashStorage';

var storage = new HashStorage;

describe('load&save', function () {
  var string = 'abcd::';
  
  it('load', function () {
    storage.load(function () {
      return string;
    });
  });
  
  it('save', function () {
    storage.save(function (arg) {
      expect(arg).toEqual(string);
    });
  });
});

describe('skills', function () {
  var string = 'abcd::';
  
  it('load', function () {
    storage.load(function () {
      return string;
    });
  });
  
  it('save', function () {
    storage.save(function (arg) {
      expect(arg).toEqual(string);
    });
  });
});

describe('perks', function () {
  var string = 'abcd::';
  
  it('load', function () {
    storage.load(function () {
      return string;
    });
  });
  
  it('save', function () {
    storage.save(function (arg) {
      expect(arg).toEqual(string);
    });
  });
});

describe('infamy', function () {
  var string = 'abcd::';
  
  it('load', function () {
    storage.load(function () {
      return string;
    });
  });
  
  it('save', function () {
    storage.save(function (arg) {
      expect(arg).toEqual(string);
    });
  });
});