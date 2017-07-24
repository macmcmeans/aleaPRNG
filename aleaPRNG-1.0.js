/*///////////////////////////////////////////////////////////////////////////////////////////////////
aleaPRNG 1.0
/////////////////////////////////////////////////////////////////////////////////////////////////////
https://github.com/macmcmeans/isaacCSPRNG/blob/master/isaacCSPRNG-1.0.js
/////////////////////////////////////////////////////////////////////////////////////////////////////
Original work copyright © 2010 Johannes Baagøe, under MIT license

This is a derivative work copyright (c) 2017, William P. "Mac" McMeans, under BSD license.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
///////////////////////////////////////////////////////////////////////////////////////////////////*/
function aleaPRNG() {
    return( function( args ) {
        "use strict";

        var s0
            , s1
            , s2
            , c
            , uinta = new Uint32Array( 3 )
            , initialArguments
        ;

        /* private: initializes generator with specified seed */
        function _initState( _internalSeed ) {
            var mash = Mash();
            
            s0 = mash( ' ' );
            s1 = mash( ' ' );
            s2 = mash( ' ' );

            c = 1;

            for( var i = 0; i < _internalSeed.length; i++ ) {
                s0 -= mash( _internalSeed[ i ] );
                if( s0 < 0 ) { s0 += 1; }

                s1 -= mash( _internalSeed[ i ] );
                if( s1 < 0 ) { s1 += 1; }
                
                s2 -= mash( _internalSeed[ i ] );
                if( s2 < 0 ) { s2 += 1; }
            }

            mash = null;
        };

        /* private: check if number is integer */
        function _isInteger( _int ) { 
            return parseInt( _int ) === _int; 
        };

        /* public: return a 32-bit fraction in the range [0, 1] */
        var random = function() {
            var t = 2091639 * s0 + c * 2.3283064365386963e-10; // 2^-32
            
            s0 = s1;
            s1 = s2;

            return s2 = t - ( c = t | 0 );
        };

        /* public: return a 53-bit fraction in the range [0, 1] */
        random.double = function() {
            return random() + ( random() * 0x200000 | 0 ) * 1.1102230246251565e-16; // 2^-53
        };

        /* public: return an unsigned random integer in the range [0, 2^32] */
        random.int32 = function() {
            return random() * 0x100000000; // 2^32
        };

        /* public: advance the generator the specified amount of cycles */
        random.prng = function( _run ) {
            for( var i = 0; i < _run; i++ ) { random(); }
        };

        /* public: return inclusive range */
        random.range = function() { 
            var loBound
                , hiBound
            ;
            
            if( arguments.length === 1 ) {
                loBound = 0;
                hiBound = arguments[ 0 ];

            } else {
                loBound = arguments[ 0 ];
                hiBound = arguments[ 1 ];
            }

            if( arguments[ 0 ] > arguments[ 1 ] ) { 
                loBound = arguments[ 1 ];
                hiBound = arguments[ 0 ];
            }

            // return integer
            if( _isInteger( loBound ) && _isInteger( hiBound ) ) { 
                return Math.floor( random() * ( hiBound - loBound + 1 ) ) + loBound; 

            // return float
            } else {
                return random() * ( hiBound - loBound ) + loBound; 
            }
        };

        /* public: initialize generator to first specified seed values */
        random.restart = function() {
            _initState( initialArguments );
        };

        /* public: seeding function */
        random.seed = function() { 
            _initState( Array.prototype.slice.call( arguments ) );
        }; 

        if( args.length === 0 ) {
             window.crypto.getRandomValues( uinta );
             args = [ uinta[ 0 ], uinta[ 1 ], uinta[ 2 ] ];
        };

        initialArguments = args;

        _initState( args );

        return random;

    })( Array.prototype.slice.call( arguments ) );
};

function Mash() {
    var n = 0xefc8249d;

    var mash = function( data ) {
        data = data.toString();
        for( var i = 0, l = data.length; i < l; i++ ) {
            n += data.charCodeAt( i );
            var h = 0.02519603282416938 * n;
            n = h >>> 0;
            h -= n;
            h *= n;
            n = h >>> 0;
            h -= n;
            n += h * 0x100000000; // 2^32
        }
        return ( n >>> 0 ) * 2.3283064365386963e-10; // 2^-32
    };

    return mash;
};
