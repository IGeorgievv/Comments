import React from 'react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions';

class Comments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: props.comment || '',
      intervalID: ''
    }

    this.updateComments();
  }

  updateComments = () => {
    const useThis = this;
    const interval = setInterval( function() {
        useThis.getComments();
      }, (1000 * 10) );
    this.state.intervalID = interval;
  }

  getComments = () => {
    fetch('http://data.comments.th/comments')
    .then(res => res.json())
    .then(
      (result) => {
        this.props.actions.update( result.records );
      },
      (error) => {}
    )
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalID);
  }

  render() {

    return (
      <div className="container">
        <div className="col-6 offset-3">
          <CommentForm actions={ this.props.actions } />
        </div>
        <CommentList actions={ this.props.actions } comments={ this.props.comments } />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    comments: state.comments,
  };
}

function mapDispatchToProps (dispatch) {
  return {
      actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
// export default Comments;
