/** -*- compile-command: 'jslint-cli osg.js' -*- */

define( [
    'osg/BlendColor',
    'osg/BlendFunc',
    'osg/BoundingBox',
    'osg/BoundingSphere',
    'osg/BufferArray',
    'osg/Camera',
    'osg/ComputeMatrixFromNodePath',
    'osg/CullFace',
    'osg/CullSettings',
    'osg/CullStack',
    'osg/CullVisitor',
    'osg/Depth',
    'osg/DrawArrayLengths',
    'osg/DrawArrays',
    'osg/DrawElements',
    'osg/EllipsoidModel',
    'osg/FrameBufferObject',
    'osg/FrameStamp',
    'osg/Geometry',
    'osg/Image',
    'osg/Light',
    'osg/LightSource',
    'osg/LineWidth',
    'osg/Material',
    'osg/Math',
    'osg/Matrix',
    'osg/MatrixTransform',
    'osg/Node',
    'osg/NodeVisitor',
    'osg/Notify',
    'osg/Object',
    'osg/PrimitiveSet',
    'osg/Program',
    'osg/Projection',
    'osg/Quat',
    'osg/RenderBin',
    'osg/RenderStage',
    'osg/Shader',
    'osg/ShaderGenerator',
    'osg/Shape',
    'osg/Stack',
    'osg/State',
    'osg/StateAttribute',
    'osg/StateGraph',
    'osg/StateSet',
    'osg/Texture',
    'osg/TextureCubeMap',
    'osg/Transform',
    'osg/Uniform',
    'osg/UpdateVisitor',
    'osg/Utils',
    'osg/Vec2',
    'osg/Vec3',
    'osg/Vec4',
    'osg/Viewport'
], function ( BlendColor, BlendFunc, BoundingBox, BoundingSphere, BufferArray, Camera, ComputeMatrixFromNodePath, CullFace, CullSettings, CullStack, CullVisitor, Depth, DrawArrayLengths, DrawArrays, DrawElements, EllipsoidModel, FrameBufferObject, FrameStamp, Geometry, Image, Light, LightSource, LineWidth, Material, Math, Matrix, MatrixTransform, Node, NodeVisitor, Notify, Object, PrimitiveSet, Program, Projection, Quat, RenderBin, RenderStage, Shader, ShaderGenerator, Shape, Stack, State, StateAttribute, StateGraph, StateSet, Texture, TextureCubeMap, Transform, Uniform, UpdateVisitor, Utils, Vec2, Vec3, Vec4, Viewport ) {

    var osg = {};

    osg.BlendColor = BlendColor;
    osg.BlendFunc = BlendFunc;
    osg.BoundingBox = BoundingBox;
    osg.BoundingSphere = BoundingSphere;
    osg.BufferArray = BufferArray;
    osg.Camera = Camera;
    osg.ComputeMatrixFromNodePath = ComputeMatrixFromNodePath;
    osg.CullFace = CullFace;
    osg.CullSettings = CullSettings;
    osg.CullStack = CullStack;
    osg.CullVisitor = CullVisitor;
    osg.Depth = Depth;
    osg.DrawArrayLengths = DrawArrayLengths;
    osg.DrawArrays = DrawArrays;
    osg.DrawElements = DrawElements;
    osg.EllipsoidModel = EllipsoidModel;
    osg.FrameBufferObject = FrameBufferObject;
    osg.FrameStamp = FrameStamp;
    osg.Geometry = Geometry;
    osg.Image = Image;
    osg.Light = Light;
    osg.LightSource = LightSource;
    osg.LineWidth = LineWidth;
    osg.Material = Material;
    osg.Math = Math;
    osg.Matrix = Matrix;
    osg.MatrixTransform = MatrixTransform;
    osg.Node = Node;
    osg.NodeVisitor = NodeVisitor;
    osg.Notify = Notify;
    osg.Object = Object;
    osg.PrimitiveSet = PrimitiveSet;
    osg.Program = Program;
    osg.Projection = Projection;
    osg.Quat = Quat;
    osg.RenderBin = RenderBin;
    osg.RenderStage = RenderStage;
    osg.Shader = Shader;
    osg.ShaderGenerator = ShaderGenerator;
    osg.Shape = Shape;
    osg.Stack = Stack;
    osg.State = State;
    osg.StateAttribute = StateAttribute;
    osg.StateGraph = StateGraph;
    osg.StateSet = StateSet;
    osg.Texture = Texture;
    osg.TextureCubeMap = TextureCubeMap;
    osg.Transform = Transform;
    osg.Uniform = Uniform;
    osg.UpdateVisitor = UpdateVisitor;
    osg.Utils = Utils;
    osg.Vec2 = Vec2;
    osg.Vec3 = Vec3;
    osg.Vec4 = Vec4;
    osg.Viewport = Viewport;

    return osg;
} );