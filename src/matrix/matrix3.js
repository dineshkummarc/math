/*jshint white: false, strict: false, plusplus: false, onevar: false,
  nomen: false */
/*global define: false, console: false, window: false, setTimeout: false */

define( function ( require ) {

    return function( FLOAT_ARRAY_TYPE ) {

        var matrix = require( './matrix' )( FLOAT_ARRAY_TYPE );

        var Matrix3 = function() {
            if( 0 === arguments.length ) {
                return matrix.$( 9, [0, 0, 0,
                                     0, 0, 0,
                                     0, 0, 0] );
            } else {
                return matrix.$( 9, arguments );
            }
        };

        var matrix3 = {
                
            $: Matrix3,

            add: function( ml, result ) {
                result = result || Matrix3();
                
                if (ml.length == 1) {
                    return ml[0];
                } else {
                    var temp = ml[0];
                    for (var i = 1; i < ml.length; ++ i) {
                        result = matrix.add(temp, ml[i], result);
                        temp = result;
                    }
                }
                return result;
            },

            subtract: function( ml, result ) {
                result = result || Matrix3();
                var temp = ml[0];
                
                if (ml.length == 1)
                    result = temp;
                else {
                    for (var i = 1; i < ml.length; ++ i) {
                        result = matrix.subtract(temp, ml[i], result);
                        temp = result;
                    }
                }
                return result;
            },

            clear: matrix.clear,

            equal: matrix.equal,

            determinant: function( m ) {

                return m[0]*(m[4]*m[8] - m[5]*m[7]) 
                       - m[1]*(m[3]*m[8] - m[5]*m[6]) 
                       + m[2]*(m[3]*m[7] - m[4]*m[6]);
            },
            
            inverse: function( m, result ) {
                var det = matrix3.determinant(m);
                if (det == 0)
                    throw 'matrix is singular';
                
                result = result || Matrix3();
                
                result[0] = (m[8]*m[4] - m[7]*m[5])/det;
                result[1] = -(m[8]*m[1] - m[7]*[2])/det;
                result[2] = (m[5]*m[1] - m[4]*m[2])/det;
                
                result[3] = -(m[8]*m[3] - m[6]*m[5])/det;
                result[4] = (m[8]*m[0] - m[6]*m[2])/det;
                result[5] = -(m[5]*m[0] - m[3]*m[2])/det;
                
                result[6] = (m[7]*m[3] - m[6]*m[4])/det;
                result[7] = -(m[7]*m[0] - m[6]*m[1])/det;
                result[8] = (m[4]*m[0] - m[3]*m[1])/det;

                return result;
            },
            
            multiply: function( ml, result ) {
                result = result || Matrix3();
                
                if (ml.length == 1)
                    return ml[0];
                else {

                    var temp = ml[0];
                    for (var i = 1; i < ml.length; ++ i) {

                        result[0] = temp[0]*ml[i][0] + temp[1]*ml[i][3] + temp[2]*ml[i][6];
                        result[1] = temp[0]*ml[i][1] + temp[1]*ml[i][4] + temp[2]*ml[i][7];
                        result[2] = temp[0]*ml[i][2] + temp[1]*ml[i][5] + temp[2]*ml[i][8];

                        result[3] = temp[3]*ml[i][0] + temp[4]*ml[i][3] + temp[5]*ml[i][6];
                        result[4] = temp[3]*ml[i][1] + temp[4]*ml[i][4] + temp[5]*ml[i][7];
                        result[5] = temp[3]*ml[i][2] + temp[4]*ml[i][5] + temp[5]*ml[i][8];

                        result[6] = temp[6]*ml[i][0] + temp[7]*ml[i][3] + temp[8]*ml[i][6];
                        result[7] = temp[6]*ml[i][1] + temp[7]*ml[i][4] + temp[8]*ml[i][7];
                        result[8] = temp[6]*ml[i][2] + temp[7]*ml[i][5] + temp[8]*ml[i][8];
                        
                        temp = result;
                    }
                }
                return result;
            },
            
            // Convert a vector rotation (in radians) to a 3x3 matrix
            rotate: function( v, result ) {
                var r = result || matrix3.identity;

                var sinA,
                    cosA;

                var ml;
                if( 0 !== v[2] ) {
                    sinA = Math.sin( v[2] );
                    cosA = Math.cos( v[2] );
                    ml = [];
                    ml.push(matrix3.$([ cosA, sinA, 0,
                                       -sinA, cosA, 0,
                                        0, 0, 1 ] ));
                    ml.push(matrix3.$(r));
                    
                    matrix3.multiply( ml, r );
                }

                if( 0 !== v[1] ) {
                    sinA = Math.sin( v[1] );
                    cosA = Math.cos( v[1] );
                    ml = [];
                    ml.push(matrix3.$([ cosA, 0, -sinA,
                                        0, 1, 0,
                                        sinA, 0, cosA ] ));
                    ml.push(matrix3.$(r));
                    
                    matrix3.multiply( ml, r );
                }

                if( 0 !== v[0] ) {
                    sinA = Math.sin( v[0] );
                    cosA = Math.cos( v[0] );
                    ml = [];
                    ml.push(matrix3.$([ 1, 0, 0,
                                        0, cosA, sinA,
                                        0, -sinA, cosA ] ));
                    ml.push(matrix3.$(r));
                    
                    matrix3.multiply( ml, r );
                }

                if( !result ) {
                    return r;
                }
            },

            transpose: function( m, result ) {
                result = result || Matrix3();

                var a01 = m[1], a02 = m[2], a12 = m[5];
                
                result[0] = m[0];
                result[1] = m[3];
                result[2] = m[6];
                result[3] = a01;
                result[4] = m[4];
                result[5] = m[7];
                result[6] = a02;
                result[7] = a12;
                result[8] = m[8];

                return result;
            }

        };
        
        Object.defineProperty( matrix3, 'zero', {
            get: function() {
                return Matrix3( [0, 0, 0,
                                 0, 0, 0,
                                 0, 0, 0] );
            },
            enumerable: true
        });
        
        Object.defineProperty( matrix3, 'one', {
            get: function() {
                return Matrix3( [1, 1, 1,
                                 1, 1, 1,
                                 1, 1, 1] );
            },
            enumerable: true
        });
        
        Object.defineProperty( matrix3, 'identity', {
            get: function() {
                return Matrix3( [1, 0, 0,
                                 0, 1, 0,
                                 0, 0, 1] );
            },
            enumerable: true
        });

        return matrix3;

    };

});