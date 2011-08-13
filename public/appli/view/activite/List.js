Ext.define('TP.view.activite.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.activiteList',
		id: 'activiteList',
    title: 'Activites',
    store: 'TP.store.Activites',
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'TP.store.Activites',
        // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
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