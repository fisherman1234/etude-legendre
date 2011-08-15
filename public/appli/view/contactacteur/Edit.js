Ext.define('TP.view.contactacteur.Edit', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.contactacteurEdit',

    title: "Role dans le dossier",
    layout: 'fit',
    id: "contactacteurEdit",
    initComponent: function() {
        this.items = [{
            xtype: 'form',
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
                    xtype: 'htmleditor',
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

        }];

        this.callParent(arguments);
    }
});