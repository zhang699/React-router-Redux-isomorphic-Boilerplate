const actions = {
	pause:(payload)=>{
		return ({
	   type:'WAITING_TRUE',
   })
  },
  resume:(payload)=>{
    return ({
      type:'WAITING_FALSE',
   })
  },
}

export default actions
