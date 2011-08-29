Ext.define('TP.view.contact.ContactList', {
    extend: 'Ext.window.Window',
    alias: 'widget.contactContactList',
    title: "Recherche d'un contact",
    width: 800,
    height: 400,
		modal: true,
    autoShow: true,
    layout: 'fit',
    closable: false,
    initComponent: function() {
        this.items = [{
            xtype: 'contactListAll'
        }];
				this.buttons = [{
            text: 'Fermer',
            action: 'close'
        }];

        this.callParent(arguments);
    }
});