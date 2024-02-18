import { MONTHLY_SALES_REQUEST, MONTHLY_SALES_SUCCESS, MONTHLY_SALES_FAIL,PRODUCT_SALES_REQUEST, PRODUCT_SALES_SUCCESS, PRODUCT_SALES_FAIL, CLEAR_ERRORS } from '../constants/chartConstants'

export const salesPerMonthReducer = (state = { salesPerMonth: [] }, action) => {
    switch (action.type) {
        case MONTHLY_SALES_REQUEST:
            return {
                ...state,
                loading: true
            }

        case MONTHLY_SALES_SUCCESS:
            return {
                ...state,
                loading: false,
                salesPerMonth: action.payload
            }
        case MONTHLY_SALES_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }

}

export const productSalesReducer = (state = { productSales: [] }, action) => {
    switch (action.type) {
        case PRODUCT_SALES_REQUEST:
            return {
                ...state,
                loading: true
            }

        case PRODUCT_SALES_SUCCESS:
            return {
                ...state,
                loading: false,
                productSales: action.payload
            }
        case PRODUCT_SALES_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }

}