Ext.define('TP.view.consignation.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.consignationList',

    title: 'Consignations',
    store: 'TP.store.Consignations',
    id: "consignationList",



    selType: 'rowmodel',
    plugins: [
    Ext.create('Ext.grid.plugin.RowEditing', {
        clicksToEdit: 1,
        pluginId: 'rowEditPlugin'
    })],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        store: 'TP.store.Consignations',
        displayInfo: true,
        items: [{
            xtype: 'button',
            text: 'Ajouter',
            icon: '/images/add.png',
            handler: function() {
                Ext.widget('consignationEdit').show();
            }
        }],
        layout: 'hbox'
        // The items are arranged horizontally
    }],
    initComponent: function() {
        this.columns = [
        {
            header: 'En charge',
            dataIndex: 'contact_id',
            flex: 1,
            renderer: function(value, meta, record) {
                if (value !== null) {
                    a = Ext.getStore('TP.store.Contacts').findRecord('id', value);
                    if (a !== null) {
                        return a.data.nom_complet;
                    }
                }
            },
            editor: {
                xtype: 'combo',
                forceSelection: true,
                queryMode: 'local',
                name: 'contact_id',
                store: 'TP.store.Contacts',
                displayField: 'nom_complet',
                valueField: 'id',
                hiddenName: 'contact_id'
            }

        },
        {
            header: 'Montant',
            dataIndex: 'amount',
            flex: 1,
            editor: {
                xtype: 'numberfield'
            }
        },
        {
            header: 'Status',
            dataIndex: 'status',
            flex: 1,
            renderer: function(value, meta, record) {
                if (value !== null) {
                    a = Ext.getStore('TP.store.StatusConsignations').findRecord('status', value);
                    if (a !== null) {
                        return a.data.status;
                    }
                }
            },
            editor: {
                xtype: 'combo',
                forceSelection: true,
                queryMode: 'local',
                name: 'status',
                store: 'TP.store.StatusConsignations',
                displayField: 'status',
                valueField: 'status',
                hiddenName: 'status'
            }
        },
        {
            xtype: 'actioncolumn',
            width: 30,
            items: [{
                icon: '/images/delete.png',
                tooltip: 'Supprimer',
                handler: function(grid, rowIndex, colIndex) {
                    rec = grid.getStore().getAt(rowIndex);
                    Ext.Msg.show({
                        title: 'Supprimer cet enregistrement',
                        msg: 'Voulez-vous supprimer cet enregistrement ?',
                        buttons: Ext.Msg.YESNO,
                        fn: function(id) {
                            if (id == "yes") {
                                Ext.getStore('TP.store.Consignations').remove(rec);
                            }
                        },
                        icon: Ext.Msg.QUESTION
                    });
                }
            }]
        }
        ];

        this.callParent(arguments);
    }
});