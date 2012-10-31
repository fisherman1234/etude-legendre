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
    fields: ['id', 'nom', 'prenom', 'civilite_id', 'adresse1', 'adresse2', 'adresse3', 'code_postal', 'ville', 'pays', 'telephone', 'fax', 'portable', 'email', 'site_web', 'institution_id', 'genre_adresse', 'genre_lettre', 'type_intervenant_id', 'avocat_au_barreau', 'notes', 'contact_medium_id', 'nom_complet', 'institution_description', {
        name: 'full_name',
        type: 'string',
        convert: function(v, rec) {
            civilite = "";
            civ = Ext.getStore('TP.store.Civilites').findRecord('id', rec.data.civilite_id);
            if (civ && typeof(civ) !== undefined && typeof(civ.data) !== undefined) {
                civilite = civ.data.description;
            }

            entreprise = Ext.getStore('TP.store.Institutions').findRecord('id', rec.data.institution_id);
            en = '';
            if (entreprise && typeof(entreprise) !== undefined && typeof(entreprise.data) !== undefined) {
                en = entreprise.data.nom;
            }
            return civilite + ' ' + rec.data.nom_complet + " - " + en;
        }
    },
    {
        name: 'entreprise',
        type: 'string',
        convert: function(v, rec) {
            entreprise = Ext.getStore('TP.store.Institutions').findRecord('id', rec.data.institution_id);
            en = '';
            if (entreprise && typeof(entreprise) !== undefined && typeof(entreprise.data) !== undefined) {
                en = entreprise.data.nom;
            }
            return en;
        }
    }]
});