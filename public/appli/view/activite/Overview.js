Ext.define('TP.view.activite.Overview', {
    extend: 'Ext.Panel',
    alias: 'widget.activiteOverview',
    id: "activiteOverview",
    layout: 'border',
		title: "Activites",
    items: [{
        region: 'center',
        xtype: 'activiteList'
    },
    {
        region: 'south',
        collapsible: true,
        items: [],
        hight: 300
    }]
});