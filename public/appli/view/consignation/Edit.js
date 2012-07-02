Ext.define('TP.view.consignation.Edit', {
    extend: 'Ext.window.Window',
    alias: 'widget.consignationEdit',

    title: "Propriétés de la consignation",
    layout: 'fit',
    autoShow: true,
    width: 500,

    initComponent: function() {
        this.items = [{
            xtype: 'form',
            border: false,

            items: [{
                fieldLabel: 'Status',
                xtype: 'combo',
                forceSelection: true,
                queryMode: 'local',
                name: 'status',
                store: 'TP.store.StatusConsignations',
                displayField: 'status',
                valueField: 'status',
                hiddenName: 'status'
            },
            {
                xtype: 'numberfield',
                fieldLabel: 'Montant',
                name: 'amount'
            },
            {
                fieldLabel: 'En charge',
                xtype: 'combo',
                forceSelection: true,
                queryMode: 'local',
                name: 'contact_id',
                store: 'TP.store.Contacts',
                displayField: 'nom_complet',
                valueField: 'id',
                hiddenName: 'contact_id'
            }]
        }];

        this.buttons = [{
            text: 'Enregistrer',
            action: 'save',
            handler: function() {

                var r = Ext.ModelManager.create(this.up('window').down('form').getValues(),
                'TP.model.Consignation');
                Ext.getStore('TP.store.Consignations').insert(0, r);
								this.up('window').close();
								
						
            }
        },
        {
            text: 'Annuler',
            scope: this,
            handler: this.close
        }];

        this.callParent(arguments);
    }
});