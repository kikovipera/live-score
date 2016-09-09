import React from 'react';
import ReactDOM from 'react-dom';
import STLModel from './STLModel';
import Field2D from './2d/field2d';
require('./AppStyle.scss');

import LiveEvents from './live-events/LiveEvents';
import LiveEvent from './live-events/LiveEvent';

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
    <LiveEvent type="home" {...eventData} key='1'  onPlayerClick={playerClick}/>,
    <LiveEvent type="home" {...eventData} key='2'  onPlayerClick={playerClick}/>,
    <LiveEvent type="away" {...eventData} key='3'  onPlayerClick={playerClick}/>,
    <LiveEvent type="home" {...eventData2} key='4' onPlayerClick={playerClick}/>
];

ReactDOM.render((
    <div id="fieldContainer2" style={{width:'100%',height:'100%'}}>
        <LiveEvents homeTeam={homeTeam} awayTeam={awayTeam} matchData={matchData}>
            {events}
        </LiveEvents>
    </div>
), document.getElementById('app'));
