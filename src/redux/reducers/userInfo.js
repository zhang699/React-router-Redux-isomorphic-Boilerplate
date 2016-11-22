export function userInfo(state={},action){
	switch(action.type){
		case 'USER_INFO':
			return {...state,
				...state.userInfo,
				account:action.payload.account,
				email:action.payload.email,
				name:action.payload.name,
				avatar:action.payload.avatar,
				RegistedDate:action.payload.RegistedDate,
				login:true
			}
		case 'LOG_OUT':
			return {...state,
				...state.userInfo,
				account:'',
				email:'',
				name:'',
				avatar:'',
				login:false
			}
		default:
			return state;

	}
}
