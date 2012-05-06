define(
    [],
    function() {
      return function( _Math ) {

        module( 'Vector4', {
          setup: function() {
            this.math = new _Math();
          },
          teardown: function() {
            this.math = null;
          }
        });

        test( 'basic', function() {
          expect( 6 );
          var math = this.math;

          var vec4 = new math.Vector4( [1, 2, 3, 4] );
          ok(
              vec4,
              'construct a Vector4 instance'
          );
          ok(
              vec4 instanceof math.ARRAY_TYPE,
              'vec3 is an instance of ARRAY_TYPE'
          );
          deepEqual(
              new math.ARRAY_TYPE( [1, 2, 3, 4] ),
              new math.Vector4( [1, 2, 3, 4] )
          );
          ok(
              4 === vec4.length,
              'vec4 has length 4'
          );
          ok(
              vec4[0] === 1 && vec4[1] === 2 && vec4[2] === 3 && vec4[3] === 4,
              'vec4 elements are [1, 2, 3, 4]'
          );

          // Test vector clear
          var vec1 = new math.Vector4( [17 , 22, 14, 2] );
          var vec3 = new math.Vector4( [0, 0, 0, 0] );
          math.vector4.clear(vec1);
          ok(
              math.vector4.equal( vec1, vec3 ),
              'vector.clear, set to [0,0,0, 0]'
          );

        });

        test( 'defaults', function() {
          expect( 1 );
          var math = this.math;

          deepEqual(
              new math.Vector4(),
              new math.Vector4( [0, 0, 0, 0] ),
              'default vector is the zero vector'
          );
        });

        test( 'constants', function() {
          expect( 6 );
          var math = this.math;

          math.vector4.x[0] = -0.88262;
          deepEqual(
              math.vector4.x,
              new math.Vector4( [1, 0, 0, 0] ),
              'Vector4.x'
          );
          math.vector4.y[1] = -22.998;
          deepEqual(
              math.vector4.y,
              new math.Vector4( [0, 1, 0, 0] ),
              'Vector4.y'
          );
          math.vector4.z[2] = 7635.22;
          deepEqual(
              math.vector4.z,
              new math.Vector4( [0, 0, 1, 0] ),
              'Vector4.y'
          );
          math.vector4.w[3] = -0.88262;
          deepEqual(
              math.vector4.w,
              new math.Vector4( [0, 0, 0, 1] ),
              'Vector4.y'
          );
          math.vector4.zero[3] = 7635.22;
          deepEqual(
              math.vector4.zero,
              new math.Vector4( [0, 0, 0, 0] ),
              'Vector4.zero'
          );
          math.vector4.one[0] = -0.88262;
          deepEqual(
              math.vector4.one,
              new math.Vector4( [1, 1, 1, 1] ),
              'Vector4.one'
          );
        });

        test( 'clone', function() {
          expect( 1 );
          var math = this.math;

          var vec1 = new math.Vector4( [0, 1, 3, 4] );
          deepEqual(
              new math.Vector4( vec1 ),
              vec1,
              'clone of vector is the same'
          );
        });

        test( 'equality', function() {
          expect( 3 );
          var math = this.math;

          var vec1 = new math.Vector4( [1, 1, 1, 1.00000000001] );
          var vec2 = new math.Vector4( [1, 1, 1, 1] );
          var vec3 = new math.Vector4( [2, 3, 4, 5] );

          ok(
              math.vector4.equal( vec1, vec2 ),
              'two identical vectors are equal'
          );
          ok(
              !math.vector4.equal( vec1, vec3 ),
              'two different vectors are not equal'
          );

          var vec4 = new math.Vector4( [2.000002, 3.000002, 4.000002, 5.000002] );
          deepEqual(
              math.vector4.equal( vec3, vec4 ),
              false,
              'e = 0.000001'
          );
        });

        test( 'length', function() {
          expect( 1 );
          var math = this.math;

          var vec1 = new math.Vector4( [1, 1, 1, 1] );
          ok(
              Math.sqrt( 4 ) === math.vector4.length( vec1 ),
              '|(1, 1, 1, 1)| = sqrt(4)'
          );
        });

        test( 'addition', function() {
          expect( 2 );
          var math = this.math;

          var vec1 = new math.Vector4( [1, 1, 1, 1] );
          var vec2 = new math.Vector4( [1, 1, 1, 1] );
          var vec3 = new math.Vector4( [2, 2, 2, 2] );

          ok(
              math.vector4.equal( vec3, math.vector4.add( vec1, vec2 ) ),
              '(1, 1, 1, 1) + (1, 1, 1, 1) = (2, 2, 2, 2)'
          );

          var test = math.vector4.add( vec1, vec2 );
          ok(
              math.vector4.equal( test, vec3 ),
              '(1, 1, 1, 1) += (2, 2, 2, 2)'
          );
        });

        test( 'subtraction', function() {
          expect( 2 );
          var math = this.math;

          var vec1 = new math.Vector4( [1, 1, 1, 1] );
          var vec2 = new math.Vector4( [1, 1, 1, 1] );
          var vec3 = new math.Vector4( [2, 2, 2, 2] );
          ok(
              math.vector4.equal( vec1, math.vector4.subtract( vec3, vec2 ) ),
              '(2, 2, 2, 2) - (1, 1, 1, 1) = (1, 1, 1, 1)'
          );

          var test = math.vector4.subtract( vec3, vec2 );
          ok(
              math.vector4.equal( vec1, test ),
              '(2, 2, 2, 2) -= (1, 1, 1, 1)'
          );
        });

        test( 'scalar multiplication', function() {
          expect( 2 );
          var math = this.math;

          var vec1 = new math.Vector4( [2, 3, 4, 5] );
          deepEqual(
              math.vector4.multiply( vec1, 2 ),
              new math.Vector4( [4, 6, 8, 10] ),
              '(2, 3, 4, 5) * 2 = (4, 6, 8, 10)'
          );

          var test = math.vector4.multiply( vec1, 3 );
          deepEqual(
              test,
              new math.Vector4( [6, 9, 12, 15] ),
              '(2, 3, 4, 5) * 3 = [6, 9, 12, 15]'
          );
        });

        test( 'dot product, normalize', function() {
          expect( 3 );
          var math = this.math;

          var vec1 = new math.Vector4( [12, -5, 7, 1] );
          var den = Math.sqrt(219);
          deepEqual(
              math.vector4.normalize( vec1 ),
              new math.Vector4( [(4*Math.sqrt(3/73)), (-5/den), (7/den), (1/den)] ),
              'normalize( [12, -5, 7, 1] ) = [(4*Math.sqrt(3/73)), (-5/den), (7/den), (1/den)]'
          );

          var vec2 = new math.Vector4( [10, 4, 2, -9] );
          var cond = math.vector4.dot( math.vector4.normalize( vec1 ), vec2 );
          deepEqual(
              Math.round ( cond * Math.pow(10,6) ),
              Math.round ( (35*Math.sqrt(3/73)) * Math.pow(10,6) ), // Correct to 6 digits
              ' [ (12/13), (-5/13) ] . [ 10, 4 ] = (100/13) '
          );

          // Normalized vector
          var isNormalized = new math.Vector4( [ 1/2, 1/2, 1/2, 1/2] );
          deepEqual (
              math.vector4.normalize( isNormalized ),
              isNormalized,
              'normalized vector is already normalized'
          );
        });

        test( 'angle', function() {
          expect( 2 );
          var math = this.math;

          var vec1 = new math.Vector4( [10, 8, 2, 7] );
          var vec2 = new math.Vector4( [6, 6, 1, -4] );

          var cond = math.vector4.angle( vec1, vec2 );
          var res = Math.acos(82/(Math.sqrt(19313)));
          deepEqual(
              Math.round ( cond * Math.pow(10,6) ),
              Math.round ( res * Math.pow(10,6) ), // Correct to 6 digits
              ' angle( vec1, vec2 ) = acos(82/(Math.sqrt(19313)))'
          );

          var vec3 = new math.Vector4( [1, 0, 0, 0] );
          var vec4 = new math.Vector4( [0, 0, 1, 0] );
          deepEqual(
              math.vector4.angle(vec3, vec4),
              (Math.PI/2),
              'right angle axis test = pi/2'
          );
        });

        test( 'set', function() {
          expect( 1 );
          var math = this.math;

          var v = new math.Vector4( 1, 2, 3, 4 );
          math.vector4.set( v, 4, 5, 6, 7 );
          ok( math.vector4.equal( v, [4, 5, 6, 7] ), 'v is set' );
        });

      };
    }
);
