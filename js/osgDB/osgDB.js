/*global define */

define( [
    'osg/Notify',
    'osg/Utils',
    'vendors/Q',
    'osg/Texture',
    'osg/Uniform',
    'osg/BlendFunc',
    'osg/Material',
    'osg/Geometry',
    'osg/BufferArray',
    'osg/PrimitiveSet',
    'osg/DrawArrays',
    'osg/DrawElements',
    'osg/StateSet',
    'osg/Node',
    'osg/Matrix',
    'osg/MatrixTransform',
    'osg/Projection',
    'osgDB/Input'
], function ( Notify, MACROUTILS, Q, Texture, Uniform, BlendFunc, Material, Geometry, BufferArray, PrimitiveSet, DrawArrays, DrawElements, StateSet, Node, Matrix, MatrixTransform, Projection, Input ) {


    /** -*- compile-command: 'jslint-cli osgDB.js' -*-
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

    var osgDB = {};
    osgDB.Input = Input;

    osgDB.ObjectWrapper = {};
    osgDB.ObjectWrapper.serializers = {};

    osgDB.readImage = function ( url, options ) {
        return osgDB.registry().readImageURL( url, options );
    };
    osgDB.readImageURL = osgDB.readImage; // alias

    osgDB.readNodeURL = function ( url, options ) {
        return osgDB.registry().readNodeURL( url, options );
    };

    osgDB.registry = function () {
        if ( osgDB.registry._input === undefined ) {
            osgDB.registry._input = new Input();
        }
        return osgDB.registry._input;
    };

    // stop on input with options
    // how we transfer options from registry to serializer


    osgDB.parseSceneGraph = function ( node, options ) {
        if ( node.Version !== undefined && node.Version > 0 ) {

            var getPropertyValue = function ( o ) {
                var props = Object.keys( o );
                for ( var i = 0, l = props.length; i < l; i++ ) {
                    if ( props[ i ] !== 'Generator' && props[ i ] !== 'Version' ) {
                        return props[ i ];
                    }
                }
                return undefined;
            };

            var key = getPropertyValue( node );
            if ( key ) {
                var obj = {};
                obj[ key ] = node[ key ];
                var input = new Input( obj );
                input.setImageLoadingOptions( osgDB.registry().getImageLoadingOptions() );
                if ( options !== undefined ) {
                    input.setProgressXHRCallback( options.progressXHRCallback );
                    input.setPrefixURL( options.prefixURL );
                }
                return input.readObject();
                //return osgDB.ObjectWrapper.readObject(obj);
            } else {
                Notify.log( 'can\'t parse scenegraph ' + node );
            }
        } else {
            return osgDB.parseSceneGraph_deprecated( node );
        }
    };
    osgDB.parseSceneGraph_deprecated = function ( node ) {
        var getFieldBackwardCompatible = function ( field, json ) {
            var value = json[ field ];
            if ( value === undefined ) {
                value = json[ field.toLowerCase() ];
            }
            return value;
        };
        var setName = function ( osgjs, json ) {
            var name = getFieldBackwardCompatible( 'Name', json );
            if ( name && osgjs.setName !== undefined ) {
                osgjs.setName( name );
            }
        };

        var setMaterial = function ( osgjs, json ) {
            setName( osgjs, json );
            osgjs.setAmbient( getFieldBackwardCompatible( 'Ambient', json ) );
            osgjs.setDiffuse( getFieldBackwardCompatible( 'Diffuse', json ) );
            osgjs.setEmission( getFieldBackwardCompatible( 'Emission', json ) );
            osgjs.setSpecular( getFieldBackwardCompatible( 'Specular', json ) );
            osgjs.setShininess( getFieldBackwardCompatible( 'Shininess', json ) );
        };

        var setBlendFunc = function ( osgjs, json ) {
            setName( osgjs, json );
            osgjs.setSourceRGB( json.SourceRGB );
            osgjs.setSourceAlpha( json.SourceAlpha );
            osgjs.setDestinationRGB( json.DestinationRGB );
            osgjs.setDestinationAlpha( json.DestinationAlpha );
        };

        var setTexture = function ( osgjs, json ) {
            var magFilter = json.MagFilter || json.mag_filter || undefined;
            if ( magFilter ) {
                osgjs.setMagFilter( magFilter );
            }
            var minFilter = json.MinFilter || json.min_filter || undefined;
            if ( minFilter ) {
                osgjs.setMinFilter( minFilter );
            }
            var wrapT = json.WrapT || json.wrap_t || undefined;
            if ( wrapT ) {
                osgjs.setWrapT( wrapT );
            }
            var wrapS = json.WrapS || json.wrap_s || undefined;
            if ( wrapS ) {
                osgjs.setWrapS( wrapS );
            }
            var file = getFieldBackwardCompatible( 'File', json );
            Q.when( osgDB.readImage( file ) ).then(
                function ( img ) {
                    osgjs.setImage( img );
                } );
        };

        var setStateSet = function ( osgjs, json ) {
            setName( osgjs, json );
            var textures = getFieldBackwardCompatible( 'Textures', json ) || getFieldBackwardCompatible( 'TextureAttributeList', json ) || undefined;
            if ( textures ) {
                for ( var t = 0, tl = textures.length; t < tl; t++ ) {
                    var file = getFieldBackwardCompatible( 'File', textures[ t ] );
                    if ( !file ) {
                        Notify.log( 'no texture on unit ' + t + ' skip it' );
                        continue;
                    }
                    var tex = new Texture();
                    setTexture( tex, textures[ t ] );

                    osgjs.setTextureAttributeAndMode( t, tex );
                    osgjs.addUniform( Uniform.createInt1( t, 'Texture' + t ) );
                }
            }

            var blendfunc = getFieldBackwardCompatible( 'BlendFunc', json );
            if ( blendfunc ) {
                var newblendfunc = new BlendFunc();
                setBlendFunc( newblendfunc, blendfunc );
                osgjs.setAttributeAndMode( newblendfunc );
            }

            var material = getFieldBackwardCompatible( 'Material', json );
            if ( material ) {
                var newmaterial = new Material();
                setMaterial( newmaterial, material );
                osgjs.setAttributeAndMode( newmaterial );
            }
        };


        var newnode;
        var children = node.children;
        var primitives = node.primitives || node.Primitives || undefined;
        var attributes = node.attributes || node.Attributes || undefined;
        if ( primitives || attributes ) {
            newnode = new Geometry();

            setName( newnode, node );

            MACROUTILS.extend( newnode, node ); // we should not do that
            node = newnode;
            node.primitives = primitives; // we should not do that
            node.attributes = attributes; // we should not do that

            var i;
            for ( var p = 0, lp = primitives.length; p < lp; p++ ) {
                var mode = primitives[ p ].mode;
                if ( primitives[ p ].indices ) {
                    var array = primitives[ p ].indices;
                    array = new BufferArray( BufferArray[ array.type ], array.elements, array.itemSize );
                    if ( !mode ) {
                        mode = gl.TRIANGLES;
                    } else {
                        mode = PrimitiveSet[ mode ];
                    }
                    primitives[ p ] = new DrawElements( mode, array );
                } else {
                    mode = gl[ mode ];
                    var first = primitives[ p ].first;
                    var count = primitives[ p ].count;
                    primitives[ p ] = new DrawArrays( mode, first, count );
                }
            }

            for ( var key in attributes ) {
                if ( attributes.hasOwnProperty( key ) ) {
                    var attributeArray = attributes[ key ];
                    attributes[ key ] = new BufferArray( gl[ attributeArray.type ], attributeArray.elements, attributeArray.itemSize );
                }
            }
        }

        var stateset = getFieldBackwardCompatible( 'StateSet', node );
        if ( stateset ) {
            var newstateset = new StateSet();
            setStateSet( newstateset, stateset );
            node.stateset = newstateset;
        }

        var matrix = node.matrix || node.Matrix || undefined;
        if ( matrix ) {
            newnode = new MatrixTransform();
            setName( newnode, node );

            MACROUTILS.extend( newnode, node );
            newnode.setMatrix( Matrix.copy( matrix ) );
            node = newnode;
        }

        var projection = node.projection || node.Projection || undefined;
        if ( projection ) {
            newnode = new Projection();
            setName( newnode, node );
            MACROUTILS.extend( newnode, node );
            newnode.setProjectionMatrix( Matrix.copy( projection ) );
            node = newnode;
        }

        // default type
        if ( node.objectType === undefined ) {
            newnode = new Node();
            setName( newnode, node );
            MACROUTILS.extend( newnode, node );
            node = newnode;
        }


        if ( children ) {
            // disable children, it will be processed in the end
            node.children = [];

            for ( var child = 0, childLength = children.length; child < childLength; child++ ) {
                node.addChild( osgDB.parseSceneGraph_deprecated( children[ child ] ) );
            }
        }

        return node;
    };

    return osgDB;
} );