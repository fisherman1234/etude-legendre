Ext.define('TP.view.contactacteur.Edit', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.contactacteurEdit',

    layout: 'fit',
    id: "contactacteurEdit",
    initComponent: function() {
        this.items = [{
            xtype: 'form',
						title: 'Role dans le dossier',

            items: [{
                xtype: 'container',
                padding: 10,
								layout: 'anchor',
                items: [{
						        xtype: 'combo',
						        fieldLabel: 'Qualité procédurale',
						        anchor: '100%',
						        name: 'qualite_procedurale_id',
						        store: 'TP.store.QualiteProcedurales',
						        displayField: 'description',
						        valueField: 'id',
						        hiddenName: 'qualite_procedurale_id',
						        queryMode: 'local',
						        forceSelection: true,
						        allowBlank: false

						    },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Références correspondance',
                    name: 'references',
                    anchor: '100%'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Montant du devis',
                    name: 'montant_devis',
                    anchor: '100%'
                },
                {
                    xtype: 'textarea',
                    fieldLabel: 'Notes',
                    name: 'notes',
                    anchor: '100%'
                }]
            }]
        }];
        this.buttons = [{
            text: 'Enregistrer',
            action: 'save',
						icon: "/images/disk.png"

        },
				{
            text: 'Supprimer',
            action: 'delete',
						icon: "/images/delete.png"

        }];

        this.callParent(arguments);
    }
});