import { Expense } from '../models/expense';

export class MockData {

    public static Expenses: Expense[] = [
        {
            'id': 1,
            'applicationDate': '20181001',
            'applicationNo': 'App-01',
            'payee': '16990'
        },
        {
            'id': 2,
            'applicationDate': '20181002',
            'applicationNo': 'App-02',
            'payee': '59990'
        },
        {
            'id': 3,
            'applicationDate': '20181003',
            'applicationNo': 'App-03',
            'payee': 'abc'
        }
    ];

}
