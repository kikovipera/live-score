import React from 'react';
import ReactDOM from 'react-dom';
import STLModel from './STLModel';
import Field2D from './2d/field2d';
require('./AppStyle.scss');

// <STLModel/>
ReactDOM.render((
    <div id="fieldContainer2" style={{width:'1150px',height:'720px'}}>
        <Field2D/>
    </div>
), document.getElementById('app'));
