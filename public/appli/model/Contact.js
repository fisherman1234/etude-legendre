Ext.define('TP.model.Contact', {
    extend: 'Ext.data.Model',
    proxy: {
        type: 'rest',
        url: '/contacts',
        format: 'json',
        reader: {
            type: 'json',
            root: 'data'
        },
        writer: {
            type: 'json',
            root: 'contact',
            writeAllFields: false
        }
    },
    fields: ['id', 'nom', 'prenom', 'civilite', 'adresse1', 'adresse2', 'adresse3', 'code_postal', 'ville', 'pays', 'telephone', 'fax', 'portable', 'email', 'site_web',  'institution_id', 'genre_adresse', 'genre_lettre', 'type_intervenant_id', 'avocat_au_barreau', 'notes',  'contact_medium_id', 'nom_complet']
});