/*"use strict";

*/
var rtgEventHandler = function() {
    var DATA_CONTAINER_PROP = '_rutarget',
      NO_SYNC = 'rtgNoSync',
      KEY_LOCATION = '__location',
      KEY_REFERRER = '__referrer',
      KEY_TITLE = '__title',
      KEY_KEYWORDS = '__keywords',
      KEY_VISITOR_TZ = '_usertz';
    
    this.init = function() {
        var dataContainer = window[DATA_CONTAINER_PROP];
        if (this.isArray(dataContainer)) {
          this.createRequest( dataContainer );
        }

        dataContainer = [];

        var push = dataContainer.push;
        dataContainer.push = function () {
            push.apply(dataContainer, arguments);
            this.createRequest(dataContainer);
        };

        window[DATA_CONTAINER_PROP] = dataContainer;
    }

    this.isArray = function(arr) {
        return !!arr && '[object Array]' === Object.prototype.toString.call(arr);
    }

    this.isTechnicalKey = function( key ) {
      return KEY_LOCATION === key || KEY_REFERRER === key || KEY_TITLE === key || KEY_KEYWORDS === key || KEY_VISITOR_TZ === key;
    }

    this.keywords = function() {
      var metaElement = document.getElementsByTagName( 'meta' ),
              result = [];
      for ( var i = 0, len = metaElement.length; i < len; i++ ) {
        var name = metaElement[i].name;
        if ( name && 'keywords' === name.toLowerCase() ) {
          result.push( metaElement[i].content );
        }
      }
      return result.join( ',' );
    }

    this.appendParam = function(name, value, result) {
        if (typeof value !== 'undefined') {
            result.push(name + '=' + encodeURIComponent(value));
        }
    }

    this.addEventValue = function( name, stringOrArray, parameters ) {
      if ( this.isArray( stringOrArray ) ) {
        for ( var i = 0, len = stringOrArray.length; i < len; i++ ) {
          var item = stringOrArray[i];
          for ( var attr in item ) {
            if ( item.hasOwnProperty( attr ) ) {
              this.appendParam( name + '__' + attr, item[attr], parameters );
            }
          }
        }
      } else {
        this.appendParam( name, stringOrArray, parameters );
      }
    }

    this.createRequest = function( dataContainer ) {
      main_loop: for ( var i = 0, len = dataContainer.length; i < len; i++ ) {
        var parameters = [];
        var item = dataContainer[i];
        for ( var key in item ) {
          if ( item.hasOwnProperty( key ) ) {
            if ( key == 'event' && ( item[key] == 'gtm.js' || item[key] == 'gtm.dom' || item[key] == 'gtm.load' ) ) {
              continue main_loop;
            }
            if ( !this.isTechnicalKey( key ) ) {
              this.addEventValue( key, item[key], parameters );
            }
          }
        }

        if ( parameters.length > 0 ) {
          if ( window[NO_SYNC] ) {
            this.appendParam( 'nosync', true, parameters );
          }
          this.appendParam( KEY_LOCATION, window.location.href, parameters );
          this.appendParam( KEY_REFERRER, document.referrer, parameters );
          this.appendParam( KEY_TITLE, document.title, parameters );
          this.appendParam( KEY_KEYWORDS, keywords(), parameters );
          this.appendParam( KEY_VISITOR_TZ, -( new Date() ).getTimezoneOffset(), parameters );
          this.appendParam( '__r', parseInt( Math.random() * 99999999, 10 ), parameters );
          
          this.sendRequest( parameters );
        }
      }
      dataContainer.length = 0;
    }

    this.sendRequest = function(parameters) {
        if (document.body) {
            var img = document.createElement('img');
            img.width = 1;
            img.height = 1;
            img.style.display = 'none';
            img.src = (document.location.protocol == 'https:' ? 'https' : 'http') + '://tag.rutarget.ru/tag?' + parameters.join('&');
            document.body.insertBefore(img, document.body.firstChild);
        } else {
            setTimeout(function () {
                sendRequest(parameters);
            }, 100);
        }
    }    
}

(function () {    
    var app = new rtgEventHandler();
    app.init();
})();