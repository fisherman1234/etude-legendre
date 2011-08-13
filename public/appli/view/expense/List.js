Ext.define('TP.view.expense.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.expenseList',

    title: 'Dépenses',
    store: 'TP.store.Expenses',
    id: "expenselist",


    features: [{
        groupHeaderTpl: 'Activite: {name}',
        ftype: 'groupingsummary'
    }],
    selType: 'rowmodel',
    plugins: [
    Ext.create('Ext.grid.plugin.RowEditing', {
        clicksToEdit: 1,
				pluginId: 'rowEditPlugin'
    })],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        store: 'TP.store.Expenses',
        displayInfo: true,
        items: [{
            xtype: 'button',
            text: 'Ajouter',
            icon: '/images/add.png',
            handler: function() {
                // empty record
                var r = Ext.ModelManager.create({
                    activite_id: null,
                    unite_id: null,
                    taux_tva_id: null, 
										activite_name: null
                },
                'TP.model.Expense');
                Ext.getStore('TP.store.Expenses').insert(0, r);
								this.up('gridpanel').getPlugin('rowEditPlugin').startEdit(0, 0);
            }
        }],
        layout: 'hbox' // The items are arranged horizontally
    }],
    initComponent: function() {

        this.columns = [{
            header: 'Modèle',
            dataIndex: 'item_id',
            flex: 1,
            summaryType: 'count',
            summaryRenderer: function(value, summaryData, dataIndex) {
                return Ext.String.format('Total : {0} dépense{1}', value, value !== 1 ? 's' : '');
            },
            renderer: function(value, meta, record) {
                if (value !== null) {
                    a = Ext.getStore('TP.store.Items').findRecord('id', value);
                    if (a !== null) {
                        return a.data.description;
                    }
                }
            },
            editor: {
                xtype: 'combo',
                forceSelection: false,
                queryMode: 'local',
                name: 'item_id',
                store: 'TP.store.Items',
                displayField: 'description',
                valueField: 'id',
                hiddenName: 'item_id',
                listeners: {
                    scope: this,
                    'select': function(field, value) {
                        field.ownerCt.form.setValues({
                            description: value[0].data.description,
                            unite_id: value[0].data.unite_id,
                            taux_tva_id: value[0].data.taux_tva_id,
                            prix_unitaire: value[0].data.unite_id,
                            categorie_id: value[0].data.categorie_id

                        });

                    }
                }
            }
        },
        {
            header: 'Activite',
            dataIndex: 'activite_id',
            flex: 1,
            renderer: function(value, meta, record) {
                if (value !== null) {
                    a = Ext.getStore('TP.store.Activites').findRecord('id', value);
                    if (a !== null) {
                        return a.data.description;
                    }
                }
            },
            editor: {
                xtype: 'combo',
                forceSelection: false,
                queryMode: 'local',
                name: 'activite_id',
                store: 'TP.store.Activites',
                displayField: 'description',
                valueField: 'id',
                hiddenName: 'activite_id'
            }
        },
        {
            header: 'Categorie',
            dataIndex: 'categorie_id',
            flex: 1,
            renderer: function(value, meta, record) {
                if (value !== null) {
                    a = Ext.getStore('TP.store.Categories').findRecord('id', value);
                    if (a !== null) {
                        return a.data.description;
                    }
                }
            },
            editor: {
                xtype: 'combo',
                forceSelection: false,
                queryMode: 'local',
                name: 'categorie_id',
                store: 'TP.store.Categories',
                displayField: 'description',
                valueField: 'id',
                hiddenName: 'categorie_id'
            }
        },
        {
            header: 'Date',
            dataIndex: 'date_item',
            width: 100,
            editor: {
                xtype: 'datefield'
            }
        },
        {
            header: 'Description',
            dataIndex: 'description',
            flex: 1,
            editor: {
                xtype: 'textfield'
            }
        },
        {
            header: 'Prix Unit.',
            dataIndex: 'prix_unitaire',
            width: 60,
            editor: {
                xtype: 'numberfield'
            }
        },
        {
            header: 'Qté',
            dataIndex: 'quantite',
            width: 60,
            editor: {
                xtype: 'numberfield'
            }
        },
        {
            header: 'Unite',
            dataIndex: 'unite_id',
            width: 80,
            renderer: function(value, meta, record) {
                if (value !== null) {
                    a = Ext.getStore('TP.store.Unites').findRecord('id', value);
                    if (a !== null) {
                        return a.data.description;
                    }
                }
            },
            editor: {
                xtype: 'combo',
                forceSelection: false,
                queryMode: 'local',
                name: 'unite_id',
                store: 'TP.store.Unites',
                displayField: 'description',
                valueField: 'id',
                hiddenName: 'unite_id'
            }
        },
        {
            header: 'Taux TVA',
            dataIndex: 'taux_tva_id',
            width: 60,
            renderer: function(value, meta, record) {
                if (value !== null) {
                    a = Ext.getStore('TP.store.TauxTvas').findRecord('id', value);
                    if (a !== null) {
                        return a.data.description;
                    }
                }
            },
            editor: {
                xtype: 'combo',
                forceSelection: false,
                queryMode: 'local',
                name: 'taux_tva_id',
                store: 'TP.store.TauxTvas',
                displayField: 'description',
                valueField: 'id',
                hiddenName: 'taux_tva_id'
            }
        },

        {
            header: 'Total HT',
            width: 80,
            dataIndex: 'total_ht',
            summaryType: 'sum'

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
                                Ext.getStore('TP.store.Expenses').remove(rec);
                            }
                        },
                        icon: Ext.Msg.QUESTION
                    });
                }
            }]
        }];

        this.callParent(arguments);
    }
});