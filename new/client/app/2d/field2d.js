import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';
require('./field2d.scss');

export default class Field2D extends Component {

    homeTeam = {
        name: 'Barcelona',
        logoUrl: 'textures/fcb.png',
        tShirtImgUrl: 'textures/barcelona-tshirt.png',
        tShirtNrArray: [
            ['1'],
            ['2', '5', '3', '22'],
            ['6', '16', '8', '9', '10'],
            ['4']
        ]
    }

    awayTeam = {
        name: 'Real Madrid',
        logoUrl: 'textures/rm.png',
        tShirtImgUrl: 'textures/barcelona-tshirt.png',
        tShirtNrArray: [
            ['1'],
            ['15', '3', '4', '12'],
            ['24', '14'],
            ['22', '10', '7'],
            ['9']
        ]
    }

    state = {
        windowWidth: window.innerWidth
    }

    handleResize(e) {
        this.setState({
            windowWidth: window.innerWidth
        });
        // this.refs.STLViewer.applyResize();
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize.bind(this));
        this.createField();
        this.displayTShirts();
    }

    // shouldComponentUpdate: function(props) {
    //     d3.select(this.getDOMNode())
    //         .call(chart(props));
    //     return false;
    // }

    createField(element) {
        // ReactDOM.findDOMNode(component).replaceChild(this.renderer.domElement, ReactDOM.findDOMNode(component).firstChild);

        // let tempElem = document.createElement('div');
        let svg = d3.select('#fieldContainer').append('svg');
        svg.attr({
            viewBox: '0 0 1150 720',
            id: 'svg-field',
            stroke: 'black'
        });

        // TODO
        svg.style('transform', 'perspective(1200px) rotateX(45deg)');

        svg.append('rect').attr({
            x: 0,
            y: 0,
            width: 1150,
            height: 720,
            fill: 'green'
        });
        svg.append('path').attr({
            d: 'M 575,20 L 50,20 50,700 1100,700 1100,20 575,20 575,700 z',
            stroke: 'white',
            "stroke-width": 2,
            fill: 'green'
        });
        svg.append('circle').attr({
            cx: 575,
            cy: 360,
            r: 91.5,
            stroke: 'white',
            "stroke-width": 2,
            "fill-opacity": 0
        });
        svg.append('circle').attr({
            cx: 575,
            cy: 360,
            r: 2,
            stroke: 'white',
            fill: 'white'
        });
        svg.append('circle').attr({
            cx: 160,
            cy: 360,
            r: 2,
            stroke: 'white',
            fill: 'white'
        });
        svg.append('circle').attr({
            cx: 990,
            cy: 360,
            r: 2,
            stroke: 'white',
            fill: 'white'
        });
        svg.append('path').attr({
            d: 'M 50,324.4 L 40,324.4 40, 396.6 50 396.6 z',
            stroke: 'white',
            "stroke-width": 2,
            "fill-opacity": 0
        });
        svg.append('path').attr({
            d: 'M 1100,324.4 L 1110,324.4 1110,396.6 1100,396.6 z',
            stroke: 'white',
            "stroke-width": 2,
            "fill-opacity": 0
        });
        svg.append('path').attr({
            d: 'M 50,269.4 L 105,269.4 105,451.6 50 451.6 z',
            stroke: 'white',
            "stroke-width": 2,
            "fill-opacity": 0
        });
        svg.append('path').attr({
            d: 'M 1100,269.4 L 1045,269.4 1045,451.6 1100,451.6 z',
            stroke: 'white',
            "stroke-width": 2,
            "fill-opacity": 0
        });
        svg.append('path').attr({
            d: 'M 50,159.4 L 215,159.4 215,561.6 50 561.6 z',
            stroke: 'white',
            "stroke-width": 2,
            "fill-opacity": 0
        });
        svg.append('path').attr({
            d: 'M 1100,159.4 L 935,159.4 935,561.6 1100,561.6 z',
            stroke: 'white',
            "stroke-width": 2,
            "fill-opacity": 0
        });
        svg.append('path').attr({
            d: 'M 215,286.875 A 91.5,91.5 0 0,1 215,433.125 z',
            stroke: 'white',
            "stroke-width": 2,
            fill: 'green'
        });
        svg.append('path').attr({
            d: 'M 935,286.875 A 91.5,91.5 0 0,0 935,433.125 z',
            stroke: 'white',
            "stroke-width": 2,
            fill: 'green'
        });
        svg.append('path').attr({
            d: 'M 50,30 A 10,10 0 0,0 60,20 L 50,20 z',
            stroke: 'white',
            "stroke-width": 2,
            "fill-opacity": 0
        });
        svg.append('path').attr({
            d: 'M 60,700 A 10,10 0 0,0 50,690 L 50,700 z',
            stroke: 'white',
            "stroke-width": 2,
            "fill-opacity": 0
        });
        svg.append('path').attr({
            d: 'M 1100,690 A 10,10 0 0,0 1090,700 L 1100,700 z',
            stroke: 'white',
            "stroke-width": 2,
            "fill-opacity": 0
        });
        svg.append('path').attr({
            d: 'M 1090,20 A 10,10 0 0,0 1100,30 L 1100,20 z',
            stroke: 'white',
            "stroke-width": 2,
            "fill-opacity": 0
        });
    }

    callbackPlayerClick = () => {
        console.log(click);
    }

    // displayTShirts = (teamsPositions, containerId, showTShirtNr, callbackPlayerClick) => {
    displayTShirts = () => {
        var svg = d3.select('#fieldContainer').append('svg');

        svg.attr({
            viewBox: '0 0 1150 720',
            id: 'svg-names'
        });

        var svgWidth = 1150;
        var svgHeight = 550;

        var halfSvgWidth = svgWidth / 2;

        var widthStep1 = halfSvgWidth / this.homeTeam.tShirtNrArray.length;
        var widthStep2 = halfSvgWidth / this.awayTeam.tShirtNrArray.length;

        var heightSteps1 = this.homeTeam.tShirtNrArray.map(function(elem) {
            return parseInt(svgHeight / (elem.length));
        });
        var heightSteps2 = this.awayTeam.tShirtNrArray.map(function(elem) {
            return parseInt(svgHeight / (elem.length));
        });

        var homeGroup = svg.append('g');

        homeGroup.selectAll('image')
            .data(this.homeTeam.tShirtNrArray)
            .enter()
            .append('g')
            .selectAll('image')
            .data(function(d, i, j) {
                return d;
            })
            .enter()
            .append('image')
            .attr('xlink:href', this.homeTeam.tShirtImgUrl)
            .attr({
                x: function(d, i, j) {
                    return (j * widthStep1 + 75) - (((i * heightSteps1[j]) + heightSteps1[j] / 2) * 1 / svgHeight * (150));
                },
                y: function(d, i, j) {
                    return (i * heightSteps1[j]) + heightSteps1[j] / 2;
                },
                width: '75px',
                height: '75px',
                transform: 'translate(50, 35)'
            })
            .on('click', function(d, i, j) {
                this.callbackPlayerClick('home', d);
            }.bind(this));

        // if (showTShirtNr) {
        //     homeGroup.selectAll('rect')
        //         .data(teamsPositions.t1ShirtNrArr)
        //         .enter()
        //         .append('g')
        //         .selectAll('rect')
        //         .data(function(d, i, j) {
        //             return d;
        //         })
        //         .enter()
        //         .append('rect')
        //         .attr({
        //             fill: 'black',
        //             x: function(d, i, j) {
        //                 return (d < 10 ? -31 : -22) + (j * widthStep1 + 75) - (((i * heightSteps1[j]) + heightSteps1[j] / 2) * 1 / svgHeight * (150));
        //             },
        //             y: function(d, i, j) {
        //                 return 32 + (i * heightSteps1[j]) + heightSteps1[j] / 2;
        //             },
        //             rx: 10,
        //             ry: 10,
        //             width: 35,
        //             height: 35,
        //             transform: 'translate(50, 36)'
        //         });
        //
        //     homeGroup.selectAll('text')
        //         .data(teamsPositions.t1ShirtNrArr)
        //         .enter()
        //         .append('g')
        //         .selectAll('text')
        //         .data(function(d, i, j) {
        //             return d;
        //         })
        //         .enter()
        //         .append('text')
        //         .text(function(d) {
        //             return d;
        //         })
        //         .attr({
        //             fill: 'white',
        //             x: function(d, i, j) {
        //                 return -20 + (j * widthStep1 + 75) - (((i * heightSteps1[j]) + heightSteps1[j] / 2) * 1 / svgHeight * (150));
        //             },
        //             y: function(d, i, j) {
        //                 return 60 + (i * heightSteps1[j]) + heightSteps1[j] / 2;
        //             },
        //             width: '75px',
        //             height: '75px',
        //             transform: 'translate(50, 35)'
        //         });
        // }
        //
        // var awayGroup = svg.append('g');
        //
        // awayGroup.selectAll('image')
        //     .data(teamsPositions.t2ShirtNrArr)
        //     .enter()
        //     .append('g')
        //     .selectAll('image')
        //     .data(function(d, i, j) {
        //         return d;
        //     })
        //     .enter()
        //     .append('image')
        //     .attr('xlink:href', teamsPositions.t2ShirtImg)
        //     .attr({
        //         x: function(d, i, j) {
        //             return (svgWidth - j * widthStep2 - 125) + (((i * heightSteps2[j]) + heightSteps2[j] / 2) * 1 / svgHeight * 250);
        //         },
        //         y: function(d, i, j) {
        //             return (i * heightSteps2[j]) + heightSteps2[j] / 2;
        //         },
        //         width: '75px',
        //         height: '75px',
        //         transform: 'translate(-130, 35)'
        //     })
        //     .on('click', function(d, i, j) {
        //         callbackPlayerClick('away', d);
        //     });
        //
        // if (showTShirtNr) {
        //     awayGroup.selectAll('rect')
        //         .data(teamsPositions.t2ShirtNrArr)
        //         .enter()
        //         .append('g')
        //         .selectAll('rect')
        //         .data(function(d, i, j) {
        //             return d;
        //         })
        //         .enter()
        //         .append('rect')
        //         .attr({
        //             fill: 'black',
        //             x: function(d, i, j) {
        //                 return (d < 10 ? 30 : 20) + (svgWidth - j * widthStep2 - 125) + (((i * heightSteps2[j]) + heightSteps2[j] / 2) * 1 / svgHeight * (250));
        //             },
        //             y: function(d, i, j) {
        //                 return 30 + (i * heightSteps2[j]) + heightSteps2[j] / 2;
        //             },
        //             rx: 10,
        //             ry: 10,
        //             width: 35,
        //             height: 35,
        //             transform: 'translate(-90, 36)'
        //         });
        //
        //     awayGroup.selectAll('text')
        //         .data(teamsPositions.t2ShirtNrArr)
        //         .enter()
        //         .append('g')
        //         .selectAll('text')
        //         .data(function(d, i, j) {
        //             return d;
        //         })
        //         .enter()
        //         .append('text')
        //         .text(function(d) {
        //             return d;
        //         })
        //         .attr({
        //             fill: 'white',
        //             x: function(d, i, j) {
        //                 return (d < 10 ? 31 : 12) + (svgWidth - j * widthStep2 - 125) + (((i * heightSteps2[j]) + heightSteps2[j] / 2) * 1 / svgHeight * (250));
        //             },
        //             y: function(d, i, j) {
        //                 return 58 + (i * heightSteps2[j]) + heightSteps2[j] / 2;
        //             },
        //             width: '75px',
        //             height: '75px',
        //             transform: 'translate(-80, 35)'
        //         });
        // }
    }

    render() {
        // <div id="fieldContainer" style={{zIndex:10}}></div>

        // <svg height="684" width="452">
        //     <rect opacity=".7" height="684" width="452" fill="#0b0" ry="6"/>
        //     <g stroke="#efe" strokeWidth="3" fill="none">
        //     <path d="m11.22 22.62v638.8h429.6v-638.8z"/>
        //     <path d="m11.26 342h429.4"/>
        //     <circle cy="342" cx="226" r="54.8"/>
        //     <circle cy="342" cx="226" r="2"/>
        //     <g id="a">
        //     <path d="m9.9 30.07c4.85 0 8.82-4 8.82-8.9m162.5 100.8a54.91 54.91 0 0 0 89.6 0m76.3-99.63v99.63h-242.2l.2-99.63m98.6.20v-15.6l44.6.003v15.6m-77.9-.20v34.4h111.2v-34.4m160.5 7.7c-4.9 0-8.8-4-8.8-8.9"/>
        //     <circle cy="90" cx="226" r="2"/>
        //     </g>
        //     <use href="#a" transform="scale(1,-1)" y="-684"/>
        //     </g>
        //     </svg>
        return (
            <div id="fieldContainer" style={{width:'12  00px', height:'auto',left:'200px', position:'relative'}}></div>
        );
    }
}
