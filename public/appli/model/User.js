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
    fields: ['id', 'email', 'nom', 'civilite', 'prenom', 'titre_lettres', 'fonction', 'adresse1', 'adresse2', 'adresse3', 'code_postal', 'ville', 'pays', 'telephone', 'fax', 'signature_lettres', 'genre_adresse', 'genre_lettre', 'site_web']
});

