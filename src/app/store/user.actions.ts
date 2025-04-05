import { createAction, props } from '@ngrx/store';
import { AppState, CsvName, OptionType } from './app.state';

export const setUser = createAction('Set User', props<AppState>());

export const vmCreationType = createAction('vm creation type', props<OptionType>());

export const csvName = createAction('vm CSV Name', props<CsvName>());
