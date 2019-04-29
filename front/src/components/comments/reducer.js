import * as actionTypes from './actionTypes';

export default function comments(comments = {}, action) {
	let newComments = comments;
	switch (action.type) {
		
		case actionTypes.SAVE:
			const idComment = Object.keys(comments).length;
			const newComment = { id: idComment, comment: action.data };
			newComments[idComment] =  newComment;
			return { ...comments, ...comments = newComments };

		case actionTypes.EDIT:
			if ( !newComments[action.data.id] ) {
				return comments;
			}
			newComments[action.data.id]['comment'] = action.data.comment;
			return { ...comments, ...comments = newComments };

		case actionTypes.DELETE:
			if ( !newComments[action.data.id] ) {
				return comments;
			}
			newComments[action.data.id]['deleted'] = action.data.deleted;
			return { ...comments, ...comments = newComments };

		default: return comments;
	}
}
