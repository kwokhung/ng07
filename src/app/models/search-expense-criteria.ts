import * as moment from 'moment';

export interface SearchExpenseCriteria {
    applicationDate: moment.Moment;
    applicationNo: string;
    payee: string;
}