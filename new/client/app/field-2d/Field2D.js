import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';
require('./Field2D.scss');

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
        this.displayTShirts();
    }

    // shouldComponentUpdate: function(props) {
    //     d3.select(this.getDOMNode())
    //         .call(chart(props));
    //     return false;
    // }


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
                    // return (j * widthStep1 + 75) - (((i * heightSteps1[j]) + heightSteps1[j] / 2) * 1 / svgHeight * (150));
                    return (j * widthStep1);
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

        // style="transform: perspective(1200px) rotateX(45deg);"


        let SVGField2 = <svg
                        viewBox="0 0 1150 720"
                        id="svg-field"
                        stroke="black"
                        >
                <rect x="0" y="0" width="1150" height="720" fill="green"></rect>
                <path d="M 575,20 L 50,20 50,700 1100,700 1100,20 575,20 575,700 z" stroke="white" strokeWidth="2" fill="green"></path>
                    <circle cx="575" cy="360" r="91.5" stroke="white" strokeWidth="2" fillOpacity="0"></circle>
                    <circle cx="575" cy="360" r="2" stroke="white" fill="white"></circle>
                    <circle cx="160" cy="360" r="2" stroke="white" fill="white"></circle>
                    <circle cx="990" cy="360" r="2" stroke="white" fill="white"></circle>
                    <path d="M 50,324.4 L 40,324.4 40, 396.6 50 396.6 z" stroke="white" strokeWidth="2" fillOpacity="0"></path>
                    <path d="M 1100,324.4 L 1110,324.4 1110,396.6 1100,396.6 z" stroke="white" strokeWidth="2" fillOpacity="0"></path>
                    <path d="M 50,269.4 L 105,269.4 105,451.6 50 451.6 z" stroke="white" strokeWidth="2" fillOpacity="0"></path>
                    <path d="M 1100,269.4 L 1045,269.4 1045,451.6 1100,451.6 z" stroke="white" strokeWidth="2" fillOpacity="0"></path>
                    <path d="M 50,159.4 L 215,159.4 215,561.6 50 561.6 z" stroke="white" strokeWidth="2" fillOpacity="0"></path>
                    <path d="M 1100,159.4 L 935,159.4 935,561.6 1100,561.6 z" stroke="white" strokeWidth="2" fillOpacity="0"></path>
                    <path d="M 215,286.875 A 91.5,91.5 0 0,1 215,433.125 z" stroke="white" strokeWidth="2" fill="green"></path>
                    <path d="M 935,286.875 A 91.5,91.5 0 0,0 935,433.125 z" stroke="white" strokeWidth="2" fill="green"></path>
                    <path d="M 50,30 A 10,10 0 0,0 60,20 L 50,20 z" stroke="white" strokeWidth="2" fillOpacity="0"></path>
                    <path d="M 60,700 A 10,10 0 0,0 50,690 L 50,700 z" stroke="white" strokeWidth="2" fillOpacity="0"></path>
                    <path d="M 1100,690 A 10,10 0 0,0 1090,700 L 1100,700 z" stroke="white" strokeWidth="2" fillOpacity="0"></path>
                    <path d="M 1090,20 A 10,10 0 0,0 1100,30 L 1100,20 z" stroke="white" strokeWidth="2" fillOpacity="0"></path>
                </svg>

        let SVGField = <img
                width="1150" height="720"
                style={{transform: 'perspective(1200px) rotateX(45deg)', position: 'absolute'}}
                src="textures/default-field-texture.png"/>

        return (
                <div id="fieldContainer" style={{width:'1200px', height:'auto',left:'0px', position:'relative'}}>
                {SVGField2}
            </div>
        );
    }
}
