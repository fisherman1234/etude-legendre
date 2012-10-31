Ext.define('TP.view.contact.ListAll', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.contactListAll',
    store: 'TP.store.Contacts',
    initComponent: function() {
        this.columns = [{
            header: 'Nom',
            dataIndex: 'nom',
            flex: 1
        },
        {
            header: 'Prénom',
            dataIndex: 'prenom',
            flex: 1
        },
        {
            header: 'Société',
            dataIndex: 'institution_id',
            flex: 1,
						renderer: function(value, meta, record) {
								if (value!== null){
									record = Ext.getStore('TP.store.Institutions').findRecord('id', value);
									if (record !== null){
										return record.data.nom;
									}
								}
            }
        },
        {
            header: 'Email',
            dataIndex: 'email',
            flex: 1
        },
        {
            header: 'Téléphone',
            dataIndex: 'telephone',
            flex: 1
        }];

        this.callParent(arguments);
    }

});
