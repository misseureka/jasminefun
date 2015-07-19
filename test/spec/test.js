(function () {
  'use strict';  

  describe('Simple functions must return expected results', function () {

    beforeEach(function() {
      this.app = new rtgEventHandler();
      console.log(this);
      console.log(this.app);
    });
    
    it('isArray should return true for array', function () {
      expect(this.app.isArray([1,2,3,4,5])).toBe(true);
    });

    it('isArray should return false for string', function () {
      expect(this.app.isArray('I am not an array')).toBe(false);
    });

    it('isArray should return false for undefined', function () {
      expect(this.app.isArray(undefined)).toBe(false);
    });

  });
})();