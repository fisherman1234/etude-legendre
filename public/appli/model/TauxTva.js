Ext.define('TP.model.TauxTva', {
    extend: 'Ext.data.Model',
    proxy: {
        type: 'rest',
        url: '/taux_tvas',
        format: 'json',
        reader: {
            type: 'json',
            root: 'data'
        },
        writer: {
            type: 'json',
            root: 'taux_tva',
            writeAllFields: false
        }
    },
    fields: ['id', 'description', 'taux']
});