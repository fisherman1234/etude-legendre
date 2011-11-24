Ext.define('TP.view.institution.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.institutionlist',

    title: 'Toutes les sociétés',
    store: 'TP.store.Institutions',
    initComponent: function() {

        this.columns = [{
            header: 'Nom',
            dataIndex: 'nom',
            flex: 1
        },
        {
            header: 'Chambre',
            dataIndex: 'chambre',
            flex: 1
        },
        {
            header: 'Telephone',
            dataIndex: 'telephone',
            flex: 1
        },
        {
            header: 'Fax',
            dataIndex: 'fax',
            flex: 1
        },
        {
            header: 'Type',
            dataIndex: 'type_institution_id',
            flex: 1, 
						renderer: function(value, meta, record) {
                if (value !== null) {
                    a = Ext.getStore('TP.store.TypeInstitutions').findRecord('id', value);
                    if (a !== null) {
                        return a.data.description;
                    }
                }
            }
        }

        ];

        this.callParent(arguments);
    }
});