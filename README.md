# aleaPRNG
Alea is a pseudo-random number generator (PRNG) created by Johannes Baagøe, released in 2010. It implements his variation on Marsaglia's Multiply-with-carry theme, adapted to javascript's quaint notion of numbers: the carries are exactly the integer parts of Numbers with exactly 32 bits of fractional part.

<br>&nbsp;<br>
Version 1.1<br>
Author: W. "Mac" McMeans<br>
Date: 29 APR 2020
<br>&nbsp;<br>


## Application:
Use this to quickly generate random numbers with good statistical properties. NOTE: This generator is not cryptographically secure. If you need a secure generator then consider <a href="https://github.com/macmcmeans/isaacCSPRNG">ISAAC</a> for your application; a fast, long-period generator and discrete message cipher.


## Dependencies:
Baagøe's Mash() hash function.
<br>&nbsp;<br>


## Period:
~2^116
<br>&nbsp;<br>


## Example usage:

```
// return an instance of the generator initialized internally with Window.crypto
> myRandomNumbers = aleaPRNG();


// return an instance of the generator initialized with specified seed
> myRandomNumbers = aleaPRNG( 'my', '3', 'seeds' );


// return a 32-bit fraction in the range [0, 1]
> myRandomNumbers();                              -->  0.30802189325913787


// advance the generator specified number of cycles
> myRandomNumbers.prng( 4 );


// return an unsigned random integer in the range [0, 2^32]
> myRandomNumbers.int32();                        -->  704896377


// return a 53-bit fraction in the range [0, 1]
> myRandomNumbers.double();                       -->  0.9397002613178349


// return 32-bit range (inclusive) //
// from -99 to 2.1275
> myRandomNumbers.range( -99, 2.1275 );           -->  -9.723206152322817

// parameter order does not matter
> myRandomNumbers.range( 100, -99 );              -->  43

// from 0 to 12345
> myRandomNumbers.range( 12345 );                 -->  9929


// reseed generator with a new value
> myRandomNumbers.seed( 'this is a new seed' );


> myRandomNumbers();                              -->  0.20963897299952805


// restart generator (reverts back to first specified seed)
> myRandomNumbers.restart();


// our first 32-bit fraction
> myRandomNumbers();                              -->  0.30802189325913787

```
<br>&nbsp;<br>


## REFS:
https://github.com/nquinlan/better-random-numbers-for-javascript-mirror/blob/master/support/js/Alea.js

https://web.archive.org/web/20111105142920/http://baagoe.com/en/RandomMusings/javascript/
<br>&nbsp;<br>


## Tested:
Google Chrome on Win 8.1 (x64)
Google Chrome on Win 10 (x64)
<br>&nbsp;<br>

## Version notes:
1.1 - 29 APR 2020
NEW: Refactor logic

* 1.0 - 23 JUL 2017
Initial release
<br>&nbsp;<br>

# License (BSD)
Copyright (c) 2017-2020, W. "Mac" McMeans<br>
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

3. Neither the name of copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
