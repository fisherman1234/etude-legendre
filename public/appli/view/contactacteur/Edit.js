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
                    xtype: 'textfield',
                    fieldLabel: 'Qualité procédurale',
                    name: 'qualite_procedurale_id',
                    anchor: '100%'
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
                    xtype: 'textfield',
                    fieldLabel: 'Notes',
                    name: 'notes',
                    anchor: '100%'
                }]
            }]
        }];
        this.buttons = [{
            text: 'Enregistrer',
            action: 'save'
        }];

        this.callParent(arguments);
    }
});