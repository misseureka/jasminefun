(function () {
  'use strict';  

  describe('Simple functions must return expected results', function () {
    beforeEach(function() {
      this.app = new rtgEventHandler();
    });
    
    it('isArray should return true for array', function () {
      expect(this.app.isArray([1,2,3,4,5])).toBeTruthy();
    });

    it('isArray should return false for string', function () {
      expect(this.app.isArray('I am not an array')).toBeFalsy();
    });

    it('isArray should return false for undefined', function () {
      expect(this.app.isArray(undefined)).toBeFalsy();
    } );

    it( 'isTechnicalKey should return true for "__referrer"', function () {
      expect( this.app.isTechnicalKey( '__referrer' ) ).toBeTruthy();
    } );

    it( 'isTechnicalKey should return false for "event"', function () {
      expect( this.app.isTechnicalKey( 'event' ) ).toBeFalsy();
    } );

    it( 'isTechnicalKey should return false for undefined', function () {
      expect( this.app.isTechnicalKey( undefined ) ).toBeFalsy();
    } );
  } );

  describe( 'Function operates with DOM element <meta>', function () {
    beforeEach( function () {
      this.app = new rtgEventHandler();
    } );

    it( 'keywords should return "javascript, jasmine, bdd" for "<meta name=\"keywords\" content=\"javascript, jasmine, bdd\">" ', function () {
      var meta = document.createElement( 'meta' );
      meta.name = 'keywords';
      meta.content = 'javascript, jasmine, bdd';
      document.head.appendChild( meta );

      expect( this.app.keywords() ).toBe( 'javascript, jasmine, bdd' );
    } );

    it( 'keywords should return "javascript, jasmine, bdd" for "<meta name=\"keywords\" content=\"javascript, jasmine\"><meta name=\"keywords\" content=\"bdd\">" ', function () {
      var meta = document.createElement( 'meta' );
      meta.name = 'keywords';
      meta.content = 'javascript, jasmine';
      document.head.appendChild( meta );      
      meta = document.createElement( 'meta' );
      meta.name = 'keywords';
      meta.content = 'bdd';
      document.head.appendChild( meta );

      expect( this.app.keywords() ).toBe( 'javascript, jasmine,bdd' );
    } );

    it( 'keywords should return "bdd" for "<meta name=\"description\" content=\"javascript, jasmine, bdd\"><meta name=\"keywords\" content=\"bdd\">" ', function () {
      var meta = document.createElement( 'meta' );
      meta.name = 'description';
      meta.content = 'javascript, jasmine';
      document.head.appendChild( meta );
      meta = document.createElement( 'meta' );
      meta.name = 'keywords';
      meta.content = 'bdd';
      document.head.appendChild( meta );

      expect( this.app.keywords() ).toBe( 'bdd' );
    } );

    it( 'keywords should return "" for "<meta name=\"description\" content=\"javascript, jasmine, bdd\">" ', function () {
      var meta = document.createElement( 'meta' );
      meta.name = 'description';
      meta.content = 'javascript, jasmine, bdd';
      document.head.appendChild( meta );

      expect( this.app.keywords() ).toBe( '' );
    } );

    it( 'keywords should return "" for no meta tag ', function () {
      expect( this.app.keywords() ).toBe( '' );
    } );

    afterEach( function () {
      for ( var i = 0, l = document.getElementsByTagName( 'meta' ).length; i < l; i++ ) {
        document.head.removeChild( document.getElementsByTagName( 'meta' )[0] );
      }
    } );   
  } );

  describe('Function changed global variable', function(){
    beforeAll(function() {
      this.app = new rtgEventHandler();
      this.parameters = [];
    });
    
    it('appendParam should add new value to variable parameters for "event, addToSegment"', function () {
      this.app.appendParam('event', 'addToSegment', this.parameters);
      expect(this.parameters).toEqual(['event=addToSegment']);
    });

    it('appendParam should add new value to variable parameters for "name, unittest"', function () {
      this.app.appendParam('name', 'unittest', this.parameters);
      expect(this.parameters).toEqual(['event=addToSegment', 'name=unittest']);
    });

    it('appendParam should not add new value to variable parameters for "sku, undefined"', function () {
      this.app.appendParam('sku', undefined, this.parameters);
      expect(this.parameters).toEqual(['event=addToSegment', 'name=unittest']);
    });
  });

  describe('Function changed global variable 2', function(){
    beforeAll(function() {
      this.app = new rtgEventHandler();
      this.parameters = [];
    });
    
    it('addEventValue should add new event to variable parameters for "event, cart"', function () {
      this.app.addEventValue('event', 'cart', this.parameters);
      expect(this.parameters).toEqual(['event=cart']);
    });

    it('addEventValue should add new event to variable parameters for "products, [{sku:1, qty:1}, {sku:2, qty:2}]"', function () {
      this.app.addEventValue('products', [{sku:1, qty:1}, {sku:2, qty:2}], this.parameters);
      expect(this.parameters).toEqual(['event=cart', 'products__sku=1', 'products__qty=1', 'products__sku=2', 'products__qty=2']);
    });
  });

})();