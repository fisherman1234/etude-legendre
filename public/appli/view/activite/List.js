Ext.define('TP.view.activite.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.activiteList',
    id: 'activiteList',
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
        },
        {
            xtype: 'button',
            text: 'Nouveau devis',
            icon: '/images/calculator_add.png',
            action: 'add_quote'
        },
        {
            xtype: 'button',
            text: 'Réception pièce',
            icon: '/images/lorry_add.png',
            action: 'add_document'
        },
        {
            xtype: 'button',
            text: 'Nouvelle Convocation',
            icon: '/images/calendar_add.png',
            action: 'add_convocation'
        },
        {
            xtype: 'button',
            text: 'Nouveau courrier',
            icon: '/images/email_add.png',
            action: 'courrier_add'
        },
        {
            xtype: 'button',
            text: 'Nouveau CR/Rapport',
            icon: '/images/report_add.png',
            action: 'add_report'
        }],
        layout: 'hbox' // The items are arranged horizontally
    }],

    initComponent: function() {

        this.columns = [{
            header: 'Date',
            dataIndex: 'terme_date',
						renderer: Ext.util.Format.dateRenderer('Y-m-d'),
            flex: 1
        },{
            header: 'Description',
            dataIndex: 'description',
            flex: 1
        },
        {
            header: 'Type',
            dataIndex: 'type_activite_id',
            flex: 1,
            renderer: function(val) {
                if (val !== null && val !== '') {
                    rec = Ext.getStore('TP.store.TypeActivites').findRecord('id', val);
                    if (rec !== null) {
                        return rec.data.description;
                    }

                }
            }
        }];

        this.callParent(arguments);
    }
});