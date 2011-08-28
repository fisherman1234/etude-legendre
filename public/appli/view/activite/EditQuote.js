Ext.define('TP.view.activite.EditQuote', {
    extend: 'Ext.window.Window',
    alias: 'widget.activiteEditQuote',
    title: "Détails du devis",
		closable: false,
    width: 900,
    height: 500,
    autoShow: true,
    bodyStyle: 'padding:15px',
    layout: 'vbox',
    defaults: {
        // applied to each contained panel
        border: false
    },
		initComponent: function() {
        this.items = [{
		        xtype: 'activiteQuoteForm',
		        flex: 1, 
						width: '100%'
		    },
		    {
		        xtype: 'expenseQuoteList',
		        flex: 6, 
						width: '100%'

		    }];
				this.buttons= [{
		        text: 'Annuler',
		        action: 'cancel'


		    },{
		        text: 'Enregistrer',
		        action: 'save'

		    },
		    {
		        text: 'Supprimer',
		        action: 'delete'

		    }];

        this.callParent(arguments);
    }

});