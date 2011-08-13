Ext.define('TP.model.TypeDecision', {
    extend: 'Ext.data.Model',
    proxy: {
        type: 'rest',
        url: '/type_decisions',
        format: 'json',
        reader: {
            type: 'json',
            root: 'data'
        },
        writer: {
            type: 'json',
            root: 'type_decision',
            writeAllFields: false
        }
    },
    fields: ['id', 'description']
});