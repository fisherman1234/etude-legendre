Ext.define('TP.view.menu.Categories', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.menuCategories',

    title: 'Catégories de dépenses',
    store: 'TP.store.Categories',
    selType: 'rowmodel',

    initComponent: function() {
        this.plugins = [
        Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToEdit: 1,
            pluginId: 'rowEditPlugin'
        })];
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                xtype: 'button',
                text: 'Ajouter',
                icon: '/images/add.png',
                handler: function() {
                    // empty record
                    var r = Ext.ModelManager.create({},
                    'TP.model.Categorie');
                    Ext.getStore('TP.store.Categories').insert(0, r);
                    this.up('gridpanel').getPlugin('rowEditPlugin').startEdit(0, 0);
                }
            }],
            layout: 'hbox' // The items are arranged horizontally
        }];
        this.columns = [{
            header: 'Description',
            dataIndex: 'description',
            flex: 1,
            editor: {
                xtype: 'textfield'
            }
        },
        {
            header: 'Taux de TVA',
            dataIndex: 'taux_tva_id',
            flex: 1,
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
                forceSelection: true,
                queryMode: 'local',
                name: 'taux_tva_id',
                store: 'TP.store.TauxTvas',
                displayField: 'description',
                valueField: 'id',
                hiddenName: 'taux_tva_id'
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
                                grid.store.remove(rec);
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