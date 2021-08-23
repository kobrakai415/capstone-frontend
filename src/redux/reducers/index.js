import { initialState } from "../store"

export const dataReducer = (state = initialState.data, action) => {

    switch (action.type) {
        case 'SET_OVERVIEW':
            return {
                ...state,
                overview: { ...action.payload }
            }
        case 'SET_DAILY_CHART_DATA':
            return {
                ...state,
                dailyChartData: action.payload
            }
        case 'SET_CHART_XVALUES':
            return {
                ...state,
                chartXValues: action.payload
            }
        case 'SET_CHART_YVALUES':
            return {
                ...state,
                chartYValues: action.payload
            }
        case 'SET_YESTERDAY_CLOSING':
            return {
                ...state,
                yesterdaysClosing: action.payload
            }
        case 'SET_LIVE_PRICE':
            return {
                ...state,
                livePrice: action.payload
            }
        case 'SET_USER':
            return {
                ...state,
                user: action.payload
            }
        default:
            return state

    }
}




export const formReducer = (state = initialState.form, action) => {
    switch (action.payload) {
        case 'SET_USER':
            return {
                ...state,
                user: action.payload
            }
        case 'SET_EMAIL':
            return {
                ...state,
                email: action.payload
            }
        case 'SET_PASSWORD':
            return {
                ...state,
                password: action.payload
            }
        default:
            return state
    }
}



export const watchlistReducer = (state = initialState.data, action) => {

    switch (action.type) {
        case 'SET_BROWSE_ALL_DATA':
            return {
                ...state,
                browseAllData: [...action.payload]
            }
        default:
            return state
    }
}
