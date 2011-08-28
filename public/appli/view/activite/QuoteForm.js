Ext.define('TP.view.activite.QuoteForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.activiteQuoteForm',
    layout: 'anchor',
    frame: true,
    border: false,
		initComponent: function() {
        this.items= [{
		        xtype: 'textfield',
		        fieldLabel: "Description",
		        anchor: '96%',
		        name: 'description',
						allowBlank:false
		    }];

        this.callParent(arguments);
    }
    
});