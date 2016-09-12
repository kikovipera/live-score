import React from 'react';
import ReactDOM from 'react-dom';
import STLModel from './STLModel';
import Field2D from './field-2d/Field2D';
require('./AppStyle.scss');

import LiveEvents from './live-events/LiveEvents';
import LiveEvent from './live-events/LiveEvent';

// <STLModel/>
// <Field2D/>

const homeTeam = {
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

const awayTeam = {
    name: 'team away',
    logoUrl: '/textures/barcelona-tshirt.png'
}

const matchData = {
    score: '2 - 1',
    time: '86\''
}

const eventData = {
    logoUrl: '/textures/barcelona-tshirt.png',
    time: '30\'',
    players: [
        {
            id: 1,
            name: 'player 1'
        }
    ]
}

const eventData2 = {
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

const playerClick = (player) => {
    alert(JSON.stringify(player));
}

const events = [
    <LiveEvent type="home" {...eventData} key='1'  onPlayerClick={playerClick}/>,
    <LiveEvent type="home" {...eventData} key='2'  onPlayerClick={playerClick}/>,
    <LiveEvent type="away" {...eventData} key='3'  onPlayerClick={playerClick}/>,
    <LiveEvent type="home" {...eventData2} key='4' onPlayerClick={playerClick}/>,
    <LiveEvent type="home" {...eventData} key='5'  onPlayerClick={playerClick}/>,
    <LiveEvent type="home" {...eventData} key='6'  onPlayerClick={playerClick}/>,
    <LiveEvent type="away" {...eventData} key='7'  onPlayerClick={playerClick}/>,
    // <LiveEvent type="home" {...eventData2} key='8' onPlayerClick={playerClick}/>,
    // <LiveEvent type="home" {...eventData} key='9'  onPlayerClick={playerClick}/>,
    // <LiveEvent type="home" {...eventData} key='10'  onPlayerClick={playerClick}/>,
    // <LiveEvent type="away" {...eventData} key='11'  onPlayerClick={playerClick}/>,
    // <LiveEvent type="home" {...eventData2} key='12' onPlayerClick={playerClick}/>,
    // <LiveEvent type="home" {...eventData} key='13'  onPlayerClick={playerClick}/>,
    // <LiveEvent type="home" {...eventData} key='14'  onPlayerClick={playerClick}/>,
    // <LiveEvent type="away" {...eventData} key='15'  onPlayerClick={playerClick}/>,
    // <LiveEvent type="home" {...eventData2} key='16' onPlayerClick={playerClick}/>
];

/*
<LiveEvents homeTeam={homeTeam} awayTeam={awayTeam} matchData={matchData}>
    {events}
</LiveEvents>
*/



ReactDOM.render((
    <div id="fieldContainer2" style={{width:'100%',height:'100%'}}>
        <Field2D textureUrl="" perspective="false" showPlayerName="true" showTShirtNr="true" onPlayerClick="" homeTeam={homeTeam} awayTeam={homeTeam}/>
    </div>
), document.getElementById('app'));
