import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import THREE from './Three';
let OrbitControls = require('three-orbit-controls')(THREE);

class STLViewer extends Component {
    mesh = null;
    renderer = null;
    scene = null;
    camera = null;
    shirts = [];

    componentDidMount = () => {
        document.addEventListener('mousedown', (e) => {
            event.preventDefault();
            let raycaster = new THREE.Raycaster();
            let mouse = new THREE.Vector2();

             mouse.x = ( event.clientX / this.renderer.domElement.clientWidth ) * 2 - 1;
             mouse.y = - ( event.clientY / this.renderer.domElement.clientHeight ) * 2 + 1;

             raycaster.setFromCamera(mouse, this.camera);

             let intersects = raycaster.intersectObjects(this.shirts);

             if (intersects.length > 0) {
                 intersects[0].object.onPlayerClick();
             }
        }, false);
        this.init();
    }

    shouldComponentUpdate = (nextProps, nestState) => {
        return nextProps.shouldUpdate;
    }

    componentDidUpdate = () => this.init();

    applyResize = () => {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.render(this.scene, this.camera);
    }

    init = () => {
        let controls = null;
        let component = this;

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

        this.camera = new THREE.PerspectiveCamera(30, this.props.width / this.props.height, 1, distance);
        this.camera.position.set(0, 100, 100);

        this.scene.add(this.camera);

        this.renderer = new THREE.WebGLRenderer({ alpha: true });
        this.renderer.setSize(this.props.width, this.props.height);
        this.renderer.setClearColor(0x000000, 0);

        controls = new OrbitControls(this.camera, ReactDOM.findDOMNode(component));
        controls.addEventListener('change', () => {
            for (let i = 0; i < this.shirts.length; i++) {
                this.shirts[i].rotation.copy(this.camera.rotation);
            }
            this.renderer.render(this.scene, this.camera);
        });

        ReactDOM.findDOMNode(component).replaceChild(this.renderer.domElement, ReactDOM.findDOMNode(component).firstChild);

        this.loadField();

        this.renderer.render(this.scene, this.camera);
    }

    getPlayerById = (playerId, teamData) => {
        return teamData.players.filter((player) => Number(player.id) === Number(playerId))[0];
    }

    loadField = () => {
        let fieldWidth = this.props.field.width;
        let fieldHeight = this.props.field.height;

        let halfFieldWidth = fieldWidth / 2;
        let widthStep1 = halfFieldWidth / this.props.homeTeam.playerPositionById.length;
        let widthStep2 = halfFieldWidth / this.props.awayTeam.playerPositionById.length;
        let heightSteps1 = this.props.homeTeam.playerPositionById.map((elem) => parseInt(fieldHeight / (elem.length)));
        let heightSteps2 = this.props.awayTeam.playerPositionById.map((elem) => parseInt(fieldHeight / (elem.length)));
        let homeTeamPlayerData = this.props.homeTeam.playerPositionById.map((idList)=>idList.map((id)=>this.getPlayerById(id, this.props.homeTeam)));
        let awayTeamPlayerData = this.props.awayTeam.playerPositionById.map((idList)=>idList.map((id)=>this.getPlayerById(id, this.props.awayTeam)));

        let createMeshThenRender = () => {
            let imgWidth = 1024;
            let imgHeight = 1024;
            let mapCanvas = document.createElement('canvas');
            mapCanvas.width = mapCanvas.height = 1024;

            let ctx = mapCanvas.getContext('2d');
            ctx.drawImage(img, 0, 0, imgWidth, imgHeight);

            let texture = new THREE.Texture(mapCanvas);
            texture.needsUpdate = true;

            let marginColor = '#4F2E25';
            let bottomColor = '#4F2E25';
            let materials = [
                new THREE.MeshBasicMaterial({color: marginColor}),
                new THREE.MeshBasicMaterial({color: marginColor}),
                new THREE.MeshBasicMaterial({color: '#fff', map: texture }),
                new THREE.MeshBasicMaterial({color: bottomColor}),
                new THREE.MeshBasicMaterial({color: marginColor}),
                new THREE.MeshBasicMaterial({color: marginColor}),
            ];

            this.mesh = new THREE.Mesh(new THREE.CubeGeometry(fieldWidth, 0, fieldHeight), new THREE.MeshFaceMaterial(materials));
            let geometry = this.mesh.geometry;

            geometry.center();
            this.scene.add(this.mesh);
            this.mesh.position.set(0, 1, 0);

            this.renderer.render(this.scene, this.camera);
        }

        let img = new Image();
        img.onload = createMeshThenRender;
        img.src = this.props.field.textureUrl;

        homeTeamPlayerData.forEach((players, i) => {
            players.forEach((player, j) => {
                let x = i * widthStep1 + widthStep1/2 - fieldWidth/2;
                let y = (j * heightSteps1[i]) + heightSteps1[i] / 2 - fieldHeight/2;
                this.loadTShirt(player, x, y, true);
            });
        });

        awayTeamPlayerData.forEach((players, i) => {
            players.forEach((player, j) => {
                let x = fieldWidth - i * widthStep1 - widthStep1/2 - fieldWidth/2;
                let y = (j * heightSteps1[i]) + heightSteps1[i] / 2 - fieldHeight/2;
                this.loadTShirt(player, x, y, false);
            });
        });

        this.addLine(-10, 0, 0, 0, 10, 10);
        this.addLine2(0, 0, 10, 10);
    }

    loadTShirt = (playerData, x, y, isHomeTeam) => {
        let createMeshThenRender = () => {
            let imgWidth = 256;
            let imgHeight = imgWidth;
            let imgStartX = 0;
            let marginTShirt = 32;
            let tShirtDim = imgWidth - marginTShirt;
            let textHeight = imgHeight - tShirtDim;
            let tShirtNrDim = 75;
            let tShirtNrStartX = imgWidth - tShirtNrDim;
            let tShirtNrStartY = imgHeight - textHeight - tShirtNrDim;
            let tShirtNrFontSize = 60;
            let playerNameFontSize = 20;
            let tShirtNrLeftPadding = playerData.tShirtNr > 9 ? 5 : 20;

            if (!isHomeTeam) {
                imgStartX = marginTShirt;
                tShirtNrStartX = 0;
            }

            let mapCanvas = document.createElement('canvas');
            mapCanvas.width = mapCanvas.height = imgWidth;
            let ctx = mapCanvas.getContext('2d');

            ctx.fillStyle='rgba(255,255,255,0)';
            ctx.fillRect(imgStartX,0,imgWidth,imgHeight);

            ctx.fillStyle = 'rgba(0,0,0,0)';
            ctx.drawImage(img, imgStartX, 0, tShirtDim, tShirtDim);

            // player name
            ctx.fillStyle='rgba(0,0,0,1)';
            ctx.fillRect(0, tShirtDim, imgWidth, textHeight);

            ctx.fillStyle = 'white';
            ctx.font = playerNameFontSize + 'px Arial';
            ctx.fillText(playerData.name, 5, tShirtDim + textHeight/2 + 5);

            // tshirt number
            ctx.fillStyle ='rgba(255,255,255,0.75)';
            ctx.fillRect(tShirtNrStartX, tShirtNrStartY, tShirtNrDim, tShirtNrDim);

            ctx.fillStyle = 'black';
            ctx.font = tShirtNrFontSize + "px Arial";
            ctx.fillText(playerData.tShirtNr, tShirtNrStartX + tShirtNrLeftPadding, tShirtNrStartY + tShirtNrFontSize);

            let texture = new THREE.Texture(mapCanvas);
            texture.needsUpdate = true;
            let mesh2 = new THREE.Mesh(new THREE.CubeGeometry(5, 5, 0), new THREE.MeshBasicMaterial({ color: '#fff', transparent:true, map: texture }));
            mesh2.position.set(x, 4, y);
            this.scene.add(mesh2);

            mesh2.onPlayerClick = this.props.onPlayerClick.bind(null, playerData);

            this.shirts.push(mesh2);
            mesh2.rotation.copy(this.camera.rotation);
            this.renderer.render(this.scene, this.camera);
        }

        let img = new Image();
        img.onload = createMeshThenRender;
        img.src = playerData.tShirtImgUrl;
    };

    // http://www.lab4games.net/zz85/blog/2014/09/08/rendering-lines-and-bezier-curves-in-three-js-and-webgl/
    addLine = (x0, y0, x1, y1, x2, y2) => {
        let geometry = new THREE.Geometry();
        let curve = new THREE.QuadraticBezierCurve3();
        curve.v0 = new THREE.Vector3(x0, 0,y0);
        curve.v1 = new THREE.Vector3(x1, 10,y1);
        curve.v2 = new THREE.Vector3(x2, 0,y2);
        for (let j = 0; j < 20; j++) {
           geometry.vertices.push( curve.getPoint(j / 20) )
        }
        let material = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 2 } );
        let line = new THREE.Line(geometry, material);
        this.scene.add(line);
    }

    addLine2 = (x0, y0, x1, y1) => {
        let geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3(x0, y0, 0));
        geometry.vertices.push(new THREE.Vector3(x1, y1, 0));
        let material = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 2 } );
        let line = new THREE.Line(geometry, material);
        this.scene.add(line);
    }


    render = () => (
            <div id="viewer3d">
                  <div style={{
                          textAlign: 'center',
                          marginTop: this.props.height / 2 - 8
                      }}>
                  </div>
            </div>
       );
};

module.exports = STLViewer;
