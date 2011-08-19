Ext.define('TP.view.communication.DocumentForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.communicationDocumentForm',
    layout: 'anchor',
    id: "communicationDocumentForm",
    frame: true,
    border: false,
    items: [{
        xtype: 'combo',
        fieldLabel: "Document émis par",
        anchor: '96%',
        name: 'sender_id',
        store: 'TP.store.Contacts',
        displayField: 'nom_complet',
        valueField: 'id',
        hiddenName: 'sender_id',
        queryMode: 'local',
        forceSelection: true,
        allowBlank: false

    }]
});