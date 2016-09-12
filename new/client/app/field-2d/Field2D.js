import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';
require('./Field2D.scss');

export default class Field2D extends Component {

    state = {
        windowWidth: window.innerWidth
    }

    handleResize = (e) => {
        this.setState({
            windowWidth: window.innerWidth
        });
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
        this.displayTShirts();
    }

    callbackPlayerClick = () => {
        console.log(click);
    }

    getPlayerById = (playerId, teamData) => {
        let result = teamData.players.filter((player) => Number(player.id) === Number(playerId))[0];
        // console.log('aaa', playerId);
        return result;
    }

    displayTShirts = () => {
        let perspective = this.props.perspective || true;

        var svg = d3.select('#fieldContainer').append('svg');

        svg.attr({
            viewBox: '0 0 1150 720',
            id: 'svg-names'
        });

        var svgWidth = 1150;
        var svgHeight = 550;

        var halfSvgWidth = svgWidth / 2;

        var widthStep1 = halfSvgWidth / this.props.homeTeam.playerPositionById.length;
        var widthStep2 = halfSvgWidth / this.props.awayTeam.playerPositionById.length;

        var heightSteps1 = this.props.homeTeam.playerPositionById.map((elem) => parseInt(svgHeight / (elem.length)));
        var heightSteps2 = this.props.awayTeam.playerPositionById.map((elem) => parseInt(svgHeight / (elem.length)));

        var homeGroup = svg.append('g');

        let homeTeamPlayerData = this.props.homeTeam.playerPositionById.map((idList)=>idList.map((id)=>this.getPlayerById(id, this.props.homeTeam)));
        let awayTeamPlayerData = this.props.awayTeam.playerPositionById.map((idList)=>idList.map((id)=>this.getPlayerById(id, this.props.awayTeam)));

        homeGroup.selectAll('image')
            .data(homeTeamPlayerData)
            .enter()
            .append('g')
            .selectAll('image')
            .data((idList) => idList)
            .enter()
            .append('image')
            .attr('xlink:href', (playerData) => playerData.tShirtImgUrl)
            .attr({
                x: (playerData, i, j) => {
                    if (perspective === 'true') {
                        return (j * widthStep1 + 75) - (((i * heightSteps1[j]) + heightSteps1[j] / 2) * 1 / svgHeight * (150));
                    }
                    return (j * widthStep1);
                },
                y: (playerData, i, j) => (i * heightSteps1[j]) + heightSteps1[j] / 2,
                width: '75px',
                height: '75px',
                transform: 'translate(10, 35)'
            })
            .on('click', (playerData, i, j) => this.props.onPlayerClick(homeTeam.id, d));

        let tmpBg = homeGroup.selectAll('rect')
            .data(homeTeamPlayerData)
            .enter()
            .append('g')
            .selectAll('rect')
            .data((idList) => idList)
            .enter();

        let tmpTxt = homeGroup.selectAll('text')
            .data(homeTeamPlayerData)
            .enter()
            .append('g')
            .selectAll('text')
            .data((idList) => idList)
            .enter();

        tmpBg
            .append('rect')
            .attr({
                fill: 'rgba(0,0,0,0.75)',
                x: (playerData, i, j) => {
                    if (perspective === 'true') {
                        return (j * widthStep1 + 75) - (((i * heightSteps1[j]) + heightSteps1[j] / 2) * 1 / svgHeight * (150));
                    }
                    return (j * widthStep1);
                },
                y: (playerData, i, j) => (i * heightSteps1[j]) + heightSteps1[j] / 2,
                width: (playerData) => (playerData.name).length * 6.5, // TODO
                height: 20,
                // transform: (playerData) => 'translate('+(40 + (playerData.name).length * 6.5 < 75 ? (75-(playerData.name).length * 6.5) : 0)+', 110)'
                transform: (playerData) => 'translate(20, 110)'
            });
        tmpTxt
            .append('text')
            .text((playerData) => playerData.name)
            .attr({
                fill: 'white',
                x: (playerData, i, j) => {
                    if (perspective === 'true') {
                        return (j * widthStep1 + 75) - (((i * heightSteps1[j]) + heightSteps1[j] / 2) * 1 / svgHeight * (150));
                    }
                    return (j * widthStep1);
                },
                y: (playerData, i, j) => (i * heightSteps1[j]) + heightSteps1[j] / 2,
                'font-size': 12,
                transform: (playerData) => 'translate(25, 124)'
            });

        tmpBg
            .append('rect')
            .attr({
                fill: '#eee',
                x: (playerData, i, j) => {
                    if (perspective === 'true') {
                        return (j * widthStep1 + 75) - (((i * heightSteps1[j]) + heightSteps1[j] / 2) * 1 / svgHeight * (150));
                    }
                    return (j * widthStep1);
                },
                y: (playerData, i, j) => (i * heightSteps1[j]) + heightSteps1[j] / 2,
                width: 20, // TODO
                height: 20,
                transform: (playerData) => 'translate(0, 110)'
            });

        tmpTxt
            .append('text')
            .text((playerData) => playerData.tShirtNr)
            .attr({
                fill: 'black',
                x: (playerData, i, j) => {
                    if (perspective === 'true') {
                        return (j * widthStep1 + 75) - (((i * heightSteps1[j]) + heightSteps1[j] / 2) * 1 / svgHeight * (150));
                    }
                    return (j * widthStep1);
                },
                y: (playerData, i, j) => (i * heightSteps1[j]) + heightSteps1[j] / 2,
                'font-size': 14,
                transform: (playerData) => 'translate('+(parseInt(playerData.tShirtNr) < 10 ? 6 : 4)+', 125)'
            });


        var awayGroup = svg.append('g');

        awayGroup.selectAll('image')
            .data(awayTeamPlayerData)
            .enter()
            .append('g')
            .selectAll('image')
            .data((idList) => idList)
            .enter()
            .append('image')
            .attr('xlink:href', (playerData) => playerData.tShirtImgUrl)
            .attr({
                x: (playerData, i, j) => {
                    if (perspective === 'true') {
                        return (svgWidth - j * widthStep2 - 125) + (((i * heightSteps2[j]) + heightSteps2[j] / 2) * 1 / svgHeight * 250);
                    }
                    return (svgWidth - j * widthStep2);
                },
                y: (playerData, i, j) => (i * heightSteps2[j]) + heightSteps2[j] / 2,
                width: '75px',
                height: '75px',
                transform: 'translate(-120, 35)'
            })
            .on('click', (playerData, i, j) => this.props.onPlayerClick(awayTeam.id, d));

        tmpBg = awayGroup.selectAll('rect')
            .data(awayTeamPlayerData)
            .enter()
            .append('g')
            .selectAll('rect')
            .data((idList) => idList)
            .enter();

        tmpTxt = awayGroup.selectAll('text')
            .data(awayTeamPlayerData)
            .enter()
            .append('g')
            .selectAll('text')
            .data((idList) => idList)
            .enter();

            tmpBg
                .append('rect')
                .attr({
                    fill: 'rgba(0,0,0,0.75)',
                    x: (playerData, i, j) => {
                        if (perspective === 'true') {
                            return (svgWidth - j * widthStep2 - 125) + (((i * heightSteps2[j]) + heightSteps2[j] / 2) * 1 / svgHeight * 250);
                        }
                        return (svgWidth - j * widthStep2);
                    },
                    y: (playerData, i, j) => (i * heightSteps2[j]) + heightSteps2[j] / 2,
                    width: (playerData) => (playerData.name).length * 6.5, // TODO
                    height: 20,
                    // transform: (playerData) => 'translate('+(40 + (playerData.name).length * 6.5 < 75 ? (75-(playerData.name).length * 6.5) : 0)+', 110)'
                    transform: (playerData) => 'translate(-120, 110)'
                });
            tmpTxt
                .append('text')
                .text((playerData) => playerData.name)
                .attr({
                    fill: 'white',
                    x: (playerData, i, j) => {
                        if (perspective === 'true') {
                            return (svgWidth - j * widthStep2 - 125) + (((i * heightSteps2[j]) + heightSteps2[j] / 2) * 1 / svgHeight * 250);
                        }
                        return (svgWidth - j * widthStep2);
                    },
                    y: (playerData, i, j) => (i * heightSteps2[j]) + heightSteps2[j] / 2,
                    'font-size': 12,
                    transform: (playerData) => 'translate(-115, 124)'
                });

            tmpBg
                .append('rect')
                .attr({
                    fill: '#eee',
                    x: (playerData, i, j) => {
                        if (perspective === 'true') {
                            return (svgWidth - j * widthStep2 - 125) + (((i * heightSteps2[j]) + heightSteps2[j] / 2) * 1 / svgHeight * 250);
                        }
                        return (svgWidth - j * widthStep2);
                    },
                    y: (playerData, i, j) => (i * heightSteps2[j]) + heightSteps2[j] / 2,
                    width: 20, // TODO
                    height: 20,
                    transform: (playerData) => 'translate('+((playerData.name).length * 6.5 - 120)+', 110)'
                });

            tmpTxt
                .append('text')
                .text((playerData) => playerData.tShirtNr)
                .attr({
                    fill: 'black',
                    x: (playerData, i, j) => {
                        if (perspective === 'true') {
                            return (svgWidth - j * widthStep2 - 125) + (((i * heightSteps2[j]) + heightSteps2[j] / 2) * 1 / svgHeight * 250);
                        }
                        return (svgWidth - j * widthStep2);
                    },
                    y: (playerData, i, j) => (i * heightSteps2[j]) + heightSteps2[j] / 2,
                    'font-size': 14,
                    transform: (playerData) => 'translate('+((parseInt(playerData.tShirtNr) < 10 ? 6 : 4) + (playerData.name).length * 6.5 - 120)+', 125)'
                });

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
                        style={ this.props.perspective === 'true' ? {transform: 'perspective(1200px) rotateX(45deg)', position: 'absolute'} : {position: 'absolute'}}
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
                style={ this.props.perspective === 'true' ? {transform: 'perspective(1200px) rotateX(45deg)', position: 'absolute'} : {position: 'absolute'}}
                src="textures/default-field-texture.png"/>

        return (
                <div id="fieldContainer" style={{width:'1200px', height:'auto',left:'0px', position:'relative'}}>
                {SVGField2}
            </div>
        );
    }
}
