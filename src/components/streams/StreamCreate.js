import React from 'react';
import {connect} from 'react-redux';
import {createStream} from '../../actions';
import StreamForm from './StreamForm';

class StreamCreate extends React.Component {
    onSubmit = formValues => {
        this.props.createStream(formValues);
    };

    render() {
        return (
            <div>
                <StreamForm heading="Create a Stream" onSubmit={this.onSubmit}/>
            </div>
        );
    }
}

export default connect(
    null,
    {createStream}
)(StreamCreate);
