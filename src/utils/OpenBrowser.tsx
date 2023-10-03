import { useReducer } from 'react'

export function OpenBrowser() {
    const initialState = {
        shouldOpenWebView: false
    }

    const reducer = (state: any, action: any) => {
        switch (action.type) {
            case 'SET_SHOULD_OPEN_WEB_VIEW':
                return {
                    ...state,
                    shouldOpenWebView: action.payload
                }
            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    return { state, dispatch }
}