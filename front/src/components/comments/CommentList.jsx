import React from 'react';
import CommentForm from './CommentForm';

class CommentList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      comments: this.props.comments || [],
      openModal: false,
      editId: 0,
      editComment: ""
    }

  }

  editComment = (useThis, id) => {
    return function() {
      const comment = useThis.state.comments[id];
      if ( comment ) {
        useThis.setState({
          openModal: true,
          editId: comment.id,
          editComment: comment.comment
        });
      }
      else {
        useThis.closeModal;
      }
    }
  }

  closeModal = () => {
    this.setState({
      openModal: false,
      editId: 0,
      editComment: ""
    });
  }

  removeComment = (useThis, id) => {
    return function() {
      const deleted = new Date().getTime().toString().slice(0, -3);
  
      useThis.props.actions.remove( { id: id, deleted: deleted } );
    }
  }

  buildComments = (data) => {
    let list = [];
    let reverseI = Object.keys(data).length;
    let comment = {};
    while ( --reverseI >= 0 ) {
      comment = data[reverseI];

      if ( !comment || comment.deleted ) {
        continue;
      }

      list.push(
        <div key={ comment.id } className="card text-white bg-secondary mb-4 offset-4 col-4 d-flex justify-content-end" >
          <div>
            <div className="btn" onClick={ this.editComment(this, comment.id ) }>
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 60 60"><title/><g><path d="M5.86239,52.13762,2.847,55.153a.50254.50254,0,0,1-.85868-.36872A14.73779,14.73779,0,0,1,8,44c-.64813,2.00735-1.91962,5.76269-1.99633,7.81223A.47569.47569,0,0,1,5.86239,52.13762ZM42.69409,19.22888l-2.24683-1.12341a1.00012,1.00012,0,1,0-.89453,1.78906l.96417.48212a31.97083,31.97083,0,0,0-9.33331,6.78149A12.87811,12.87811,0,0,1,26.04932,28a.98943.98943,0,0,0-1.02637,1,1.0082,1.0082,0,0,0,1.07275,1,20.50679,20.50679,0,0,0,3.03186-.20117,29.86818,29.86818,0,0,0-2.884,5.43091C23.64777,36.90717,21.94672,37,19,37a1,1,0,0,0,0,2,15.55133,15.55133,0,0,0,5.65057-.72638c-3.57208,5.6217-7.91125,5.29578-12.84637,4.91876-.60541-.04608-1.22278-.08856-1.84369-.12457C15.78137,29.28448,28.22833,19.2536,48.3418,11.93994a1.00016,1.00016,0,0,0-.68359-1.87988c-17.80566,6.4751-29.78516,15.062-36.62012,26.44629a1.05026,1.05026,0,0,0-.05908.0918,43.16253,43.16253,0,0,1-2.88727,4.2951C6.10223,36.4007,6.13568,32.62018,7.233,29.47748a10.87328,10.87328,0,0,0,.86078,2.94537,1,1,0,1,0,1.8125-.8457,12.86572,12.86572,0,0,1-.9165-5.56653,25.05725,25.05725,0,0,1,6.838-6.467A11.00519,11.00519,0,0,0,14,25a1,1,0,0,0,2,0c0-.79663.33624-3.751,4.577-8.46478a61.86926,61.86926,0,0,1,14.62073-6.16693l-.09222.18445a1.00012,1.00012,0,0,0,1.78906.89453l.90607-1.81219c2.70551-.72766,5.33826-1.34235,7.79169-1.9129a71.66093,71.66093,0,0,0,10.059-2.79056A.49861.49861,0,0,1,56.29456,5.6C52.82864,13.54506,47.91259,16.47027,42.69409,19.22888Z"/></g></svg>
            </div>
            <div className="btn float-right" onClick={ this.removeComment(this, comment.id) }>
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 48 48"><path d="M30 32h8v4h-8zm0-16h14v4H30zm0 8h12v4H30zM6 36c0 2.2 1.8 4 4 4h12c2.2 0 4-1.8 4-4V16H6v20zm22-26h-6l-2-2h-8l-2 2H4v4h24z"/><path d="M0 0h48v48H0z" fill="none"/></svg>
            </div>
          </div>
          <div className="card-body">
            <h4 className="card-title pt-2">{ comment.comment }</h4>
          </div>
        </div>
      );
    }

    return list;
  }

  render() {
    const comments = this.props.comments;
    let list = {};
    
    if ( comments ) {
      list= this.buildComments(comments);
    
      return (
        <section className="p-5">
          <div className="container">
            { list }
          </div>
          {
            this.state.openModal === true && 
              <div className="modal" style={ {'display': 'block',} }>
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Edit comment</h5>
                      <button type="button" className="close" onClick={this.closeModal}>
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <CommentForm actions={ this.props.actions } id={this.state.editId} comment={this.state.editComment} closeModal={this.closeModal} />
                    </div>
                  </div>
                </div>
              </div>
          }
        </section>
      );
    }
    else {
      return "";
    }
  }
}

export default CommentList;