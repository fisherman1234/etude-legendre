Ext.define('TP.view.dossier.LargeList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.dossierLargeList',

    store: 'TP.store.Dossiers',
    features: [{
        ftype: 'grouping',
        groupHeaderTpl: '{[formatHeaderDossier(values.name)]} ({rows.length})'
    }],

    initComponent: function() {
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            displayInfo: true,
            items: [{
                xtype: 'button',
                text: 'Dégrouper',
                icon: '/images/package_delete.png',
                handler: function(el) {
                    Ext.getStore('TP.store.Dossiers').clearGrouping();
                }
            },
            {
                xtype: 'button',
                text: 'Regrouper',
                action: 'filterTomorrow',
                icon: '/images/package_add.png',
                handler: function(el) {
                    Ext.getStore('TP.store.Dossiers').group('type_etat_dossier_id');
                }
            }],
            layout: 'hbox' // The items are arranged horizontally
        }];

        this.columns = [{
            header: 'Nom',
            dataIndex: 'nom_dossier',
            flex: 1
        },
        {
            header: 'Reference Cabinet',
            dataIndex: 'ref_cabinet',
            flex: 1
        },
        {
            header: 'Juridiction',
            dataIndex: 'institution_id',
            flex: 1,
            renderer: function(value, meta, record) {
                if (value !== null) {
                    a = Ext.getStore('TP.store.Institutions').findRecord('id', value);
                    if (a !== null) {
                        return a.data.nom;
                    }
                }
            }
        },
        {
            header: 'Date de la décision',
            dataIndex: 'date_decision',
            flex: 1,
            renderer: Ext.util.Format.dateRenderer('d/m/Y')
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