import React, {PropTypes, Component} from 'react';

require('./GameStats.scss');

const PlayerInfo = (props) => {
    let content = '';
    if (props.infoType === 'home') {
        return (
            <div className="SSUI-GameStats-Player">
                <div className="SSUI-GameStats-TShirtNr">
                    {props.player.tShirtNr}
                </div>
                <div className="SSUI-GameStats-PlayerName text-left">
                    <button className="SSUI-GameStats-Text-Button" onClick={props.onPlayerClick}>{props.player.name}</button>
                </div>
            </div>
        );

    }

    return (
        <div className="SSUI-GameStats-Player">
            <div className="SSUI-GameStats-PlayerName text-right">
                <button className="SSUI-GameStats-Text-Button" onClick={props.onPlayerClick}>{props.player.name}</button>
            </div>
            <div className="SSUI-GameStats-TShirtNr">
                {props.player.tShirtNr}
            </div>
        </div>
    );
}

const Players = (props) => {
    let players = [];
    for (var i = 0; i < props.players.length; i++) {
        let player = props.players[i];
        players.push(
            <PlayerInfo infoType={props.team} player={player} onPlayerClick={props.onPlayerClick.bind(this, player)} key={i}/>
        );
    }

    return (
        <div className="SSUI-GameStats-Zone bigger">
            {players}
        </div>
    );
}

const StatInfo = (props) => (
    <div className="SSUI-GameStats-Stats">
        <div className="SSUI-GameStats-Stats-Number">
            {props.data.home}
        </div>
        <div className="SSUI-GameStats-Stats-Type">
            {props.data.type}
        </div>
        <div className="SSUI-GameStats-Stats-Number">
            {props.data.away}
        </div>
    </div>
)

const Stats = (props) => {
    let stats = [];
    for (var i = 0; i < props.stats.length; i++) {
        let stat = props.stats[i];
        stats.push(
            <StatInfo data={stat} key={i}/>
        );
    }

    return (
        <div className="SSUI-GameStats-Zone">
            {stats}
        </div>
    );
}

const GameStats = (props) => (
    <div className="SSUI-GameStats">
        <Players team="home" players={props.homePlayers} onPlayerClick={props.onPlayerClick}/>
        <Stats stats={props.stats}/>
        <Players team="away" players={props.awayPlayers} onPlayerClick={props.onPlayerClick}/>
    </div>
)

export default GameStats;
