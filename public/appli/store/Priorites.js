Ext.define('TP.store.Priorites', {
    extend: 'Ext.data.Store',
    fields: ['description'],
    autoLoad: true,
    data: [{
        description: 'Basse'
    },
    {
        description: 'Moyenne'
    },
    {
        description: 'Haute'
    }]
});