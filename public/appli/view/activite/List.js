Ext.define('TP.view.activite.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.activiteList',
		id: 'activiteList',
    title: 'Activites',
    store: 'TP.store.Activites',
		dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        store: 'TP.store.Expenses',
        displayInfo: true,
        items: [{
            xtype: 'button',
            text: 'Nouvel appel',
            icon: '/images/telephone_add.png',
						action: 'add_call'
        }],
        layout: 'hbox' // The items are arranged horizontally
    }],
    selType: 'rowmodel',
    plugins: [
    Ext.create('Ext.grid.plugin.RowEditing', {
        clicksToEdit: 1
    })],

    initComponent: function() {

        this.columns = [{
            header: 'Description',
            dataIndex: 'description',
            flex: 1
        },
        {
            header: 'No Accedit',
            dataIndex: 'no_accedit',
            flex: 1
        }];

        this.callParent(arguments);
    }
});