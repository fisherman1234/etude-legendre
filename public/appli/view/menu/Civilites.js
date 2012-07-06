Ext.define('TP.view.menu.Civilites', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.menuCivilites',

    title: 'Fonctions types',
    store: 'TP.store.Civilites',
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
                    grid = this.up('gridpanel');
                    model = grid.store.model.modelName;
                    var r = Ext.ModelManager.create({},
                    model);
                    grid.store.insert(0, r);
                    grid.getPlugin('rowEditPlugin').startEdit(0, 0);
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