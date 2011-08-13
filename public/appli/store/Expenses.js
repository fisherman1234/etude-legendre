Ext.define('TP.store.Expenses', {
    extend: 'Ext.data.Store',
    model: 'TP.model.Expense',
    //autoLoad: true,
    autoSync: true,
    groupField: 'activite_name'
});