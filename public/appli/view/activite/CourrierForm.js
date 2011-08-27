Ext.define('TP.view.activite.CourrierForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.activiteCourrierForm',
    layout: 'anchor',
    id: "activiteCourrierForm",
    frame: true,
    border: false,
    items: [{
        xtype: 'combo',
        fieldLabel: "Type de courrier",
        anchor: '96%',
        name: 'type_activite_id',
        store: 'TP.store.TypeActivites',
        displayField: 'description',
        valueField: 'id',
        hiddenName: 'type_activite_id',
        queryMode: 'local',
        forceSelection: true,
        allowBlank: false,
        triggerAction: 'all',
        lastQuery: ''

    },
    {
        xtype: 'fieldcontainer',
        layout: 'hbox',
        defaults: {
            flex: 1
        },
        anchor: '96%',
        items: [{
            xtype: 'datefield',
            fieldLabel: "Date",
            anchor: '96%',
            name: 'terme_date',
            allowBlank: false

        },
        {
            xtype: 'timefield',
            fieldLabel: "Heure",
            anchor: '96%',
            name: 'heure',
            allowBlank: false,
            increment: 30

        }]
    }]
});