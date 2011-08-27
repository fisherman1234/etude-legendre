Ext.define('TP.view.activite.EditConvocation', {
    extend: 'Ext.window.Window',
    alias: 'widget.activiteEditConvocation',
    id: 'activiteEditConvocation',
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
    items: [{
        xtype: 'activiteConvocationForm',
        flex: 1, 
				width: '100%'
    }],
    buttons: [{
        text: 'Annuler',
        action: 'cancelAddConvocation', 
				id: 'cancelAddConvocation',
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