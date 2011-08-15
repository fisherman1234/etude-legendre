Ext.define('TP.model.TypeIntervenant', {
    extend: 'Ext.data.Model',
    proxy: {
        type: 'rest',
        url: '/type_intervenants',
        format: 'json',
        reader: {
            type: 'json',
            root: 'data'
        },
        writer: {
            type: 'json',
            root: 'type_intervenant',
            writeAllFields: false
        }
    },
    fields: ['id', 'description']
});