Ext.define('TP.model.Dossier', {
    extend: 'Ext.data.Model',
    proxy: {
        type: 'rest',
        url: '/dossiers',
        format: 'json',
        reader: {
            type: 'json',
            root: 'data'
        },
        writer: {
            type: 'json',
            root: 'dossier',
            writeAllFields: false
        }
    },
    hasMany: {
        model: 'TP.model.Expense',
        name: 'expenses'
    },

    fields: [{
        "name": "id",
        "persist": true,
        "type": "int"
    },
    {
        "name": "user_id",
        "type": "int"
    },
    {
        "name": "type_decision_id",
        "type": "int"
    },
    {
        "name": "nom_dossier",
        "allowBlank": false,
        "type": "string"
    },
    {
        "name": "ref_cabinet",
        "allowBlank": true,
        "type": "string"
    },
    {
        "name": "date_decision",
        "type": "date"
    },
    {
        "name": "date_avis_designation",
        "type": "date"
    },
    {
        "name": "date_cible_depot_rapport",
        "type": "date"
    },
    {
        "name": "date_effective_depot_raport",
        "type": "date"
    },
    {
        "name": "numero_service_expertise",
        "allowBlank": true,
        "type": "string"
    },
    {
        "name": "numero_role_general",
        "allowBlank": true,
        "type": "string"
    },
    {
        "name": "type_expertise_id",
        "type": "auto"
    },
    {
        "name": "type_etat_dossier_id",
        "type": "auto"
    },
    {
        "name": "institution_id",
        "type": "int"
    },
    {
        "name": "date_debut_op_theorique",
        "type": "date"
    },
    {
        "name": "institution_nom"
    },
    {
        "name": "type_etat_dossier_description"
    },
    {
        "name": "juge_mission_id"
    },
    {
        "name": "juge_controlleur_id"
    }]
});