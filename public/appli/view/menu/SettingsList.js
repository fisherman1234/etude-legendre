Ext.define('TP.view.menu.SettingsList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.settingsList',

    store: 'TP.store.Settings',
    initComponent: function() {

        this.columns = [{
            header: 'Paramètres',
            dataIndex: 'description',
            flex: 1
        }];

        this.callParent(arguments);
    }
});