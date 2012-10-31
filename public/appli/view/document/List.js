Ext.define('TP.view.document.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.documentList',
    id: 'documentList',
    title: 'Documents',
    store: 'TP.store.Documents',
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        displayInfo: true,
        items: [{
            xtype: 'button',
            text: 'Ajouter',
            icon: '/images/add.png',
            action: 'new',
            handler: function() {
                // empty record
		            var documentItem = Ext.widget('documentEdit');
            }
        }],
        layout: 'hbox' // The items are arranged horizontally
    }],


    initComponent: function() {

        this.columns = [{
            header: 'Emetteur',
            dataIndex: 'contact_id',
            flex: 1,
            renderer: function(value, meta, record) {
	            if (value !== null) {
                  a = Ext.getStore('TP.store.Contacts').findRecord('id', value);
                  if (a !== null) {
                      return a.data.full_name;
                  }
              }
            }
        },{
            header: 'Description',
            dataIndex: 'description',
            flex: 1
        },
        {
            header: 'Type',
            dataIndex: 'file_content_type',
            flex: 1
        },
        {
            header: 'Nom du fichier',
            dataIndex: 'file_file_name',
            flex: 1
        },
        {
            header: 'Taille',
            dataIndex: 'file_file_size',
            flex: 1,
            renderer: Ext.util.Format.fileSize

        },
        {
            header: 'Lien',
            dataIndex: 'short_link',
            flex: 1,
            renderer: function(value, meta, record) {
              return '<a target="_blank" rel="external" href="' + value + '">' + '<img src="/images/page.png"> ' + value  + '</a>';
            }
        }];

        this.callParent(arguments);
    }
});
