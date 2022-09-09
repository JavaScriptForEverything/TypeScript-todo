# Testing My TypeScript project

###### Building Simple CRUD operation By Todo app
  . localhost:5000                            : /api/products
  . axios                                     : get post and delete data
  . React
  . Redux       (reduxjs/toolkit)
  . Material-UI
  . Dynamic Form Inputs


###### TypeScript with node and express
  . API         /api//products
  . CORS

###### Setup Redux With TypeScript
---

+------------------------------------------[ Redux ]--------------------------------------------+
|												|
|----------[ /store/index.ts ]---------- 							|
|												|
| Method-1: With combineReducers() 								|
|												|
| 		import { combineReducers, configureStore } from '@reduxjs/toolkit'; 		|
| 		import { useDispatch } from 'react-redux'; 					|
| 		import productReducer from './productReducer' 					|
| 		 										|
| 		const rootReducer = combineReducers({ 						|
| 			product: productReducer 						|
| 		}) 										|
| 		export const store = configureStore({ reducer: rootReducer }) 			|
| 		 										|
| 		export type RootState = ReturnType<typeof rootReducer> 				|
| 		export type AppDispatch = typeof store.dispatch 				|
|  												|
|  												|
| Method-2: Without combineReducers() Because: automatically applied it behind the sence. 	|
|												|
| 		import { combineReducers, configureStore } from '@reduxjs/toolkit'; 		|
| 		import { useDispatch } from 'react-redux'; 					|
| 		import productReducer from './productReducer' 					|
| 		 										|
| 		export const store = configureStore({ 						|
| 		  reducer: { 									|
| 		    product: productReducer  							|
| 		  } 										|
| 		}) 										|
| 		export type RootState = ReturnType<typeof store.getState> 			|
| 		export type AppDispatch = typeof store.dispatch 				|
|  												|
|  												|
|  												|
|----------[ /store/productReducer.ts ]---------- 						|
|												|
|	NB:											|
| 	. InitialState must have types as regular object have in TypeScript. 			|
| 	. every `action.payload` have Generic types called, 	PayloadType<> 			|
|												|
|												|
|												|
| import { createSlice, PayloadAction } from '@reduxjs/toolkit' 				|
|  												|
| interface IinitialState { 									|
|   loading: boolean 										|
|   error: string 										|
|   products: Tproduct[] 	: type Tproduct = { name: string, price?: number, summar: string }
| } 												|
|  												|
| const initialState: IinitialState = { 							|
|   loading: false, 										|
|   error: '', 											|
|   products: [] 										|
| } 												|
|  												|
|  												|
| const { reducer, actions } = createSlice({ 							|
|   name: 'product', 										|
|   initialState, 										|
|   reducers: { 										|
|     requested: (state) => ({ 									|
|       ...state, 										|
|       loading: true, 										|
|       error: '' 										|
|     }), 											|
|     failed: (state, action: PayloadAction<string>) => ({ 					|
|       ...state, 										|
|       loading: false, 									|
|       error: action.payload 									|
|     }), 											|
|  												|
|     getProducts: (state, action: PayloadAction<Tproduct[]>) => ({ 				|
|       ...state, 										|
|       loading: false, 									|
|       products: action.payload 								|
|     }) 											|
|   } 												|
| }) 												|
| export default reducer 									|
|  												|
|  												|
|----------[ /App.ts ]---------- 								|
|												|
| import { useDispatch, useSelector } from 'react-redux' 					|
| import { AppDispatch, RootState } from './store' 						|
| import * as productReducer from './store/productReducer' 					|
|												|
|   const dispatch = useDispatch<AppDispatch>() 						|
| 	const { loading } = useSelector( (state: RootState) => state.product) 			|
|												|
|	  useEffect(() => { 									|
|	    dispatch( productReducer.getProducts() ) 						|
|	  }, [product]) 									|
|												|
|												|
|												|
|												|
| Every time we need to supply types with: as bellow, instead use 2nd method: 			|
| 	. useDispatch<AppDispatch>() 								|
| 	. useSelector( (state: RoorState) => state.sliceName ) 					|
|												|
|												|
| /store/hooks.ts 										|
|												|
| 	import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux' 		|
| 	import type { RootState, AppDispatch } from './index' 					|
| 			 									|
| 	export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector 		|
| 	export const useAppDispatch = () => useDispatch<AppDispatch>()	 			|
|												|
|												|
| /App.ts 											|
| 	import { useAppDispatch, useAppSelector } from './store/hoots' 				|
| 	import * as productReducer from './store/productReducer' 				|
|												|
| 	const dispatch = useAppDispatch() 							|
| 	const { loading } = useAppSelector( state => state.product) 				|
|												|
|  	useEffect(() => { 									|
|    		dispatch( productReducer.getProducts() ) 					|
|  	}, [product]) 										|
|												|
|												|
|												|
+-----------------------------------------------------------------------------------------------+

