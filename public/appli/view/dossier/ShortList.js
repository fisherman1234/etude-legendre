Ext.define('TP.view.dossier.ShortList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.dossiershortlist',

    title: 'Tous les dossiers',
    store: 'TP.store.Dossiers',
    features: [{
        ftype: 'grouping',
        groupHeaderTpl: '{[formatHeaderDossier(values.name)]} ({rows.length})'
    }],

    initComponent: function() {

        this.columns = [{
            header: 'Nom',
            dataIndex: 'nom_dossier',
            flex: 1
        },
        {
            header: 'Reference Cabinet',
            dataIndex: 'ref_cabinet',
            flex: 1
        }];

        this.callParent(arguments);
    }
});

function formatHeaderDossier(value) {
    actistore = Ext.getStore('TP.store.TypeEtatDossiers');
    if (actistore.isLoading()) {
        setTimeout(formatHeaderDossier(value), 1000);
    } else {
        return actistore.findRecord('id', value).data.description;
    }
}