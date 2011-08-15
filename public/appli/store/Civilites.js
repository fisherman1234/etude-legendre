Ext.define('TP.store.Civilites', {
    extend: 'Ext.data.Store',
    fields: ['id', 'description'],
    autoLoad: true,
    data: [{
        id: 1,
        description: 'M'
    },
    {
        id: 2,
        description: 'Mme'
    },
    {
        id: 3,
        description: 'Mlle'
    }]
});