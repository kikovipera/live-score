import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
// import Modal from 'react-modal'; // TODO remove
import FileInput from './file-reader-input';
import STLViewer from './STLViewer';

export default class Field3D extends Component {

    state = {
        windowWidth: window.innerWidth
    }

    handleResize(e) {
        this.setState({
            modelChanged: false,
            windowWidth: window.innerWidth
        });
        this.refs.STLViewer.applyResize();
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    render() {
        return (
            <div>
                <STLViewer
                    width={window.innerWidth}
                    height={window.innerHeight}
                    backgroundColor='#364049'
                    rotate={true}
                    orbitControls={true}
                    {...this.props}
                    ref="STLViewer"/>
            </div>
        );
    }
}
