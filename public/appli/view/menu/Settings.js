Ext.define('TP.view.menu.Settings', {
    extend: 'Ext.window.Window',
    alias: 'widget.menuSettings',
    title: "Paramètres",
    width: 900,
    height: 400,
    autoShow: true,
    layout: 'border',
    initComponent: function() {
        this.items = [{
            xtype: 'settingsList',
            region: 'east',
            width: 200
        },
        {
            layout: 'card',
            xtype: 'panel',
            items: []
        }];

        this.callParent(arguments);
    }
});