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
      comment: props.comment || ''
    }
  }

  render() {
    // const { comment } = this.state;

    // const filteredList = this.props.list.filter(item => !item.archived);

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
