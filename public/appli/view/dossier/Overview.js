Ext.define('TP.view.dossier.Overview', {
    extend: 'Ext.panel.Panel',
    layout: 'border',
    alias: 'widget.dossierOverview',
    border: false,
    deferredRender: false,
    items: [{
        region: 'center',
        id: 'dossierCenter',
        xtype: 'tabpanel',
        items: []

    },
    {
        region: 'east',
        title: 'Rappels',
        id: 'dossierReminders',
        collapsible: true,
        width: 200
    }],
    id: "overviewPan"
});