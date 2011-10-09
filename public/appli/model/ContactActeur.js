Ext.define('TP.model.ContactActeur', {
    extend: 'Ext.data.Model',
    proxy: {
        type: 'rest',
        url: '/contact_acteurs',
        format: 'json',
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'totalSize'

        },
        writer: {
            type: 'json',
            root: 'contact_acteur',
            writeAllFields: false
        }
        
    },

    fields: ['id', 'qualite_procedurale_id', 'contact_id', 'acteur_id', 'institution_id', 'references', 'notes', 'montant_devis', 'role_in_procedure']
});