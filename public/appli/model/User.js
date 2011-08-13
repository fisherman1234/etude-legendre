Ext.define('TP.model.User', {
    extend: 'Ext.data.Model',
    proxy: {
        type: 'rest',
        url: '/users',
        format: 'json',
        reader: {
            type: 'json',
            root: 'data'
        },
        writer: {
            type: 'json',
            root: 'user',
            writeAllFields: false
        }
    },
    fields: ['id', 'nom', 'prenom', 'nom_complet']
});