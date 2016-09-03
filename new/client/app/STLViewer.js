import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import THREE from './Three';
let OrbitControls = require('three-orbit-controls')(THREE);

class STLViewer extends Component {
    mesh = null;
    meshBB = null;
    renderer = null;
    scene = null;
    camera = null;
    shirts = [];

    componentDidMount() {
        this.init();
    }

    componentDidUpdate() {
        this.init();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.modelChanged;
    }

    init() {
        const {
            width,
            height,
            backgroundColor,
            orbitControls
        } = this.props;

        let controls = null;
        let component = this;
        let rotate = this.props.rotate;

        this.scene = new THREE.Scene();
        let distance = 10000;

        let directionalLight = new THREE.DirectionalLight(0xffffff, 0.25);
        directionalLight.position.x = 0;
        directionalLight.position.y = 0;
        directionalLight.position.z = 1;
        directionalLight.position.normalize();
        this.scene.add(directionalLight);

        directionalLight = new THREE.DirectionalLight(0xffffff, 0.25);
        directionalLight.position.x = 0;
        directionalLight.position.y = 0;
        directionalLight.position.z = -1;
        directionalLight.position.normalize();
        this.scene.add(directionalLight);

        var light = new THREE.HemisphereLight( this.props.modelColor, 0x555555, 0.5 );
        this.scene.add( light );

        light = new THREE.HemisphereLight( 0x555555, this.props.modelColor, 0.5 );
        this.scene.add( light );



            var img = new Image();
            img.onload = createMeshThenRender.bind(this);
            // img.src = 'textures/field.png';
            img.src = 'textures/field2.jpg';

            function createMeshThenRender () {
                var imgWidth = 512;
                var imgHeight = 512;
                var mapCanvas = document.createElement( 'canvas' );
                mapCanvas.width = mapCanvas.height = 512;

                // document.body.appendChild( mapCanvas );
                var ctx = mapCanvas.getContext( '2d' );
                // ctx.translate( imgWidth / 2, imgHeight / 2 );
                // ctx.rotate( Math.PI / 2 );
                // ctx.translate( -imgWidth/2, -imgHeight / 2 );
                ctx.drawImage( img, 0, 0, imgWidth, imgHeight );


                var texture = new THREE.Texture( mapCanvas );
                texture.needsUpdate = true;

                let marginColor = '#4F2E25';
                let bottomColor = '#4F2E25';
                let materials = [
                    new THREE.MeshBasicMaterial( { color: marginColor} ),
                    new THREE.MeshBasicMaterial( { color: marginColor} ),
                    new THREE.MeshBasicMaterial( { color: '#fff', map: texture } ),
                    new THREE.MeshBasicMaterial( { color: bottomColor} ),
                    new THREE.MeshBasicMaterial( { color: marginColor} ),
                    new THREE.MeshBasicMaterial( { color: marginColor} ),
                ];

                // this.mesh = new THREE.Mesh( new THREE.CubeGeometry(105, 1, 68), new THREE.MeshBasicMaterial( { color: '#fff', map: texture } ));
                this.mesh = new THREE.Mesh( new THREE.CubeGeometry(105, 1, 68), new THREE.MeshFaceMaterial( materials ));
                let geometry = this.mesh.geometry;

                geometry.center();
                this.meshBB = geometry.boundingBox;
                let xDims = this.meshBB.max.x - this.meshBB.min.x;
                let yDims = this.meshBB.max.y - this.meshBB.min.y;
                let zDims = this.meshBB.max.z - this.meshBB.min.z;
                this.scene.add(this.mesh);



                this.camera.position.set((xDims), 0, Math.max((xDims) * 3, (yDims) * 3, (zDims) * 3));

                this.renderer.render(this.scene, this.camera);
            }


            //
            // // create a cube, 1 unit for width, height, depth
            // var geometryCube = new THREE.CubeGeometry(3,4,9);
            //
            // // each cube side gets another color
            // var cubeMaterials = [
            //     new THREE.MeshBasicMaterial({color:0xffffff, transparent:true, opacity:0}),
            //     new THREE.MeshBasicMaterial({color:0xffffff, transparent:true, opacity:0.5}),
            //     new THREE.MeshBasicMaterial({color:0xffffff, transparent:true, opacity:0.5}),
            //     new THREE.MeshBasicMaterial({color:0xffffff, transparent:true, opacity:0.5}),
            //     new THREE.MeshBasicMaterial({color:0xffffff, transparent:true, opacity:0.5}),
            //     new THREE.MeshBasicMaterial({color:0xffffff, transparent:true, opacity:0.5}),
            // ];
            // // create a MeshFaceMaterial, allows cube to have different materials on each face
            // var cubeMaterial = new THREE.MeshFaceMaterial(cubeMaterials);
            // var cube = new THREE.Mesh(geometryCube, cubeMaterial);
            //
            // cube.position.set(-50,2,0);
            // this.scene.add( cube );




            this.loadTShirt();

        // Add the camera

        // var SCREEN_WIDTH = window.innerWidth;
        // var SCREEN_HEIGHT = window.innerHeight;
    	// var VIEW_ANGLE = 45;
        // var ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
        // var NEAR = 0.1;
        // var FAR = 20000;
    	// camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
    	// scene.add(camera);
    	// camera.position.set(0,150,400);
    	// camera.lookAt(scene.position);


        this.camera = new THREE.PerspectiveCamera(30, width / height, 1, distance);
        this.scene.add(this.camera);

        this.renderer = new THREE.WebGLRenderer(); //new THREE.CanvasRenderer();
        this.renderer.setSize(width, height);
        this.renderer.setClearColor(backgroundColor, 1);

        if (orbitControls) {
            controls = new OrbitControls(this.camera, ReactDOM.findDOMNode(component));
            controls.addEventListener('change', () => {
                for (var i = 0; i < this.shirts.length; i++) {
                    this.shirts[i].rotation.copy(this.camera.rotation);
                    // this.shirts[i].updateMatrix();
                    // this.shirts[i].translateZ(-10);
                }
                this.renderer.render(this.scene, this.camera);
            });
        }

        ReactDOM.findDOMNode(component).replaceChild(this.renderer.domElement, ReactDOM.findDOMNode(component).firstChild);

        this.renderer.render(this.scene, this.camera);
    }

    loadTShirt = () => {
        // var img2 = new THREE.MeshBasicMaterial({
        //     side: THREE.DoubleSide,
        //     transparent: true,
        //     map:THREE.ImageUtils.loadTexture('textures/barcelona-tshirt.png')
        // });
        // img2.map.needsUpdate = true; //ADDED
        // var plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5),img2);
        // plane.overdraw = true;
        // plane.position.set( 0, 2.5, 0 );
        // this.scene.add(plane);
        //
        // this.shirts.push(plane);



        var img = new Image();
        img.onload = createMeshThenRender.bind(this);
        img.src = 'textures/barcelona-tshirt.png';

        function createMeshThenRender () {
            let imgWidth = 256;
            let imgHeight = 256;
            let marginTShirt = 32;
            let tShirtDim = imgWidth - 2 * marginTShirt;
            let textHeight = imgHeight - tShirtDim;
            // let tShirtNrDim = 2 * marginTShirt;
            let tShirtNrDim = 100;
            let tShirtNrStartX = imgWidth - tShirtNrDim;
            let tShirtNrStartY = imgHeight - textHeight - tShirtNrDim;
            let mapCanvas = document.createElement( 'canvas' );
            mapCanvas.width = mapCanvas.height = 256;

            var ctx = mapCanvas.getContext( '2d' );

            ctx.fillStyle='rgba(255,255,255,0)';
            ctx.fillRect(0,0,imgWidth,imgHeight);

            ctx.fillStyle = 'rgba(0,0,0,0)';
            // ctx.drawImage(img, marginTShirt, 0, tShirtDim, tShirtDim);
            ctx.drawImage(img, 0, 0, tShirtDim, tShirtDim);


            ctx.fillStyle='rgba(0,0,0,1)';
            ctx.fillRect(0, tShirtDim, imgWidth, textHeight);

            ctx.fillStyle = 'white';
            ctx.font = "20px Arial";
            ctx.fillText("Hello World", 10, tShirtDim + textHeight/2);

            // tshirt number
            ctx.fillStyle='rgba(0,0,0,1)';
            ctx.fillRect(imgWidth/2, tShirtNrStartY, tShirtNrDim, tShirtNrDim);

            ctx.fillStyle = 'white';
            ctx.font = "90px Arial";
            ctx.fillText("22", imgWidth/2, tShirtNrStartY + tShirtNrDim/1.25);


            var texture = new THREE.Texture( mapCanvas );
            texture.needsUpdate = true;


            let mesh2 = new THREE.Mesh( new THREE.CubeGeometry(5, 5, 1), new THREE.MeshBasicMaterial( { color: '#fff', transparent:true, map: texture } ));
            mesh2.position.set( 0, 2.5, 0 );
            this.scene.add(mesh2);

            this.shirts.push(mesh2);
        }
    };

    drawHelperPlanes = (params) => {
        var floorMaterial = new THREE.MeshBasicMaterial( { color: '#007fff', side: THREE.DoubleSide } );
    	var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
    	var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    	floor.position.y = -0.5;
    	floor.rotation.x = Math.PI / 2;
    	this.scene.add(floor);

        var floorMaterial2 = new THREE.MeshBasicMaterial( { color: '#00ff00', side: THREE.DoubleSide } );
    	var floorGeometry2 = new THREE.PlaneGeometry(1000, 1000, 10, 10);
    	var floor2 = new THREE.Mesh(floorGeometry2, floorMaterial2);
    	floor2.position.x = -500;
    	floor2.position.y = 500;
    	floor2.rotation.y = Math.PI / 2;
    	this.scene.add(floor2);

        var floorMaterial3 = new THREE.MeshBasicMaterial( { color: '#ffff00', side: THREE.DoubleSide } );
    	var floorGeometry3 = new THREE.PlaneGeometry(1000, 1000, 10, 10);
    	var floor3 = new THREE.Mesh(floorGeometry3, floorMaterial3);
    	floor3.position.x = 0;
    	floor3.position.z = -500;
    	floor3.position.y = 500;
    	floor3.rotation.z = Math.PI / 2;
    	this.scene.add(floor3);
    };

    drawAxisHelpersSimple = (params) => {
        var axisHelper = new THREE.AxisHelper( 50 );
        this.scene.add( axisHelper );
    };

    drawAxesNames = (position, rotation, name, color, positionOffset) => {
        var canvas1 = document.createElement('canvas');
    	var context1 = canvas1.getContext('2d');
    	context1.font = "Bold 15px Arial";
    	context1.fillStyle = color;
        context1.fillText(name + ' Axis', 0, 20);

    	var texture1 = new THREE.Texture(canvas1)
    	texture1.needsUpdate = true;

        var material1 = new THREE.MeshBasicMaterial( {map: texture1, side:THREE.DoubleSide } );
        material1.transparent = true;

        var mesh1 = new THREE.Mesh(
            new THREE.PlaneGeometry(canvas1.width, canvas1.height),
            material1
          );
        mesh1.position.copy(position);
        mesh1.position.x += positionOffset[0];
        mesh1.position.y += positionOffset[1];
        mesh1.position.z += positionOffset[2];
        mesh1.rotation.copy(rotation);
        if (name === 'Z') {
            mesh1.rotation.y -= 90 * Math.PI / 180;
            mesh1.rotation.x -= 90 * Math.PI / 180;
        }
    	this.scene.add( mesh1 );
    }

    // http://osa1.net/posts/2013-04-17-THREEjs-axis-helper.html
    drawAxisHelpers = (params = {}) => {
        params.radius = params.radius || 1;
        params.height = params.height || 100;
        params.scene  = params.scene  || this.scene;
        params.startX  = params.startX  || 0;

        let arrowGeometry = new THREE.CylinderGeometry (0, 2 * params.radius, params.height / 5);

        let yAxisMaterial = new THREE.MeshBasicMaterial ({color: 0x00FF00});
        let yAxisGeometry = new THREE.CylinderGeometry (params.radius, params.radius, params.height);
        let yAxisMesh     = new THREE.Mesh (yAxisGeometry, yAxisMaterial);
        let yArrowMesh    = new THREE.Mesh (arrowGeometry, yAxisMaterial);
        yAxisMesh.add (yArrowMesh);
        yArrowMesh.position.y = params.height / 2;
        yAxisMesh.position.x  = params.height / 2 + params.startX;
        yAxisMesh.rotation.z  -= 90 * Math.PI / 180;
        this.scene.add (yAxisMesh);

        this.drawAxesNames(yAxisMesh.position, yAxisMesh.rotation, 'Y', 'rgba(255,0,0,1)', [ -2*params.height, -2*params.height, 0]);

        let xAxisMaterial = new THREE.MeshBasicMaterial ({color: 0xFF0000});
        let xAxisGeometry = new THREE.CylinderGeometry (params.radius, params.radius, params.height);
        let xAxisMesh     = new THREE.Mesh (xAxisGeometry, xAxisMaterial);
        let xArrowMesh    = new THREE.Mesh (arrowGeometry, xAxisMaterial);
        xAxisMesh.add (xArrowMesh);
        xArrowMesh.position.y = params.height / 2;
        xAxisMesh.position.y  = params.height / 2;
        xAxisMesh.position.x  = params.startX;
        params.scene.add (xAxisMesh);

        this.drawAxesNames(xAxisMesh.position, xAxisMesh.rotation, 'X', 'rgba(0,255,0,1)', [3.1 * params.height, -1.9*params.height, 0]);

        let zAxisMaterial = new THREE.MeshBasicMaterial({ color: 0x0000FF});
        let zAxisGeometry = new THREE.CylinderGeometry( params.radius, params.radius, params.height);
        let zAxisMesh     = new THREE.Mesh( zAxisGeometry, zAxisMaterial);
        let zArrowMesh    = new THREE.Mesh( arrowGeometry, zAxisMaterial);
        zAxisMesh.add(zArrowMesh);
        zAxisMesh.rotation.x  += 90 * Math.PI / 180;
        zArrowMesh.position.y = params.height / 2;
        zAxisMesh.position.z  = params.height / 2;
        zAxisMesh.position.x  = params.startX;
        params.scene.add(zAxisMesh);

        this.drawAxesNames(zAxisMesh.position, zAxisMesh.rotation, 'Z', 'rgba(0,0,255,1)', [0, -1.4*params.height, 2.6*params.height]);
    };

    render() {
        return (
            <div id="viewer3d">
                  <div style={{
                          textAlign: 'center',
                          marginTop: this.props.height / 2 - 8
                      }}>
                  </div>
            </div>
        );
    };
};

module.exports = STLViewer;
