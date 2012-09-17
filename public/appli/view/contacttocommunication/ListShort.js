Ext.define('TP.view.contacttocommunication.ListShort', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.contacttocommunicationListShort',
    title: 'Contacts',
    store: 'TP.store.ContactToCommunications',

    initComponent: function() {

        this.columns = [{
            header: 'Nom',
            dataIndex: 'contact_id',
            flex: 1,
            renderer: function(val) {
                if (val !== null) {
                  if (Ext.getStore('TP.store.ContactDossiers').findRecord('id', val) !== null){
                    return Ext.getStore('TP.store.ContactDossiers').findRecord('id', val).data.nom_complet;
                  }
                }
            }
        }];
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            displayInfo: true,
            items: [{
                xtype: 'button',
                text: 'Modifier les destinataires',
                icon: '/images/email_edit.png',
                action: 'editContacts'
            }],
            layout: 'hbox' // The items are arranged horizontally
        }];
        this.callParent(arguments);
    }
});