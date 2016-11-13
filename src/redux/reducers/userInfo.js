export function userInfo(state={},action){
	switch(action.type){
		case 'USER_INFO':
			return {...state,
				account:action.payload.account,
				email:action.payload.email,
				name:action.payload.name
			}
		default:
			return state;

	}
}
