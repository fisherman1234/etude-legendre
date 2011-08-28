Ext.define('TP.view.dossier.Edit', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.dossieredit',

    title: "Edition d'un dossier",
    layout: 'fit',
    border: false,
    padding: 10,
    id: "editForm",
    initComponent: function() {
        this.items = [{
            xtype: 'form',
            border: false,

            items: [{
                xtype: 'fieldset',
                title: 'Références du dossier',
                padding: 5,

                items: [{
                    xtype: 'container',
                    layout: 'column',
                    items: [{
                        xtype: 'container',
                        layout: 'anchor',
                        columnWidth: 0.5,
                        items: [{
                            xtype: 'textfield',
                            fieldLabel: 'Nom du dossier',
                            anchor: '96%',
                            name: 'nom_dossier'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Références dossier',
                            anchor: '96%',
                            name: 'ref_cabinet'
                        }]

                    },
                    {
                        xtype: 'container',
                        layout: 'anchor',
                        columnWidth: 0.5,
                        items: [{
                            xtype: 'combo',
                            fieldLabel: "Type d'expertise",
                            anchor: '96%',
                            name: 'type_expertise_id',
                            store: 'TP.store.TypeExpertises',
                            displayField: 'description',
                            valueField: 'id',
                            hiddenName: 'type_expertise_id',
						                forceSelection: true,

                            queryMode: 'local'

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

                        }]

                    }]
                }]
            },
            {
                xtype: 'fieldset',
                padding: 5,
                title: 'Juridiction',
                items: [{
                    xtype: 'combo',
                    queryMode: 'local',
                    fieldLabel: 'Nom de la juridiction',
                    anchor: '96%',
                    name: 'institution_id',
                    store: 'TP.store.Institutions',
                    displayField: 'nom',
                    valueField: 'id',
                    hiddenName: 'institution_id',
		                forceSelection: true


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
		                forceSelection: true


                },

                {
                    xtype: 'container',
                    layout: 'column',
                    items: [{
                        xtype: 'container',
                        layout: 'anchor',
                        columnWidth: 0.5,
                        items: [{
                            xtype: 'combo',
                            queryMode: 'local',
                            fieldLabel: 'Juge mission',
                            anchor: '96%',
                            name: 'juge_mission_id',
                            store: 'TP.store.Contacts',
                            displayField: 'nom_complet',
                            valueField: 'id',
                            hiddenName: 'juge_mission_id',
						                forceSelection: true


                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Date de l\'avis de désignation',
                            anchor: '96%',
                            name: 'date_avis_designation'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Numéro de role général',
                            anchor: '96%',
                            name: 'numero_role_general'
                        }]
                    },
                    {
                        xtype: 'container',
                        layout: 'anchor',
                        columnWidth: 0.5,
                        items: [{
                            xtype: 'combo',
                            queryMode: 'local',
                            fieldLabel: 'Juge controlleur',
                            anchor: '96%',
                            name: 'juge_controlleur_id',
                            store: 'TP.store.Contacts',
                            displayField: 'nom_complet',
                            valueField: 'id',
                            hiddenName: 'juge_controlleur_id',
						                forceSelection: true


                        },
                        {
                            xtype: 'datefield',
                            anchor: '96%',
                            fieldLabel: 'Date de la décision',
                            name: 'date_decision'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Numéro du service d\'expertise',
                            anchor: '96%',
                            name: 'numero_service_expertise'
                        }

                        ]
                    }]
                }]
            },
            {
                xtype: 'fieldset',
                padding: 5,
                title: 'Statut du dossier',
                items: [{
                    xtype: 'container',
                    layout: 'column',
                    items: [{
                        xtype: 'container',
                        layout: 'anchor',
                        columnWidth: 0.5,
                        items: [{
                            xtype: 'datefield',
                            anchor: '96%',
                            fieldLabel: 'Début des opérations',
                            name: 'date_debut_op_theorique'
                        },
                        {
                            xtype: 'datefield',
                            anchor: '96%',
                            fieldLabel: 'Rapport à déposer le',
                            name: 'date_cible_depot_rapport'
                        }]

                    },
                    {
                        xtype: 'container',
                        layout: 'anchor',
                        columnWidth: 0.5,
                        items: [{
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
                            xtype: 'datefield',
                            anchor: '96%',
                            fieldLabel: 'Rapport déposé le',
                            name: 'date_effective_depot_raport'
                        }]

                    }]
                }]
            }

            ]
        }];

        this.buttons = [{
            text: 'Enregistrer',
            action: 'save'
        },
        {
            text: 'Annuler',
            scope: this,
            handler: this.close
        }];

        this.callParent(arguments);
    }
});