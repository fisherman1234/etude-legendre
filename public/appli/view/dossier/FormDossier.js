Ext.define('TP.view.dossier.FormDossier', {
    extend: 'Ext.form.Panel',
    alias: 'widget.dossierFormDossier',
    layout: {
        type: 'anchor'
    },
    frame: true,
    initComponent: function() {
        this.items = [{
            xtype: 'textfield',
            fieldLabel: 'Nom du dossier',
            anchor: '96%',
            name: 'nom_dossier',
            allowBlank: false
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Références dossier',
            anchor: '96%',
            name: 'ref_cabinet',
            allowBlank: false
        },
        {
            xtype: 'combo',
            queryMode: 'local',
            fieldLabel: 'Nom de la juridiction',
            anchor: '96%',
            name: 'institution_id',
            store: 'TP.store.Institutions',
            displayField: 'nom',
            valueField: 'id',
            hiddenName: 'institution_id',
            forceSelection: true,
            allowBlank: false

        },
        {
            xtype: 'combo',
            fieldLabel: "Type d'expertise",
            anchor: '96%',
            name: 'type_expertise_id',
            store: 'TP.store.TypeExpertises',
            displayField: 'description',
            valueField: 'id',
            hiddenName: 'type_expertise_id',
            forceSelection: true,
            allowBlank: false,
            queryMode: 'local'

        },

        {
            xtype: 'combo',
            queryMode: 'local',
            fieldLabel: 'Type de décision',
            anchor: '96%',
            name: 'type_decision_id',
            store: 'TP.store.TypeDecisions',
            displayField: 'description',
            valueField: 'id',
            hiddenName: 'type_decision_id',
            forceSelection: true,
            allowBlank: false

        },
        {
            xtype: 'combo',
            queryMode: 'local',
            fieldLabel: 'Etat du dossier',
            anchor: '96%',
            name: 'type_etat_dossier_id',
            store: 'TP.store.TypeEtatDossiers',
            displayField: 'description',
            valueField: 'id',
            hiddenName: 'type_etat_dossier_id',
            allowBlank: false,
            forceSelection: true

        },
        {
            xtype: 'combo',
            queryMode: 'local',
            fieldLabel: 'En charge',
            anchor: '96%',
            name: 'user_id',
            store: 'TP.store.Users',
            displayField: 'nom_complet',
            valueField: 'id',
            forceSelection: true,

            hiddenName: 'user_id'

        }];

        this.callParent(arguments);
    }
});