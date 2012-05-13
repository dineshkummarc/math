define( function ( require ) {

  var constants = require( "constants" );

  var V2 = require( "vector/v2" );
  var Vector2 = require( "vector/vector2" );
  var vector2 = require( "vector/vector2-api" );

  var V3 = require( "vector/v3" );
  var Vector3 = require( "vector/vector3" );
  var vector3 = require( "vector/vector3-api" );

  function extend( object, extra ) {
    for ( var prop in extra ) {
      if ( !object.hasOwnProperty( prop ) && extra.hasOwnProperty( prop ) ) {
        object[prop] = extra[prop];
      }
    }
  }

  var _Math = function( options ) {
    var FLOAT_ARRAY_ENUM = {
        Float32: Float32Array,
        Float64: Float64Array
    };
    this.FLOAT_ARRAY_ENUM = FLOAT_ARRAY_ENUM;

    var ARRAY_TYPE = this.ARRAY_TYPE = FLOAT_ARRAY_ENUM.Float32;

    extend( this, constants );
    extend( this, {
      V2: V2( ARRAY_TYPE ),
      Vector2: Vector2( ARRAY_TYPE ),
      vector2: vector2( ARRAY_TYPE )
    });
    extend( this, {
      V3: V3( ARRAY_TYPE ),
      Vector3: Vector3( ARRAY_TYPE ),
      vector3: vector3( ARRAY_TYPE )
    });
  };

  return new _Math();

});