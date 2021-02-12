

const INITIAL_STATE = {
	count:0
}

export default function (state = INITIAL_STATE, action) { // reducres are create to get active user

  switch (action.type) {

		case "INCREMENT":
			console.log('data---',action.payload)
			return {
				...state,
                count:action.payload
			}
			break;
		case "DECREMENT":
			return {
				...state,
                count:action.payload
			}
			break;
  }
  return state;
}