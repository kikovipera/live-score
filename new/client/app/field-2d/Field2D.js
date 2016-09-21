import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';
require('./Field2D.scss');

export default class Field2D extends Component {

    state = {
        windowWidth: window.innerWidth
    }

    shouldComponentUpdate = (nextProps, nextState) => nextProps.shouldUpdate;

    handleResize = (e) => {
        this.setState({
            windowWidth: window.innerWidth
        });
    }

    componentDidMount = () => {
        window.addEventListener('resize', this.handleResize);
        this.displayTShirts();
    }

    getPlayerById = (playerId, teamData) => {
        let result = teamData.players.filter((player) => Number(player.id) === Number(playerId))[0];
        return result;
    }

    displayTShirts = () => {
        let perspective = this.props.perspective || true;

        let svg = d3.select('#fieldContainer').append('svg');

        svg.attr({
            viewBox: '0 0 ' +  this.props.field.width + ' ' + this.props.field.height,
            id: 'svg-names'
        });

        let svgWidth = this.props.field.width;
        let svgHeight = this.props.field.height / 1.3;
        let halfSvgWidth = svgWidth / 2;
        let widthStep1 = halfSvgWidth / this.props.homeTeam.playerPositionById.length;
        let widthStep2 = halfSvgWidth / this.props.awayTeam.playerPositionById.length;
        let heightSteps1 = this.props.homeTeam.playerPositionById.map((elem) => parseInt(svgHeight / (elem.length)));
        let heightSteps2 = this.props.awayTeam.playerPositionById.map((elem) => parseInt(svgHeight / (elem.length)));
        let homeTeamPlayerData = this.props.homeTeam.playerPositionById.map((idList)=>idList.map((id)=>this.getPlayerById(id, this.props.homeTeam)));
        let awayTeamPlayerData = this.props.awayTeam.playerPositionById.map((idList)=>idList.map((id)=>this.getPlayerById(id, this.props.awayTeam)));

        let homeTeamXCoord = (playerData, i, j) => {
            if (perspective === 'true') {
                return (j * widthStep1 + svgWidth / 15) - (((i * heightSteps1[j]) + heightSteps1[j] / 2) * 1 / svgHeight * (svgHeight / 3.6));
            }
            return (j * widthStep1);
        };
        let homeTeamYCoord = (playerData, i, j) => (i * heightSteps1[j]) + heightSteps1[j] / 2;
        let awayTeamXCoord = (playerData, i, j) => {
            if (perspective === 'true') {
                return (svgWidth - j * widthStep2 - svgWidth / 12) + (((i * heightSteps2[j]) + heightSteps2[j] / 2) * 1 / svgHeight * (svgHeight / 2.2));
            }
            return (svgWidth - j * widthStep2);
        };
        let awayTeamYCoord = (playerData, i, j) => (i * heightSteps2[j]) + heightSteps2[j] / 2;

        // HOME

        let homeGroup = svg.append('g');
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
                x: homeTeamXCoord,
                y: homeTeamYCoord,
                width: '75px',
                height: '75px',
                transform: 'translate(10, 35)'
            })
            .on('click', (playerData, i, j) => this.props.onPlayerClick(playerData));

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
                x: homeTeamXCoord,
                y: homeTeamYCoord,
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
                x: homeTeamXCoord,
                y: homeTeamYCoord,
                'font-size': 12,
                transform: 'translate(25, 124)'
            });

        tmpBg
            .append('rect')
            .attr({
                fill: '#eee',
                x: homeTeamXCoord,
                y: homeTeamYCoord,
                width: 20, // TODO
                height: 20,
                transform: 'translate(0, 110)'
            });

        tmpTxt
            .append('text')
            .text((playerData) => playerData.tShirtNr)
            .attr({
                fill: 'black',
                x: homeTeamXCoord,
                y: homeTeamYCoord,
                'font-size': 14,
                transform: (playerData) => 'translate('+(parseInt(playerData.tShirtNr) < 10 ? 6 : 4)+', 125)'
            });


        // AWAY

        let awayGroup = svg.append('g');
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
                x: awayTeamXCoord,
                y: awayTeamYCoord,
                width: '75px',
                height: '75px',
                transform: 'translate(-120, 35)'
            })
            .on('click', (playerData, i, j) => this.props.onPlayerClick(playerData));

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
                    x: awayTeamXCoord,
                    y: awayTeamYCoord,
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
                    x: awayTeamXCoord,
                    y: awayTeamYCoord,
                    'font-size': 12,
                    transform: (playerData) => 'translate(-115, 124)'
                });

            tmpBg
                .append('rect')
                .attr({
                    fill: '#eee',
                    x: awayTeamXCoord,
                    y: awayTeamYCoord,
                    width: 20, // TODO
                    height: 20,
                    transform: (playerData) => 'translate('+((playerData.name).length * 6.5 - 120)+', 110)'
                });

            tmpTxt
                .append('text')
                .text((playerData) => playerData.tShirtNr)
                .attr({
                    fill: 'black',
                    x: awayTeamXCoord,
                    y: awayTeamYCoord,
                    'font-size': 14,
                    transform: (playerData) => 'translate('+((parseInt(playerData.tShirtNr) < 10 ? 6 : 4) + (playerData.name).length * 6.5 - 120)+', 125)'
                });

    }

    render() {

        // style="transform: perspective(1200px) rotateX(45deg);"


        // let SVGField2 = <svg
        //                 viewBox="0 0 1150 720"
        //                 id="svg-field"
        //                 stroke="black"
        //                 style={ this.props.perspective === 'true' ? {transform: 'perspective(1200px) rotateX(45deg)', position: 'absolute'} : {position: 'absolute'}}
        //                 >
        //         <rect x="0" y="0" width="1150" height="720" fill="green"></rect>
        //         <path d="M 575,20 L 50,20 50,700 1100,700 1100,20 575,20 575,700 z" stroke="white" strokeWidth="2" fill="green"></path>
        //             <circle cx="575" cy="360" r="91.5" stroke="white" strokeWidth="2" fillOpacity="0"></circle>
        //             <circle cx="575" cy="360" r="2" stroke="white" fill="white"></circle>
        //             <circle cx="160" cy="360" r="2" stroke="white" fill="white"></circle>
        //             <circle cx="990" cy="360" r="2" stroke="white" fill="white"></circle>
        //             <path d="M 50,324.4 L 40,324.4 40, 396.6 50 396.6 z" stroke="white" strokeWidth="2" fillOpacity="0"></path>
        //             <path d="M 1100,324.4 L 1110,324.4 1110,396.6 1100,396.6 z" stroke="white" strokeWidth="2" fillOpacity="0"></path>
        //             <path d="M 50,269.4 L 105,269.4 105,451.6 50 451.6 z" stroke="white" strokeWidth="2" fillOpacity="0"></path>
        //             <path d="M 1100,269.4 L 1045,269.4 1045,451.6 1100,451.6 z" stroke="white" strokeWidth="2" fillOpacity="0"></path>
        //             <path d="M 50,159.4 L 215,159.4 215,561.6 50 561.6 z" stroke="white" strokeWidth="2" fillOpacity="0"></path>
        //             <path d="M 1100,159.4 L 935,159.4 935,561.6 1100,561.6 z" stroke="white" strokeWidth="2" fillOpacity="0"></path>
        //             <path d="M 215,286.875 A 91.5,91.5 0 0,1 215,433.125 z" stroke="white" strokeWidth="2" fill="green"></path>
        //             <path d="M 935,286.875 A 91.5,91.5 0 0,0 935,433.125 z" stroke="white" strokeWidth="2" fill="green"></path>
        //             <path d="M 50,30 A 10,10 0 0,0 60,20 L 50,20 z" stroke="white" strokeWidth="2" fillOpacity="0"></path>
        //             <path d="M 60,700 A 10,10 0 0,0 50,690 L 50,700 z" stroke="white" strokeWidth="2" fillOpacity="0"></path>
        //             <path d="M 1100,690 A 10,10 0 0,0 1090,700 L 1100,700 z" stroke="white" strokeWidth="2" fillOpacity="0"></path>
        //             <path d="M 1090,20 A 10,10 0 0,0 1100,30 L 1100,20 z" stroke="white" strokeWidth="2" fillOpacity="0"></path>
        //         </svg>

        let field = <img
                width={this.props.field.width} height={this.props.field.hright}
                style={this.props.perspective === 'true' ? {transform: 'perspective(' + this.props.field.width + 'px) rotateX(45deg)', position: 'absolute'} : {position: 'absolute'}}
                src={this.props.field.textureUrl} type="image/svg+xml"/>

        return (
                <div id="fieldContainer" style={{width: this.props.field.width + 'px', height:'auto', left:'0px', position:'relative'}}>
                {field}
            </div>
        );
    }
}
