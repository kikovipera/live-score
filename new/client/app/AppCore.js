import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import LiveEvents from './live-events/LiveEvents';
import LiveEvent from './live-events/LiveEvent';
import Field2D from './field-2d/Field2D';
import Field3D from './field-3d/Field3D';
import PlayerDetails from './player-details/PlayerDetails';
require('./AppStyle.scss');

// <STLModel/>
// <Field2D/>



class Appl extends React.Component {
    modalStyle = {
      overlay : {
        position          : 'fixed',
        top               : 0,
        left              : 0,
        right             : 0,
        bottom            : 0,
        backgroundColor   : 'rgba(255, 255, 255, 0.75)'
      },
      content : {
        position                   : 'absolute',
        top                        : '40px',
        left                       : '40px',
        right                      : '40px',
        bottom                     : '40px',
        border                     : '1px solid #ccc',
        background                 : '#fff',
        overflow                   : 'auto',
        WebkitOverflowScrolling    : 'touch',
        borderRadius               : '4px',
        outline                    : 'none',
        padding                    : '20px',
        width: '300px'

      }
    };

    homeTeam = {
        id: 1,
        name: 'home Team',
        logoUrl: '/textures/barcelona-tshirt.png',
        playerPositionById: [
            [1],
            [2, 3, 4, 5],
            [6, 7],
            [8, 9, 10],
            [11]
        ],
        players: [
            {
                id: 1,
                name: 'player name',
                tShirtImgUrl: '/textures/barcelona-tshirt.png',
                tShirtNr: '1'
            },
            {
                id: 2,
                name: 'player name 2',
                tShirtImgUrl: '/textures/barcelona-tshirt.png',
                tShirtNr: '2'
            },
            {
                id: 3,
                name: 'player name 3',
                tShirtImgUrl: '/textures/barcelona-tshirt.png',
                tShirtNr: '3'
            },
            {
                id: 4,
                name: 'player name 4',
                tShirtImgUrl: '/textures/barcelona-tshirt.png',
                tShirtNr: '4'
            },
            {
                id: 5,
                name: 'player name 5',
                tShirtImgUrl: '/textures/barcelona-tshirt.png',
                tShirtNr: '5'
            },
            {
                id: 6,
                name: 'player name 6',
                tShirtImgUrl: '/textures/barcelona-tshirt.png',
                tShirtNr: '6'
            },
            {
                id: 7,
                name: 'player name 7',
                tShirtImgUrl: '/textures/barcelona-tshirt.png',
                tShirtNr: '7'
            },
            {
                id: 8,
                name: 'player name 8',
                tShirtImgUrl: '/textures/barcelona-tshirt.png',
                tShirtNr: '8'
            },
            {
                id: 9,
                name: 'player name 9',
                tShirtImgUrl: '/textures/barcelona-tshirt.png',
                tShirtNr: '9'
            },
            {
                id: 10,
                name: 'player 10',
                tShirtImgUrl: '/textures/barcelona-tshirt.png',
                tShirtNr: '10'
            },
            {
                id: 11,
                name: 'player 11',
                tShirtImgUrl: '/textures/barcelona-tshirt.png',
                tShirtNr: '11'
            }
        ]
    }

    awayTeam = {
        name: 'team away',
        logoUrl: '/textures/barcelona-tshirt.png'
    }

    matchData = {
        score: '2 - 1',
        time: '86\''
    }

    eventData = {
        logoUrl: '/textures/barcelona-tshirt.png',
        time: '30\'',
        players: [
            {
                id: 1,
                name: 'player 1'
            }
        ]
    }

    eventData2 = {
        logoUrl: '/textures/barcelona-tshirt.png',
        time: '31\'',
        players: [
            {
                id: 1,
                name: 'player 1'
            },
            {
                id: 2,
                name: 'player 2'
            }
        ]
    }

    soccerField = {
        width: 105,
        height: 68,
        textureUrl: 'textures/soccer.png'
    }

    iceHockeyField = {
        width: 68 * 2.15,
        height: 68,
        textureUrl: 'textures/icehockey.png'
    }

    playerClick = (player) => {
        this.setState({
            showModal: true,
            shouldUpdate: false,
            playerData: player,
            playerBioData: {
                'Age': '29',
                'Height': '1.85 cm',
                'Weight': '73 kg',
                'Nationality': 'Argentina'
            },
            playerStateData:  {
                'Age': '29',
                'Height': '1.85 cm',
                'Weight': '73 kg',
                'Nationality': 'Argentina'
            }

        })
        console.log(JSON.stringify(player));
    }

    closeModal = () => this.setState({showModal: false});

    events = [
        <LiveEvent type="home" {...this.eventData} key='1'  onPlayerClick={this.playerClick}/>,
        <LiveEvent type="home" {...this.eventData} key='2'  onPlayerClick={this.playerClick}/>,
        <LiveEvent type="away" {...this.eventData} key='3'  onPlayerClick={this.playerClick}/>,
        <LiveEvent type="home" {...this.eventData2} key='4' onPlayerClick={this.playerClick}/>,
        <LiveEvent type="home" {...this.eventData} key='5'  onPlayerClick={this.playerClick}/>,
        <LiveEvent type="home" {...this.eventData} key='6'  onPlayerClick={this.playerClick}/>,
        <LiveEvent type="away" {...this.eventData} key='7'  onPlayerClick={this.playerClick}/>,
        // <LiveEvent type="home" {...this.eventData2} key='8' onPlayerClick={playerClick}/>,
        // <LiveEvent type="home" {...this.eventData} key='9'  onPlayerClick={playerClick}/>,
        // <LiveEvent type="home" {...this.eventData} key='10'  onPlayerClick={playerClick}/>,
        // <LiveEvent type="away" {...this.eventData} key='11'  onPlayerClick={playerClick}/>,
        // <LiveEvent type="home" {...this.eventData2} key='12' onPlayerClick={playerClick}/>,
        // <LiveEvent type="home" {...this.eventData} key='13'  onPlayerClick={playerClick}/>,
        // <LiveEvent type="home" {...this.eventData} key='14'  onPlayerClick={playerClick}/>,
        // <LiveEvent type="away" {...this.eventData} key='15'  onPlayerClick={playerClick}/>,
        // <LiveEvent type="home" {...this.eventData2} key='16' onPlayerClick={playerClick}/>
    ];

    /*
    <LiveEvents homeTeam={homeTeam} awayTeam={awayTeam} matchData={matchData}>
        {events}
    </LiveEvents>
    */


    // <Field2D textureUrl="" perspective="true" onPlayerClick="" homeTeam={homeTeam} awayTeam={homeTeam}/>

    state = {
        showModal: false,
        shouldUpdate: true
    }

    render = () => (
        <div id="fieldContainer2" style={{width:'100%',height:'100%'}}>
            <Field3D field={this.soccerField} onPlayerClick={this.playerClick} homeTeam={this.homeTeam} awayTeam={this.homeTeam} shouldUpdate={this.state.shouldUpdate} />
            <Modal
                isOpen={this.state.showModal}
                style={this.modalStyle}
                onRequestClose={this.closeModal}
                >
                <PlayerDetails player={this.state.playerData} bio={this.state.playerBioData} stats={this.state.playerStateData} />
            </Modal>
        </div>
    );

}

ReactDOM.render((
    <Appl/>
), document.getElementById('app'));
