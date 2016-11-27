export function article(state=[],action){
	switch(action.type){
		case 'ADD_ARTICLE':
			return [{
				_id:action._id,
				title:action.title,
        content:action.content,
				author:action.author,
				PostDate:action.date,
				avatar:action.avatar
			},...state]
		case 'EDIT_ARTICLE':
			[...state].map((i) => {
				if (i._id === action._id) {
					return Object.assign(i, { content: action.content })
				} else {
					return i
				}
			})
		default:
			return state;
	}
}
