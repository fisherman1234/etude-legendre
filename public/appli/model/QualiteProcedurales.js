Ext.define('TP.model.QualiteProcedurale', {
    extend: 'Ext.data.Model',
    proxy: {
        type: 'rest',
        url: '/qualite_procedurales',
        format: 'json',
        reader: {
            type: 'json',
            root: 'data',
		        totalProperty: 'totalSize'

        },
        writer: {
            type: 'json',
            root: 'qualite_procedurale',
            writeAllFields: false
        }
    },
    fields: ['id', 'description']
});