Ext.define('TP.view.dossier.AllDossiers', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.dossierAllDossiers',
    layout: {
        type: 'table',
        // The total column count must be specified here
        columns: 2

    },
    defaults: {
        // applied to each contained panel
        bodyStyle: 'padding:10px',
        frame: true,
        width: 300,
        height: 200,
        margin: 10
    },
    title: 'Informations',
    initComponent: function() {
        this.items = [];
        this.callParent(arguments);
    }
});