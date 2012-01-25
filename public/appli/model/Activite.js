Ext.define('TP.model.Activite', {
    extend: 'Ext.data.Model',
    autoLoad: true,
    
    proxy: {
        type: 'rest',
        url: '/activites',
        format: 'json',
        reader: {
            type: 'json',
            root: 'data'
        },
        writer: {
            type: 'json',
            root: 'activite',
            writeAllFields: false
        }
    },
    fields: [{
        "name": "id",
        "persist": true,
        "type": "int"
    },
    {
        "name": 'type_activite_id'
    },
    {
        "name": "description"
    },
    {
        "name": "no_accedit"
    },
    {
        "name": "adresse1"
    },
    {
        "name": "adresse2"
    },
    {
        "name": "adresse3"
    },
    {
        "name": "code_postal"
    },
    {
        "name": "ville"
    },
    {
        "name": "pays"
    },
    {
        "name": "heure"
    },
    {
        "name": "commentaires"
    },
    {
        "name": "is_confidentiel"
    },
    {
        "name": "terme_date"
    },
    {
        "name": "dossier_id"
    },
    {
        "name": "message_template_id"
    },
    {
        "name": "add_to_gcal"
    },
    {
        "name": "date_visite"
    }]
});