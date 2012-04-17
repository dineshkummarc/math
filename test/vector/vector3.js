/*jshint white: false, strict: false, plusplus: false, onevar: false,
  nomen: false */
/*global gladius: false, document: false, window: false, module: false, start,
  test: false, expect: false, ok: false, notEqual: false, stop, QUnit: false */

define(function() {
  return function (_Math) {

    // Name of our module
    module( 'Vector3 Tests' );

    test( 'Basic', function() {
        var math = new _Math();
        expect( 6 );

        var vec3 = new math.Vector3( [1, 2, 3] );
        ok(
                vec3,
                'Construct a Vector3 instance'
        );
        ok(
                vec3 instanceof math.ARRAY_TYPE,
                'vec3 is an instance of ARRAY_TYPE'
        );
        deepEqual(
                new math.ARRAY_TYPE( [1, 2, 3] ),
                new math.Vector3( [1, 2, 3] )
        );
        ok(
                3 === vec3.length,
                'vec3 has length 3'
        );
        ok(
                vec3[0] === 1 && vec3[1] === 2 && vec3[2] === 3,
                'vec3 elements are [1, 2, 3]'
        );

        // Test vector clear
        var vec1 = new math.Vector3( [17 , 22, 14] );
        var vec4 = new math.Vector3( [0, 0, 0] );
        math.vector3.clear(vec1);
        ok(
                math.vector3.equal( vec1, vec4 ),
                'vector.clear, set to [0,0,0]'
        );

    });

    test( 'Defaults', function() {
        var math = new _Math();
        expect( 1 );

        deepEqual(
                new math.Vector3(),
                new math.Vector3( [0, 0, 0] ),
                'Default vector is the zero vector'
        );
    });

    test( 'Constants', function() {
        var math = new _Math();
        expect( 5 );

        math.vector3.x[0] = -0.88262;
        deepEqual(
                math.vector3.x,
                new math.Vector3( [1, 0, 0] ),
                'Vector3.x'
        );
        math.vector3.y[1] = 0.0000000000001;
        deepEqual(
                math.vector3.y,
                new math.Vector3( [0, 1, 0] ),
                'Vector3.y'
        );
        math.vector3.z[2] = -34;
        deepEqual(
                math.vector3.z,
                new math.Vector3( [0, 0, 1] ),
                'Vector3.y'
        );
        math.vector3.zero[1] = Math.sqrt(198);
        deepEqual(
                math.vector3.zero,
                new math.Vector3( [0, 0, 0] ),
                'Vector3.zero'
        );
        math.vector3.one[2] = -9982.22;
        deepEqual(
                math.vector3.one,
                new math.Vector3( [1, 1, 1] ),
                'Vector3.one'
        );
    });

    test( 'Clone', function() {
        var math = new _Math();
        expect( 1 );

        var vec1 = new math.Vector3( [0, 1, 3] );
        deepEqual(
                new math.Vector3( vec1 ),
                vec1,
                'Clone of vector is the same'
        );
    });

    test( 'Equality', function() {
        var math = new _Math();
        expect( 3 );

        var vec1 = new math.Vector3( [1, 1, 1.00000000001] );
        var vec2 = new math.Vector3( [1, 1, 1] );
        var vec3 = new math.Vector3( [2, 3, 4] );

        ok(
                math.vector3.equal( vec1, vec2 ),
                'Two identical vectors are equal'
        );
        ok(
                !math.vector3.equal( vec1, vec3 ),
                'Two different vectors are not equal'
        );

        var vec4 = new math.Vector3( [2.000002, 3.000002, 4.000002] );
        deepEqual(
                math.vector3.equal( vec3, vec4 ),
                false,
                'e = 0.000001'
        );
    });

    test( 'Length', function() {
        var math = new _Math();
        expect( 2 );

        var vec1 = new math.Vector3( [1, 1, 1] );
        ok(
                Math.sqrt( 3 ) === math.vector3.length( vec1 ),
                '|(1, 1, 1)| = sqrt(3)'
        );

        var vec2 = new math.Vector3( [2, 4, 1] );
        deepEqual(
                math.vector3.length( vec2 ),
                Math.sqrt(21),
                '|(2, 4, 2)| = sqrt(21)'
        );
    });

    test( 'Addition', function() {
        var math = new _Math();
        expect( 2 );

        var vec1 = new math.Vector3( [1, 1, 1] );
        var vec2 = new math.Vector3( [1, 1, 1] );
        var vec3 = new math.Vector3( [2, 2, 2] );

        ok(
                math.vector3.equal( vec3, math.vector3.add( vec1, vec2 ) ),
                '(1, 1, 1) + (1, 1, 1) = (2, 2, 2)'
        );

        var test = math.vector3.add( vec1, vec2 );
        ok(
                math.vector3.equal( test, vec3 ),
                '(1, 1, 1) += (2, 2, 2)'
        );
    });

    test( 'Subtraction', function() {
        var math = new _Math();
        expect( 2 );

        var vec1 = new math.Vector3( [1, 1, 1] );
        var vec2 = new math.Vector3( [1, 1, 1] );
        var vec3 = new math.Vector3( [2, 2, 2] );
        ok(
                math.vector3.equal( vec1, math.vector3.subtract( vec3, vec2 ) ),
                '(2, 2, 2) - (1, 1, 1) = (1, 1, 1)'
        );

        var test = math.vector3.subtract( vec3, vec2 );
        ok(
                math.vector3.equal( vec1, test ),
                '(2, 2, 2) -= (1, 1, 1)'
        );
    });

    test( 'Scalar multiplication', function() {
        var math = new _Math();
        expect( 2 );

        var vec1 = new math.Vector3( [2, 3, 4] );
        deepEqual(
                math.vector3.multiply( vec1, 2 ),
                new math.Vector3( [4, 6, 8] ),
                '(2, 3, 4) * 2 = (4, 6, 8)'
        );

        var test = math.vector3.multiply( vec1, 3 );
        deepEqual(
                test,
                new math.Vector3( [6, 9, 12] ),
                '(2, 3, 4) * 3 = [6, 9, 12]'
        );
    });

    test( 'Cross Product', function() {
        var math = new _Math();
        expect (1);

        var vec1 = new math.Vector3( [3, -3, 2] );
        var vec2 = new math.Vector3( [-12, 12, -4] );
        deepEqual(
                math.vector3.cross( vec1, vec2 ),
                new math.Vector3( [-12, -12, 0] ),
                '[3, -3, 1] X [-12, 12, -4] = [0, 0, 0]'
        );
    });

    test( 'Dot Product / Normalize', function() {
        var math = new _Math();
        expect( 3 );

        var vec1 = new math.Vector3( [12, -5, 7] );
        var den = Math.sqrt(218);
        deepEqual(
                math.vector3.normalize( vec1 ),
                new math.Vector3( [(6*(Math.sqrt(2/109))), (-5/den), (7/den)] ),
                'normalize( [12, -5, 7] ) = [(6*(Math.sqrt(2/109))), (-5/den), (7/den)]'
        );

        var vec2 = new math.Vector3( [10, 4, 2] );
        var cond = math.vector3.dot( math.vector3.normalize( vec1 ), vec2 );
        deepEqual(
                Math.round ( cond * Math.pow(10,6) ),
                Math.round ( (57 * Math.sqrt(2/109)) * Math.pow(10,6) ), // Correct to 6 digits
                ' [(6*sqrt(2/109), -5/sqrt(218), 7/sqrt(218))] . [ 10, 4, 2 ] = (57 * Math.sqrt(2/109)) '
        );

        // Normalized vector
        var isNormalized = new math.Vector3( [ 1/Math.sqrt(3), 1/Math.sqrt(3),  1/Math.sqrt(3)] );
        deepEqual (
                math.vector3.normalize( isNormalized ),
                isNormalized,
                'Normalized vector is already normalized'
        );
    });

    test( 'Angle()', function() {
        var math = new _Math();
        expect( 2 );

        var vec1 = new math.Vector3( [10, 8, 2] );
        var vec2 = new math.Vector3( [6, 6, 1] );

        var cond = math.vector3.angle( vec1, vec2 );
        var res = Math.acos(55/(Math.sqrt(3066)));
        deepEqual(
                Math.round ( cond * Math.pow(10,6) ),
                Math.round ( res * Math.pow(10,6) ), // Correct to 6 digits
                ' angle( vec1, vec2 ) = acos(55/(Math.sqrt(3066)))'
        );

        var vec3 = new math.Vector3( [1, 0, 0] );
        var vec4 = new math.Vector3( [0, 0, 1] );
        deepEqual(
                math.vector3.angle(vec3, vec4),
                (Math.PI/2),
                ' Right angle axis test = pi/2'
        );
    });

    test( 'set()', function() {
        var math = new _Math();
        expect( 1 );

        var v = new math.Vector3( 1, 2, 3 );
        math.vector3.set( v, 4, 5, 6 );
        ok( math.vector3.equal( v, [4, 5, 6] ), 'v is set' );
    });
  };
});
