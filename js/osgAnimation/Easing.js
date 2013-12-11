/*global define */

define( [], function () {

	/** -*- compile-command: "jslint-cli osgAnimation.js" -*-
	 *
	 *  Copyright (C) 2010 Cedric Pinson
	 *
	 *                  GNU LESSER GENERAL PUBLIC LICENSE
	 *                      Version 3, 29 June 2007
	 *
	 * Copyright (C) 2007 Free Software Foundation, Inc. <http://fsf.org/>
	 * Everyone is permitted to copy and distribute verbatim copies
	 * of this license document, but changing it is not allowed.
	 *
	 * This version of the GNU Lesser General Public License incorporates
	 * the terms and conditions of version 3 of the GNU General Public
	 * License
	 *
	 * Authors:
	 *  Cedric Pinson <cedric.pinson@plopbyte.com>
	 *
	 */

	var easeOutQuad = function ( t ) {
		return -( t * ( t - 2.0 ) );
	};
	var easeInQuad = function ( t ) {
		return ( t * t );
	};
	var easeOutCubic = function ( t ) {
		t = t - 1.0;
		return ( t * t * t + 1 );
	};
	var easeInCubic = function ( t ) {
		return ( t * t * t );
	};
	var easeOutQuart = function ( t ) {
		t = t - 1;
		return -( t * t * t * t - 1 );
	};
	var easeInQuart = function ( t ) {
		return ( t * t * t * t );
	};
	var easeOutElastic = function ( t ) {
		return Math.pow( 2.0, -10.0 * t ) * Math.sin( ( t - 0.3 / 4.0 ) * ( 2.0 * Math.PI ) / 0.3 ) + 1.0;
	};
	//osgAnimation.EaseInElastic = function(t) { return ; };
	var easeOutBounce = function ( t ) {
		if ( t < ( 1 / 2.75 ) ) {
			return ( 7.5625 * t * t );
		} else if ( t < ( 2 / 2.75 ) ) {
			return ( 7.5625 * ( t -= ( 1.5 / 2.75 ) ) * t + 0.75 );
		} else if ( t < ( 2.5 / 2.75 ) ) {
			return ( 7.5625 * ( t -= ( 2.25 / 2.75 ) ) * t + 0.9375 );
		} else {
			return ( 7.5625 * ( t -= ( 2.625 / 2.75 ) ) * t + 0.984375 );
		}
	};

	return {
		easeOutQuad: easeOutQuad,
		easeInQuad: easeInQuad,
		easeOutCubic: easeOutCubic,
		easeInCubic: easeInCubic,
		easeOutQuart: easeOutQuart,
		easeInQuart: easeInQuart,
		easeOutElastic: easeOutElastic,
		easeOutBounce: easeOutBounce
	};
} );