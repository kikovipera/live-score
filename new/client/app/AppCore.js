import React from 'react';
import ReactDOM from 'react-dom';
import STLModel from './STLModel';
import Field2D from './2d/field2d';
require('./AppStyle.scss');

import LiveEvents from './live-events/LiveEvents';
import HomeEvent from './live-events/HomeEvent';
import AwayEvent from './live-events/AwayEvent';

// <STLModel/>
// <Field2D/>

const homeTeam = {
    name: 'team 1',
    logoUrl: '/textures/barcelona-tshirt.png'
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
    <HomeEvent {...eventData} key='1'  onPlayerClick={playerClick}/>,
    <HomeEvent {...eventData} key='2'  onPlayerClick={playerClick}/>,
    <AwayEvent {...eventData} key='3'  onPlayerClick={playerClick}/>,
    <HomeEvent {...eventData2} key='4' onPlayerClick={playerClick}/>
];

ReactDOM.render((
    <div id="fieldContainer2" style={{width:'1150px',height:'720px'}}>
        <LiveEvents homeTeam={homeTeam} awayTeam={awayTeam} matchData={matchData}>
            {events}
        </LiveEvents>
    </div>
), document.getElementById('app'));
