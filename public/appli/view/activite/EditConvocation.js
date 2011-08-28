Ext.define('TP.view.activite.EditConvocation', {
    extend: 'Ext.window.Window',
    alias: 'widget.activiteEditConvocation',
		closable: false,
    title: "Détails de la convocation",
    width: 900,
    height: 400,
    autoShow: true,
    bodyStyle: 'padding:15px',
    layout: 'vbox',
    defaults: {
        // applied to each contained panel
        border: false
    },
		initComponent: function() {
		      this.items = [{
			        xtype: 'activiteConvocationForm',
			        flex: 1, 
							width: '100%'
			    }];
					this.buttons = [{
			        text: 'Annuler',
			        action: 'cancelAddConvocation'


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