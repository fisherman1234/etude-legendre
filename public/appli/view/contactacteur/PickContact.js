Ext.define('TP.view.contactacteur.PickContact', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.PickContact',
    id: 'PickContact',
    items: [{
        xtype: 'form',
        border: false,
        items: [{
            xtype: 'container',
            layout: 'anchor',
            columnWidth: 0.5,
            items: [{
                xtype: 'combo',
                fieldLabel: "Choisir un contact existant ...",
                anchor: '96%',
                name: 'contact_id',
                store: 'TP.store.Contacts',
                displayField: 'full_name',
                valueField: 'id',
                hiddenName: 'contact_id',
                queryMode: 'local'

            },
            {
                xtype: 'fieldcontainer',
                fieldLabel: 'ou : ',
                defaultType: 'checkboxfield',
                items: [{
                    boxLabel: 'Créer un contact',
                    name: 'add_contact',
                    inputValue: '1',
                    id: 'add_contact'
                }]
            }]
        }]
    }]
});