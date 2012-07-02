Ext.define('TP.store.StatusConsignations', {
    extend: 'Ext.data.Store',
    fields: ['status'],
    autoLoad: true,
    data: [{
        status: 'Payé'
    },
    {
        status: 'En attente'
    }]
});