Ext.define('TP.model.TypeActivite', { //
    extend: 'Ext.data.Model',
    proxy: {
        type: 'rest',
        url: '/type_activites', //
        format: 'json',
        reader: {
            type: 'json',
            root: 'data'
        },
        writer: {
            type: 'json',
            root: 'type_activite', //
            writeAllFields: false
        }
    },
    fields: ['id', 'description']
});