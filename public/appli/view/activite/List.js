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
        },		{
		            xtype: 'button',
		            text: 'Nouveau devis',
		            icon: '/images/calculator_add.png',
								action: 'add_quote'
		        },
						{
				            xtype: 'button',
				            text: 'Nouveau document à enregistrer',
				            icon: '/images/lorry_add.png',
										action: 'add_document'
				        }],
        layout: 'hbox' // The items are arranged horizontally
    }],
    
    initComponent: function() {

        this.columns = [{
            header: 'Description',
            dataIndex: 'description',
            flex: 1
        },
        {
            header: 'No Accedit',
            dataIndex: 'no_accedit',
            flex: 1
        }];

        this.callParent(arguments);
    }
});