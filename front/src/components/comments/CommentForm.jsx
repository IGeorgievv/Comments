import React from 'react';

class CommentForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      id: props.id !== undefined ? props.id : "empty",
      comment: props.comment || "",
      disable: { 'disabled': ( props.comment && 
                               props.comment.length >= 1 &&
                               props.comment.length <= 100 ) ?
                                 "" : "disable" },
      errorMsg: "",
      closeModal: this.props.closeModal || undefined
    }
  }

  handleChange = (e) => {
    const elVal = e.target.value;
    this.setState({[e.target.name]: elVal});
    this.isValidComment();
  }

  isValidComment = () => {
    const comment = this.state.comment;
    if ( comment.length >= 1 && comment.length <= 100 )
      this.setState({disable: { 'disabled': "" }});
    else if ( this.state.disable.disabled == "" )
      this.setState({disable: { 'disabled': "disable" }});
  }

  clearForm = () => {
    if ( this.state.id !== "empty" ) {
      return;
    }
    this.setState({ comment: '', disable: { 'disabled': "disable" }});
  }

  checkComment = () => {
    const commentLength = this.state.comment.length;
    if ( commentLength <= 0 ) {
      this.setState({errorMsg: 'The Commet can\'t be empty.'});
      return false;
    }
    else if ( commentLength >= 101 ) {
      this.setState({errorMsg: 'The Commet can\'t be more then 100 symbols.'});
      return false;
    }
    else if ( this.state.errorMsg ) {
      this.setState({errorMsg: ""});
    }

    return true;
  }

  handelComment = (e) => {
    e.preventDefault();
    if ( this.checkComment() ) {

      if (this.state.id !== "empty") {
        this.props.actions.edit( { 'id': this.state.id,
                                   'comment': this.state.comment } );
        if ( this.state.closeModal !== undefined ) {
          this.state.closeModal();
        }
      }
      else {
        this.props.actions.save( this.state.comment );
        this.clearForm();
      }
    }
  }

  render() {
    const { comment, disable, errorMsg, id } = this.state;

    return (
      <form className="text-center p-5" onSubmit={this.handelComment}>
        <div className="form-group">
          <h1><label htmlFor="commentField">Comment</label></h1>
          <textarea className="form-control col-10 offset-1"
                    name="comment"
                    value={ comment }
                    rows="2"
                    id="commentField"
                    onChange={this.handleChange}
                    onClick={this.clearForm}
                    autoFocus = { this.state.id !== "empty" ? true : false }
          ></textarea>
          { errorMsg && <p className="text-danger">{ errorMsg }</p> }
        </div>
        <button type="submit" className="btn btn-primary btn-lg"{ ...disable }>
          { id !== "empty" ? "Edit" : "Add" }
        </button>
      </form>
    )
  }
}

export default CommentForm;
