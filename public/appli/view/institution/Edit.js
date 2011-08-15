Ext.define('TP.view.institution.Edit', {
    extend: 'Ext.window.Window',
    alias: 'widget.institutionEdit',
		id:'institutionEdit',
    title: 'Détails de la société',
    width: 900,
    height: 400,
    autoShow: true,
		bodyStyle: 'padding:15px',
    defaults: {
        // applied to each contained panel
        border: false
    },
    items: [{
        xtype: 'institutionEditForm'
    }],
    buttons: [{
        text: 'Enregistrer',
        action: 'save'
    },
    {
        text: 'Annuler',
        scope: this,
        handler: this.close
    }]

});