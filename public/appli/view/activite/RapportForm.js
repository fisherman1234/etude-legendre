Ext.define('TP.view.activite.RapportForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.activiteRapportForm',
    layout: 'anchor',
    frame: true,
    border: false,
    initComponent: function() {
        this.items = [{
		        xtype: 'textfield',
		        fieldLabel: "Description",
		        anchor: '96%',
		        name: 'description',
						allowBlank:false
		    },{
            xtype: 'combo',
            fieldLabel: "Type de Rapport",
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
                name: 'terme_date'

            },
            {
                xtype: 'timefield',
                fieldLabel: "Heure",
                anchor: '96%',
                name: 'heure',
                allowBlank: false,
                increment: 30

            }]
        }];
        this.callParent(arguments);
    }
});