import React, {PropTypes, Component} from 'react';

require('./TeamsTable.scss');

const StatInfo = (props) => (
    <div className="SSUI-TeamsTable-Stats-Units">
        {props.value}
    </div>
)

const Stats = (props) => {
    let stats = [];
    for (var i = 0; i < props.stats.length; i++) {
        let stat = props.stats[i];
        stats.push(
            <StatInfo value={stat} key={i}/>
        );
    }

    return (
        <div className="SSUI-TeamsTable-Stats">
            {stats}
        </div>
    );
}

const TeamRow = (props) => (
    <div className="SSUI-TeamsTable-TeamRow">
        <div className="SSUI-TeamsTable-TeamRow-Rank">
            {props.rank}
        </div>
        <div className="SSUI-TeamsTable-TeamRow-Logo">
            <img src={props.logoUrl}></img>
        </div>
        <div className="SSUI-TeamsTable-TeamRow-Name">
            {props.name}
        </div>
        <Stats stats={props.stats}/>
    </div>
)

const HeaderRow = (props) => (
    <div className="SSUI-TeamsTable-HeaderRow">
        <div className="SSUI-TeamsTable-TeamRow-Rank">
        </div>
        <div className="SSUI-TeamsTable-TeamRow-Logo">
        </div>
        <div className="SSUI-TeamsTable-TeamRow-Name">
        </div>
        <Stats stats={props.headerData}/>
    </div>
)

const TeamRows = (props) => {
    console.log(props.teams, props.teams.length, 'kokook');
    let teams = [];
    teams.push(<HeaderRow headerData={props.headerData}/>);
    for (var i = 0; i < props.teams.length; i++) {
        let team = props.teams[i];
        teams.push(
            <TeamRow logoUrl={team.logoUrl} name={team.name} stats={team.stats} rank={(i+1)} key={i}/>
        );
    }

    return (
        <div className="SSUI-TeamsTable-Teams">
            {teams}
        </div>
    );
}

const TeamsTable = (props) => (
    <div className="SSUI-TeamsTable">
        <TeamRows teams={props.data} headerData={['A', 'B', 'V', 'P', 'D']}/>
    </div>
)

export default TeamsTable;
