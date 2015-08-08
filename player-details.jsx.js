/** @jsx React.DOM */

var Wrapper = React.createClass({

    getInitialState: function () {
        return {
            player: testPlayerData
        };
    },

    render: function () {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-3">
                        <PlayerImg src={this.state.player.img} />
                        <PlayerBio data={this.state.player.bio} />
                    </div>
                    <div className="col-sm-3">
                        <PlayerStats data={this.state.player.stats} />
                    </div>
                    <div className="col-sm-6">
                        <SvgContainer match={this.state.player.heatMap} containerId='svg-holder' />
                    </div>
                </div>
            </div>
        );
    }
});

var PlayerImg = React.createClass({
    render: function () {
        return (
            <div className="row">
                <img src={this.props.src}></img>
            </div>
        );
    }
});

var PlayerBioLine = React.createClass({
    render: function () {
        return (
            <div className="row">
                <div className="col-xs-6">
                    <span>{this.props.propName}</span>
                </div>
                <div className="col-xs-6">
                    <span>{this.props.propValue}</span>
                </div>  
            </div>
        );
    }
});

var PlayerBio = React.createClass({
    render: function () {

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
    getInitialState: function () {
        return {
            a: 'gigi'
        };
    },
    componentWillReceiveProps: function(nextProps) {
  this.setState({
    a: nextProps.teamData
  });
},
        render: function () {
        console.log(this.props.teamData, this.props.tShirtData, this.props, ' WWWWW');
        return (
            <div className="modal fade" id="myModal" role="dialog">
                <div className="modal-dialog modal-sm">
                  <div className="modal-content">
                    <div className="modal-header">
                      <button type="button" className="close" data-dismiss="modal">&times;</button>
                      <h4 className="modal-title">{this.props.teamData} {this.state.a}</h4>
                    </div>
                    <div className="modal-body">
                      <p>{this.props.tShirtData}</p>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
            </div>

        );
        return (
            <div className="modal fade" id="myModal" role="dialog">
                <div className="modal-dialog modal-sm">
                  <div className="modal-content">
                    <div className="modal-header">
                      <button type="button" className="close" data-dismiss="modal">&times;</button>
                      <h4 className="modal-title">{this.props.teamData}</h4>
                    </div>
                    <div className="modal-body">
                      <p className={'aaa' + a}>{this.props.tShirtData}</p>
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
            teamClicked: '',
            tShirtNrClicked: '',
            showTShirtNr: true
        };
    },
    handlePlayerClick: function (team, tShirtNr) {
        this.setState({
            teamClicked: team,
            tShirtNrClicked: tShirtNr
        });
        console.log(this.state);
        $('#myModal').modal('show');
    },
    componentDidMount: function () {
        var containerId = '#' + this.props.containerId;
        createField(containerId);
        displayTShirts(this.props.match.field, containerId, this.state.showTShirtNr, this.handlePlayerClick);
    },
    render: function () {
        return(
            <div id={this.props.containerId}>
                <Tooltip teamData={this.state.teamClicked} tShirtData={this.state.tShirtNrClicked} />
            </div>);
    }
});

React.render(<Wrapper />, document.getElementById('app'));