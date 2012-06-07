Ext.define('TP.store.Priorites', {
    extend: 'Ext.data.Store',
    fields: ['description'],
    autoLoad: true,
    data: [{
        description: '0_Basse'
    },
    {
        description: '1_Moyenne'
    },
    {
        description: '2_Haute'
    }]
});