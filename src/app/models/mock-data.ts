import { Expense } from '../models/expense';
import { DuplicateInvoice } from '../models/duplicate-invoice';

export class MockData {

    public static expenses: Expense[] = [
        {
            'id': 1,
            'applicationDate': '20181001',
            'applicationNo': 'App-01',
            'payee': '16990',
            'status': '',
            'selected': false
        },
        {
            'id': 2,
            'applicationDate': '20181002',
            'applicationNo': 'App-02',
            'payee': '59990',
            'status': 'Exported',
            'selected': false
        },
        {
            'id': 3,
            'applicationDate': '20181003',
            'applicationNo': 'App-03',
            'payee': 'abc',
            'status': '',
            'selected': false
        }
    ];

    public static duplicateInvoices: DuplicateInvoice[] = [
        {
            'id': 1,
            'documentNo': 'Doc-01',
            'documentDate': '20181001',
            'payee': '16990',
            'applicationNos': 'App-01'
        },
        {
            'id': 2,
            'documentNo': 'Doc-02',
            'documentDate': '20181001',
            'payee': '16991',
            'applicationNos': 'App-02'
        },
        {
            'id': 3,
            'documentNo': 'Doc-03',
            'documentDate': '20181001',
            'payee': '16990',
            'applicationNos': 'App-01,App-02'
        }
    ];

}
