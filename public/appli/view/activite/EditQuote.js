Ext.define('TP.view.activite.EditQuote', {
    extend: 'Ext.window.Window',
    alias: 'widget.activiteEditQuote',
    id: 'activiteEditQuote',
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
    items: [{
        xtype: 'activiteQuoteForm',
        flex: 1, 
				width: '100%'
    },
    {
        xtype: 'expenseQuoteList',
        flex: 6, 
				width: '100%'

    }],
    buttons: [{
        text: 'Annuler',
        action: 'cancel', 
				id: 'cancelAdd',
				hidden: true
				

    },{
        text: 'Enregistrer',
        action: 'save'

    },
    {
        text: 'Supprimer',
        action: 'delete', 
				hidden: true, 
				id: 'delete'
				
    }]
});