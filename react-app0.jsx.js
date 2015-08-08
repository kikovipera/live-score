/** @jsx React.DOM */

var Wrapper = React.createClass({

    getInitialState: function () {
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
            <Grid>
                <Row>
                    <Col sm={4}>
                        <ScoreBox teams={this.state.match.teams} score={this.state.match.score} time={this.state.match.time} />
                        <EventsBox events={this.state.match.events} />
                    </Col>
                    <Col sm={8} smPush={1} >
                        <Row>
                            <Col sm={1}>
                            </Col>
                            <Col sm={10}>
                                <SvgContainer match={this.state.match} containerId='svg-holder' />
                            </Col>
                            <Col sm={1}>
                            </Col>
                        </Row>
                        <Row>
                            <div className="teams-details">
                                <HomePlayers players={this.state.match.players.homePlayers} playerNrs={this.state.match.players.homePlayersNr} team="home" />
                                <Stats stats={this.state.match.stats} />
                                <HomePlayers players={this.state.match.players.awayPlayers} playerNrs={this.state.match.players.awayPlayersNr} team="away"/>
                            </div>
                        </Row>
                    </Col>
                </Row>
            </Grid>
        );
    }
});

var ScoreBox = React.createClass({
    render: function () {
        return (
            <Row className="score-box">
                <Col xs={4} className="team">
                    <Row>
                        <Col xs={12} className="img-holder">
                            <img src={this.props.teams.logos[0]} alt="" width="50" height="50" />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <span>{this.props.teams.names[0]}</span>
                        </Col>
                    </Row>
                </Col>
                <Col xs={4} className="info text-center">
                    <Row className="score">
                        <Col xs={6}>
                            <span className={this.props.score.home > this.props.score.away ? 'winner' : 'loser'}>{this.props.score.home}</span>
                        </Col>
                        <Col xs={6}>
                            <span className={this.props.score.home < this.props.score.away ? 'winner' : 'loser'}>{this.props.score.away}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} className="time">
                            <span>{this.props.time}</span>
                        </Col>
                    </Row>
                </Col>
                <Col xs={4} className="team">
                    <Row>
                        <Col xs={12} className="img-holder">
                            <img src={this.props.teams.logos[1]} alt="" width="50" height="50" />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <span>{this.props.teams.names[1]}</span>
                        </Col>
                    </Row>
                </Col>
            </Row>
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
                    <Row>
                        <span>{this.props.event.players[0]}</span>
                    </Row>
                    <Row>
                        <span>{this.props.event.players[1]}</span>
                    </Row>
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
                    <Row>
                        <img className="small-img" src="leave.png" alt="leave" />
                    </Row>
                    <Row>
                        <img className="small-img" src="enter.png" alt="enter" />
                    </Row>
                </div>
            );
        }
        return false;
    }
});

var EventDes = React.createClass({
    render: function () {
            return (
                <Row>
                    <Col xs={4} className="left-details">
                        <EventPlayer event={this.props.event} location="home" />
                    </Col>
                    <Col xs={1} className="left-details">
                        <EventImg event={this.props.event} location="home" />
                    </Col>
                    <Col xs={2} className="center-details">
                        <span>{this.props.event.time + '\''}</span>
                    </Col>
                    <Col xs={1} className="right-details">
                        <EventImg event={this.props.event} location="away" />
                    </Col>
                    <Col xs={4} className="right-details">
                        <EventPlayer event={this.props.event} location="away" />
                    </Col>
                </Row>
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
            <Row className="row details-row">
                <Col xs={12} className="details">
                    {events}
                </Col>
            </Row>
        );
    }
});

var HomePlayer = React.createClass({
    render: function () {
        if (this.props.team === 'home') {
            return (
                <Row>
                    <Col xs={2} className="tshirt-nr">
                        <span className="">{this.props.playerNr}</span>
                    </Col>
                    <Col xs={10} >
                        <span>{this.props.playerName}</span>
                    </Col>
                </Row>
            );
        } else {
            return (
                <Row>
                    <Col xs={10}>
                        <span>{this.props.playerName}</span>
                    </Col>
                    <Col xs={2} className="tshirt-nr">
                        <span className="">{this.props.playerNr}</span>
                    </Col>
                </Row>
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
            <Col xs={4} className={'list-players ' + 'list-players-' + this.props.team}>
                {players}
            </Col>
        );
    }
});

var Stat = React.createClass({
    render: function () {
        return (
                <Row>
                    <Col xs={3}><span>{this.props.stat.home}</span></Col>
                    <Col xs={6}><span>{this.props.stat.name}</span></Col>
                    <Col xs={3}><span>{this.props.stat.away}</span></Col>
                </Row>
        );
    }
});


var Stats = React.createClass({
    render: function () {
        var stats = this.props.stats.map(function (stat, i) {
            return <Stat stat={stat} />
        }, this);

        return (
            <Col xs={4} className="stats-col list-players">
                {stats}
            </Col>
        );
    }
});

var Tooltip = React.createClass({
        render: function () {
        console.log(this.props.teamData, this.props.tShirtData, this.props, ' WWWWW');
        var a = this.props.teamData;
        return (
            <div className='static-modal'>
                <Modal.Dialog>
                  <Modal.Header>
                    <Modal.Title>Modal title</Modal.Title>
                  </Modal.Header>

                  <Modal.Body>
                    One fine body...
                  </Modal.Body>

                  <Modal.Footer>
                    <Button>Close</Button>
                    <Button bsStyle='primary'>Save changes</Button>
                  </Modal.Footer>

                </Modal.Dialog>
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
