import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';

require('./LiveEvents.scss');

export default class LiveEvents extends Component {

    state = {
        expanded: false
    }

    // handleResize(e) {
    //     this.setState({
    //         modelChanged: false,
    //         windowWidth: window.innerWidth
    //     });
    //     this.refs.STLViewer.applyResize();
    // }
    //
    // componentDidMount() {
    //     window.addEventListener('resize', this.handleResize.bind(this));
    // }

    render() {
        return (
            <div className="SSUI-LiveEvents">
                <div className="SSUI-LiveEvents-Header">
                    <div className="SSUI-LiveEvents-Header-Home">
                        <div className="SSUI-LiveEvents-Header-Row">
                            <div className="SSUI-LiveEvents-Header-Logo">
                                <img src={this.props.homeTeam.logoUrl}/>
                            </div>
                        </div>
                        <div className="SSUI-LiveEvents-Header-Row">
                            <div className="SSUI-LiveEvents-Header-Text">
                                <span>{this.props.homeTeam.name}</span>
                            </div>
                        </div>
                    </div>
                    <div className="SSUI-LiveEvents-Header-Data">
                        <div className="SSUI-LiveEvents-Header-Row">
                            <div className="SSUI-LiveEvents-Header-Data-Score">
                                {this.props.matchData.score}
                            </div>
                        </div>
                        <div className="SSUI-LiveEvents-Header-Row">
                            <div className="SSUI-LiveEvents-Header-Data-Time">
                                {this.props.matchData.time}
                            </div>
                        </div>
                    </div>
                    <div className="SSUI-LiveEvents-Header-Away">
                        <div className="SSUI-LiveEvents-Header-Row">
                            <div className="SSUI-LiveEvents-Header-Logo">
                                <img src={this.props.awayTeam.logoUrl}/>
                            </div>
                        </div>
                        <div className="SSUI-LiveEvents-Header-Row">
                            <div className="SSUI-LiveEvents-Header-Text">
                                <span>{this.props.awayTeam.name}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
