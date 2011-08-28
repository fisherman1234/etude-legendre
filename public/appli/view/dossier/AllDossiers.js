Ext.define('TP.view.dossier.AllDossiers', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.dossierAllDossiers',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    defaults: {
        // applied to each contained panel
        frame: true
    },
    title: 'Informations',
    prepareData: function() {
        // Defining the fields for the record.
        var fields = ['description', 'recordCount'];

        // Creates an array with the data
        var data = [];
        a = Ext.getStore('TP.store.Dossiers');
        a.group("type_etat_dossier_id");
        values = a.count(true);
        Ext.Object.each(values, function(key, value, myself) {
            data.push({
                recordCount: value,
                description: key
            });

        });

        // And finally the store
        var store = new Ext.data.Store({
            fields: fields,
            data: data
        });
        return store;

    },
    initComponent: function() {
        this.items = [
        {
            xtype: 'chart',
            animate: true,
            store: this.prepareData(),
            flex: 1,
            theme: 'Base:gradients',
            series: [{
                type: 'pie',
                field: 'recordCount'
            }]
        }];

        this.callParent(arguments);
    }
});