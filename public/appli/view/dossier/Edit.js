Ext.define('TP.view.dossier.Edit', {
    extend: 'Ext.window.Window',
    alias : 'widget.dossieredit',

    title : 'Edit',
    layout: 'fit',
    autoShow: true,

    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                items: [
				{
				    xtype: 'fieldset',
				    title: 'Juridiction',
				    items: [
				        {
				            xtype: 'combo',
				            fieldLabel: 'Nom de la juridicion',
				            anchor: '100%',
				            name: 'institution_id',
				            store: 'TP.store.Institutions',
				            displayField: 'nom',
				            valueField: 'id',
				            hiddenName: 'institution_id'
				        },
	
				        {
				            xtype: 'container',
				            layout: 'column',
				            items: [
				                {
				                    xtype: 'container',
				                    layout: 'anchor',
				                    columnWidth: 0.5,
				                    items: [
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
				                        }
				                    ]
				                },
				                {
				                    xtype: 'container',
				                    layout: 'anchor',
				                    columnWidth: 0.5,
				                    items: [
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
				                }
				            ]
				        }
				    ]
				}
				
                ]
            }
        ];

        this.buttons = [
            {
                text: 'Enregistrer',
                action: 'save'
            },
            {
                text: 'Annuler',
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);
    }
});