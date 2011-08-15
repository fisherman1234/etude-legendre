Ext.define('TP.view.contactacteur.PickContact', {
    extend: 'Ext.form.Panel',
    alias: 'widget.PickContact',
    id: 'PickContact',
    frame: true,
		border: false,
    items: [{
        xtype: 'displayfield',
        name: 'displayfield1',
        value: 'Choisir un contact existant :'
    },
    {
        xtype: 'combo',
        anchor: '96%',
        name: 'contact_id',
        store: 'TP.store.Contacts',
        displayField: 'nom_complet',
        valueField: 'id',
        hiddenName: 'contact_id',
        queryMode: 'local'

    },
    {
        xtype: 'fieldcontainer',
        defaultType: 'checkboxfield',
        items: [{
            boxLabel: 'Ou créer un nouveau contact',
            name: 'add_contact',
            inputValue: '1',
            id: 'add_contact'
        }]
    }]
});