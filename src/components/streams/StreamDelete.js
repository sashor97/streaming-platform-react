import React from 'react';
import Modal from '../Modal'
import history from '../../history'
import {connect} from "react-redux";
import {deleteStream, fetchStream} from "../../actions";
import {Link} from 'react-router-dom';

class StreamDelete extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    renderContent() {
        if (!this.props.stream) {
            return (<div>
                Loading..
            </div>)
        } else {
            return `Are you sure you want to delete stream with title:  ${this.props.stream.title}`;
        }
    }

    renderActions() {
        const {id} = this.props.match.params.id;
        return (
            <React.Fragment>
                <button onClick={() => this.props.deleteStream(id)}
                        className="ui button negative">Delete
                </button>

                <Link to="/" className="ui button">Cancel</Link>
            </React.Fragment>
        )


    }

    render() {
        return (
            <div>
                <Modal title="Delete stream"
                       content={this.renderContent()}
                       actions={this.renderActions()}
                       onDismiss={() => history.push("/")}
                />
            </div>
        );
    }

}

const mapStateToProps = (state, ownProps) => {
    return {stream: state.streams[ownProps.match.params.id]};
};

export default connect(
    mapStateToProps,
    {fetchStream, deleteStream}
)(StreamDelete);
