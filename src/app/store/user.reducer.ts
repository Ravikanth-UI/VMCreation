import { createReducer, on } from '@ngrx/store';
import { csvName, setUser, vmCreationType } from './user.actions';
import { AppState } from './app.state';
// const addName = (state: any, action: any) => {
//     switch (action.type) {
//         case setUser.type:
//             return { ...state, userName: action.userName };
//         case vmCreationType.type:
//             return { ...state, optionType: action.optionType };
//         case csvName.type:
//             return { ...state, name: action.name };
//         default:
//             return state;
//     }
// }

// const initialState: AppState = {
//     // Define your initial state properties here
//     userName: '',
//     optionType: '',
//     name: ''
//   };
  
  const addName = createReducer(
    '',
    on(setUser, (state: any, { userName }) => ({ ...state, userName })),
    on(vmCreationType, (state: any, { optionType }) => ({ ...state, optionType })),
    on(csvName, (state: any, { name }) => ({ ...state, name }))
  );
export default addName;

