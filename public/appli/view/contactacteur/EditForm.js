Ext.define('TP.view.contactacteur.EditForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.contactacteurEditForm',
    layout: 'anchor',
    id: "contactacteurEditForm",
    frame: true,
    border: false,
    items: [{
        xtype: 'combo',
        fieldLabel: 'Qualité procédurale',
        anchor: '100%',
        name: 'qualite_procedurale_id',
        store: 'TP.store.QualiteProcedurales',
        displayField: 'description',
        valueField: 'id',
        hiddenName: 'qualite_procedurale_id',
        queryMode: 'local',
        forceSelection: true,
        allowBlank: false

    },
    {
        xtype: 'textfield',
        fieldLabel: 'Références correspondance',
        name: 'references',
        anchor: '100%'
    },
		{
        xtype: 'textfield',
        fieldLabel: 'Role dans la procédure',
        name: 'role_in_procedure',
        anchor: '100%'
    },
    {
        xtype: 'textarea',
        fieldLabel: 'Notes',
        name: 'notes',
        anchor: '100%'
    }]
});