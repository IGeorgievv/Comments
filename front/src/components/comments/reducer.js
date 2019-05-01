import * as actionTypes from './actionTypes';

export default function comments(comments = {}, action) {
	let newComments = comments;
	switch (action.type) {
		
		case actionTypes.SAVE:
			createComment(action.data);
			const lastCommentI = Object.keys(comments).length - 1;
			let idComment = 0;
			if( lastCommentI >= 0 )
				idComment = +comments[lastCommentI].id + 1;
			const newComment = { id: idComment, comment: action.data };
			newComments[lastCommentI + 1] =  newComment;
			return { ...comments, ...comments = newComments };

		case actionTypes.EDIT:
			if ( !newComments[action.data.id] ) {
				return comments;
			}
			newComments[action.data.id]['comment'] = action.data.comment;
			return { ...comments, ...comments = newComments };

		case actionTypes.UPDATE:
			if ( action.data ) {
				return action.data;
			}
			return comments;

		case actionTypes.DELETE:
			if ( !newComments[action.data.id] ) {
				return comments;
			}
			newComments[action.data.id]['deleted'] = action.data.deleted;
			return { ...comments, ...comments = newComments };

		default: return comments;
	}
}


function createComment(data_msg) {
  
	fetch('http://data.comments.th/comments', {
		method: 'POST',
		body: JSON.stringify({
			msg: data_msg
		})
	})
	.then(res => res.json())
	.then(
		(result) => {
			console.log( 'result:  ', result );
			// this.props.actions.update( result.records );
		},
		(error) => {}
	)
}
