define( function ( require ) {

  return function( FLOAT_ARRAY_TYPE ) {
    
    var notImplemented = require( "common/not-implemented" );
    var M4 = require( "matrix/m4" );
    var transform = require( "matrix/transform-api" );
    var matrix4 = require( "matrix/matrix-api" );

        function getView( index ) {
      return this._views[index];
    }

    function getValue( index ) {
      return this.buffer[index];
    }

    function setValue( index, value ) {
      this.buffer[index] = value;
      this.matrix.modified = true;
    }

    function updateViews() {
      var i;
      for( i = 0; i < 4; ++ i ) {
        this._views[i] = new TransformView( this, this.buffer, 
          i*4, (i+1)*4 );
      }
    }

    var TransformView = function( matrix, buffer, start, end ) {
      this.matrix = matrix;
      this.buffer = buffer.subarray( start, end );

      Object.defineProperties( this, {
        "0": {
          get: getValue.bind( this, 0 ),
          set: setValue.bind( this, 0 )
        },
        "1": {
          get: getValue.bind( this, 1 ),
          set: setValue.bind( this, 1 )
        },
        "2": {
          get: getValue.bind( this, 2 ),
          set: setValue.bind( this, 2 )
        },
        "3": {
          get: getValue.bind( this, 3 ),
          set: setValue.bind( this, 3 )
        }        
      });
    };

    var Transform = function( arg1, arg2, arg3 ) {
      var argc = arguments.length;
      if( 1 === argc ) {
        if( arg1 instanceof Transform ) {
          this.buffer = new M4( arg1.buffer );
        } else {
          this.buffer = new M4( arg1 );
        }
      } else if( 3 === argc ) {
        this.buffer = transform.fixed( arg1, arg2, arg3 );
      } else {
        this.buffer = new M4();
      }

      Object.defineProperties( this, {
        "0": {
          get: getView.bind( this, 0 )
        },
        "1": {
          get: getView.bind( this, 1 )
        },
        "2": {
          get: getView.bind( this, 2 )
        },
        "3": {
          get: getView.bind( this, 3 )
        },
      });

      this._views = [];

      updateViews.call( this );

      this.modified = true;
    };

    function clone( t ) {
      return new Transform( this );
    }

    function multiply( arg, result ) {
      var other;
      if( arg instanceof Matrix4 ||
          arg instanceof Transform ) {        
        other = arg.buffer;
      } else {
        other = arg;
      }

      result = result || this;
      matrix4.multiply( this.buffer, other, result.buffer );
      result.modified = true;

      return this;
    }

    function rotate( v, result ) {
      var rotation = transform.rotate( v );

      result = result || this;
      matrix4.multiply( this.buffer, rotation, result.buffer );
      result.modified = true;

      return this;
    }

    function scale( v, result ) {
      var scale = transform.scale( v );

      result = result || this;
      matrix4.multiply( this.buffer, scale, result.buffer );
      result.modified = true;

      return this;
    }

    function translate( v, result ) {
      var translation = transform.translate( v );

      result = result || this;
      matrix4.multiply( this.buffer, translation, result.buffer );
      result.modified = true;

      return this;
    }

    Transform.prototype = {
      clone: clone,
      multiply: multiply,
      rotate: rotate,
      scale: scale,
      translate: translate
    };

    return Transform;

  };

});