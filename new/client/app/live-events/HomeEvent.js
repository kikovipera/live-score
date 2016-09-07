import React, {PropTypes, Component} from 'react';

require('./LiveEvent.scss');

const HomeEvent = (props) => {
    let players = [];
    for (var i = 0; i < props.players.length; i++) {
        let player = props.players[i];
        players.push(
            <div className="SSUI-LiveEvent-Text" key={i}>
                <button className="SSUI-LiveEvent-Text-Button" onClick={props.onPlayerClick.bind(this, player)}>{player.name}</button>
            </div>
        );
    }

    return (
        <div className="SSUI-LiveEvent">
            <div className="SSUI-LiveEvent-Home">{players}</div>
            <div className="SSUI-LiveEvent-Logo"><img src={props.logoUrl}/></div>
            <div className="SSUI-LiveEvent-Time">{props.time}</div>
            <div className="SSUI-LiveEvent-Logo"></div>
            <div className="SSUI-LiveEvent-Away"></div>
        </div>
    );
};

export default HomeEvent;
