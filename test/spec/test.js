(function () {
  'use strict';  

  describe('Simple functions must return expected results', function () {
    beforeEach(function() {
      this.app = new rtgEventHandler();
    });
    
    it('isArray should return true for array', function () {
      expect(this.app.isArray([1,2,3,4,5])).toBe(true);
    });

    it('isArray should return false for string', function () {
      expect(this.app.isArray('I am not an array')).toBe(false);
    });

    it('isArray should return false for undefined', function () {
      expect(this.app.isArray(undefined)).toBe(false);
    } );

    it( 'isTechnicalKey should return true for "__referrer"', function () {
      expect( this.app.isTechnicalKey( '__referrer' ) ).toBe( true );
    } );

    it( 'isTechnicalKey should return false for "event"', function () {
      expect( this.app.isTechnicalKey( 'event' ) ).toBe( false );
    } );

    it( 'isTechnicalKey should return false for undefined', function () {
      expect( this.app.isTechnicalKey( undefined ) ).toBe( false );
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


})();