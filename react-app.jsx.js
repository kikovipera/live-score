/** @jsx React.DOM */

var Wrapper = React.createClass({

    getInitialState: function () {
        console.log(testData);
        return {
            match: testData
        };
    },

    componentDidMount: function () {
        // createField('#svg-holder');
        // displayTShirts(match.field, '#svg-holder');
    },

    render: function () {
        return (
            <div className="container">
                <Tooltip />
                <div className="row">
                    <div className="col-sm-4">
                        <ScoreBox teams={this.state.match.teams} score={this.state.match.score} time={this.state.match.time} />
                        <EventsBox events={this.state.match.events} />
                    </div>
                    <div className="col-sm-7 col-sm-push-1">
                        <div className="row">
                            <div className="col-sm-1">
                            </div>
                            <div className="col-sm-10">
                                <SvgContainer match={this.state.match} containerId='svg-holder' />
                            </div>
                            <div className="col-sm-1">
                            </div>
                        </div>
                        <div className="row">
                            <div className="teams-details">
                                <HomePlayers players={this.state.match.players.homePlayers} playerNrs={this.state.match.players.homePlayersNr} team="home" />
                                <Stats stats={this.state.match.stats} />
                                <HomePlayers players={this.state.match.players.awayPlayers} playerNrs={this.state.match.players.awayPlayersNr} team="away"/>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
});

var ScoreBox = React.createClass({
    render: function () {
        return (
            <div className="row score-box">
                <div className="col-xs-4 team">
                    <div className="row">
                        <div className="col-xs-12 img-holder">
                            <img src={this.props.teams.logos[0]} alt="" width="50" height="50" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <span>{this.props.teams.names[0]}</span>
                        </div>
                    </div>
                </div>
                <div className="col-xs-4 info text-center">
                    <div className="row score">
                        <div className="col-xs-6">
                            <span className={this.props.score.home > this.props.score.away ? 'winner' : 'loser'}>{this.props.score.home}</span>
                        </div>
                        <div className="col-xs-6">
                            <span className={this.props.score.home < this.props.score.away ? 'winner' : 'loser'}>{this.props.score.away}</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 time">
                            <span>{this.props.time}</span>
                        </div>
                    </div>
                </div>
                <div className="col-xs-4 team">
                    <div className="row">
                        <div className="col-xs-12 img-holder">
                            <img src={this.props.teams.logos[1]} alt="" width="50" height="50" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <span>{this.props.teams.names[1]}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

var EventPlayer = React.createClass({
    render: function () {

        if (this.props.location === 'home' && this.props.event.team === 1) {
            return false;
        }

        if (this.props.location === 'away' && this.props.event.team === 0) {
            return false;
        }

        if (this.props.event.type !== 3) {
            return (
                <span>{this.props.event.players[0]}</span>
            );
        } else {
            return (
                <div>
                    <div className="row">
                        <span>{this.props.event.players[0]}</span>
                    </div>
                    <div className="row">
                        <span>{this.props.event.players[1]}</span>
                    </div>
                </div>
            );
        }

        return false;
    }
});

var EventImg = React.createClass({
    render: function () {

        if (this.props.location === 'home' && this.props.event.team === 1) {
            return false;
        }

        if (this.props.location === 'away' && this.props.event.team === 0) {
            return false;
        }

        if (this.props.event.type === 0) {
            return (
                <img src="goal2.png" alt="" width="15" height="15" />
            );
        } else if (this.props.event.type === 1) {
            return (
                <img src="yellow-card.png" alt="yellow card" />
            );
        } else if (this.props.event.type === 2) {
            return (
                <img src="red-card.png" alt="red card" />
            );
        } else if (this.props.event.type === 3) {
            return (
                <div>
                    <div className="row">
                        <img className="small-img" src="leave.png" alt="leave" />
                    </div>
                    <div className="row">
                        <img className="small-img" src="enter.png" alt="enter" />
                    </div>
                </div>
            );
        }
        return false;
    }
});

var EventDes = React.createClass({
    render: function () {
            return (
                <div className="row">
                    <div className="col-xs-4 left-details">
                        <EventPlayer event={this.props.event} location="home" />
                    </div>
                    <div className="col-xs-1 left-details">
                        <EventImg event={this.props.event} location="home" />
                    </div>
                    <div className="col-xs-2 center-details">
                        <span>{this.props.event.time + '\''}</span>
                    </div>
                    <div className="col-xs-1 right-details">
                        <EventImg event={this.props.event} location="away" />
                    </div>
                    <div className="col-xs-4 right-details">
                        <EventPlayer event={this.props.event} location="away" />
                    </div>
                </div>
            );
        }

    }
);

var EventsBox = React.createClass({
    render : function() {
        var events = this.props.events.map(function (event) {
            return (<EventDes event={event} />);
        }, this);

        return (
            <div className="row details-row">
                <div className="col-xs-12 details">
                    {events}
                </div>
            </div>
        );
    }
});

var HomePlayer = React.createClass({
    render: function () {
        if (this.props.team === 'home') {
            return (
                <div className="row">
                    <div className="col-xs-2 tshirt-nr">
                        <span className="">{this.props.playerNr}</span>
                    </div>
                    <div className="col-xs-10">
                        <span>{this.props.playerName}</span>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="row">
                    <div className="col-xs-10">
                        <span>{this.props.playerName}</span>
                    </div>
                    <div className="col-xs-2 tshirt-nr">
                        <span className="">{this.props.playerNr}</span>
                    </div>
                </div>
            );
        }
    }
});

var HomePlayers = React.createClass({
    render: function () {
        var players = this.props.players.map(function (player, i) {
            return <HomePlayer playerName={player} playerNr={this.props.playerNrs[i]} team={this.props.team} />
        }, this);

        return (
            <div className={'col-sm-4 list-players ' + 'list-players-' + this.props.team}>
                {players}
            </div>
        );
    }
});

var Stat = React.createClass({
    render: function () {
        return (
                <div className="row">
                    <div className="col-xs-3"><span>{this.props.stat.home}</span></div>
                    <div className="col-xs-6"><span>{this.props.stat.name}</span></div>
                    <div className="col-xs-3"><span>{this.props.stat.away}</span></div>
                </div>
        );
    }
});


var Stats = React.createClass({
    render: function () {
        var stats = this.props.stats.map(function (stat, i) {
            return <Stat stat={stat} />
        }, this);

        return (
            <div className="col-sm-4 stats-col list-players">
                {stats}
            </div>
        );
    }
});

var Tooltip = React.createClass({
    render: function () {
        return (
            <div className="modal fade" id="myModal" role="dialog">
                <div className="modal-dialog modal-sm">
                  <div className="modal-content">
                    <div className="modal-header">
                      <button type="button" className="close" data-dismiss="modal">&times;</button>
                      <h4 className="modal-title">Modal Header</h4>
                    </div>
                    <div className="modal-body">
                      <p>This is a small modal.</p>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
          </div>
        );
    }
});

var SvgContainer = React.createClass({
    getInitialState: function () {
        return {
            playerClicked: '',
            showTShirtNr: true
        };
    },
    handlePlayerClick: function (data) {
        this.setState({
            playerClicked: data
        });
        $('#myModal').modal('show');
        console.log(data, this.state);
    },
    componentDidMount: function () {
        var containerId = '#' + this.props.containerId;
        createField(containerId);
        displayTShirts(this.props.match.field, containerId, this.state.showTShirtNr, this.handlePlayerClick);
    },
    render: function () {
        return(
            <div id={this.props.containerId}>
                <Tooltip playerData={this.state.playerClicked} />
            </div>);
    }
});

React.render(<Wrapper />, document.getElementById('app'));
