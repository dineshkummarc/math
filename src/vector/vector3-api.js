define( function ( require ) {

  return function( FLOAT_ARRAY_TYPE ) {

    var notImplemented = require( "common/not-implemented" );
    var V3 = require( "vector/v3" )( FLOAT_ARRAY_TYPE );

    function add( v1, v2, result ) {
      if( result === v1 ) {
        v1[0] += v2[0];
        v1[1] += v2[1];
        v1[2] += v2[2];
        return;
      }

      if( undefined === result ) {
        result = new V3( v1[0] + v2[0], 
          v1[1] + v2[1], v1[2] + v2[2] );
        return result;
      } else {
        result[0] = v1[0] + v2[0];
        result[1] = v1[1] + v2[1];
        result[2] = v1[2] + v2[2];
        return;
      }
    }

    function angle( v1, v2 ) {
      return Math.acos(
        (v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2]) /
        (Math.sqrt(v1[0] * v1[0] + v1[1] * v1[1] + v1[2] * v1[2]) *
          Math.sqrt(v2[0] * v2[0] + v2[1] * v2[1] + v2[2] * v2[2]) ) );
    }

    function clear( v ) {
      v[0] = 0;
      v[1] = 0;
      v[2] = 0;

      return v;
    }

    function cross( v1, v2, result ) {
      result = result || V3();

      result[0] = (v1[1] * v2[2]) - (v2[1] * v1[2]);
      result[1] = (v1[2] * v2[0]) - (v2[2] * v1[0]);
      result[2] = (v1[0] * v2[1]) - (v2[0] * v1[1]);

      return result;
    }

    function dot( v1, v2 ) {
      return v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2];
    }

    function equal( v1, v2, e ) {
      e = e || 0.000001;

      if( v1.length != v2.length ) {
          return false;
      }
      
      if( Math.abs( v1[0] - v2[0] ) > e ||
          Math.abs( v1[1] - v2[1] ) > e ||
          Math.abs( v1[2] - v2[2] ) > e ) {
          return false;
      }

      return true;
    }

    function length( v ) {
      var r = 0;
      
      r += v[0] * v[0];
      r += v[1] * v[1];
      r += v[2] * v[2];
      
      return Math.sqrt( r );      
    }

    function multiply( v, s, result ) {
      result = result || new V3();
      
      result[0] = s * v[0];
      result[1] = s * v[1];
      result[2] = s * v[2];
      
      return result;      
    }

    function negate( v, result ) {
      result = result || new V3();
      
      result[0] = -1 * v[0];
      result[1] = -1 * v[1];
      result[2] = -1 * v[2];
      
      return result;      
    }

    function normalize( v, result ) {
      result = result || new V3();
      var l = length( v );
      
      result[0] = v[0]/l;
      result[1] = v[1]/l;
      result[2] = v[2]/l;
      
      return result;      
    }

    function set( v ) {
      if( 3 === arguments.length ) {
          v[0] = arguments[1][0];
          v[1] = arguments[1][1];
          v[2] = arguments[1][2];
      } else {
          v[0] = arguments[1];
          v[1] = arguments[2];
          v[2] = arguments[3];
      }
     
      return v;      
    }

    function subtract( v1, v2, result ) {
      result = result || new V3();
      
      result[0] = v1[0] - v2[0];
      result[1] = v1[1] - v2[1];
      result[2] = v1[2] - v2[2];
      
      return result;
    }

    var vector3 = {  
      add: add,
      angle: angle,
      clear: clear,
      cross: cross,
      distance: notImplemented,
      dot: dot,
      equal: equal,
      length: length,
      multiply: multiply,
      negate: negate,
      normal: cross,
      normalize: normalize,
      set: set,
      subtract: subtract
    };
    
    return vector3;

  };

});