Ext.define('TP.view.document.ListShort', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.documentListShort',
    //id: 'documentListShort',
    title: 'Documents',
    store: 'TP.store.ActiviteToDocuments',


    initComponent: function() {
				this.dockedItems = [{
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
		    }];
        this.columns = [{
            header: 'Description',
            dataIndex: 'description',
            flex: 1
        },
        {
            header: 'Lien',
            dataIndex: 'short_link',
            flex: 1,
            renderer: function(value, meta, record) {
                return '<a target="_blank" rel="external" href="' + value + '">' + '<img src="/images/page.png"> ' + value  + '</a>';
            }
        },
        {
            header: 'Taille',
            dataIndex: 'file_file_size',
            flex: 1,
            renderer: Ext.util.Format.fileSize

        }];

        this.callParent(arguments);
    }
});