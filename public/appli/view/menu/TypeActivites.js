Ext.define('TP.view.menu.TypeActivites', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.menuTypeActivites',

    title: 'Liste des courriers et activités',
    store: 'TP.store.TypeActivites',
    selType: 'rowmodel',

    initComponent: function() {
        Ext.getStore('TP.store.TypeActivites').clearFilter();
        Ext.getStore('TP.store.TypeActivites').filter('categorie_id', 1);

        this.on('beforeclose', function() {
            Ext.getStore('TP.store.TypeActivites').clearFilter();
            delete Ext.getStore('TP.store.ContactDossiers').proxy.extraParams.dossier;
        });
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
                    r.set('categorie_id', 1);
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
            width: 60,
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
            },
            {
                icon: '/images/email_edit.png',
                tooltip: 'Editer courrier',
                handler: function(grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    if (rec !== null && rec.data.categorie_id == 1) {

                        var a = Ext.widget('messageTemplateEdit');
                        a.parentRowIndex = rowIndex;
                        if ((rec.data.message_template_id !== null) || (typeof rec.data.message_template_id != 'undefined')) {
                            var msgtp = Ext.getStore('TP.store.MessageTemplates').findRecord('id', rec.data.message_template_id);

                            if (msgtp !== null) {
                                a.down('form').loadRecord(msgtp);
                            }
                        }
                    } else {
                        Ext.MessageBox.alert('Edition', 'Vous ne pouvez pas créer un message pour ce type d\'activité.', null);

                    }

                }
            }]
        }];

        this.callParent(arguments);
    }
});