Ext.define('TP.view.contacttocommunication.ListLarge', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.contacttocommunicationListLarge',
    title: 'Destinataires de la communication',
    store: 'TP.store.ContactToCommunications',
    selType: 'cellmodel',
    height: 300,
    initComponent: function() {
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            displayInfo: true,
            items: [{
                xtype: 'button',
                text: 'Vider la liste des destinataires',
                icon: '/images/group_delete.png',
                action: 'purgeContactToCommunicationList'
            }],
            layout: 'hbox' // The items are arranged horizontally
        }];
        this.plugins = [
        Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        })];
        this.columns = [{
            header: 'Nom',
            dataIndex: 'contact_id',
            renderer: function(val) {
                if (val !== null) {
                    return Ext.getStore('TP.store.ContactDossiers').findRecord('id', val).data.full_name;
                }
            },
            flex: 1
        },
        {
            header: 'Enreprise',
            dataIndex: 'contact_id',
            renderer: function(val) {
                if (val !== null) {
                    return Ext.getStore('TP.store.ContactDossiers').findRecord('id', val).data.entreprise;
                }
            },
            flex: 1
        },
        {
            header: 'Moyen de transmission',
            dataIndex: 'transmission_medium_id',
            flex: 1,
            renderer: function(val) {
                if (val !== null) {
                    return Ext.getStore('TP.store.TransmissionMediums').findRecord('id', val).data.description;
                }
            },
            editor: {
                xtype: 'combo',
                forceSelection: true,
                queryMode: 'local',
                name: 'transmission_medium_id',
                store: 'TP.store.TransmissionMediums',
                displayField: 'description',
                valueField: 'id',
                hiddenName: 'transmission_medium_id'
            }
        },
        {
            xtype: 'actioncolumn',
            width: 30,
            items: [{
                icon: '/images/delete.png',
                tooltip: 'Supprimer',
                handler: function(grid, rowIndex, colIndex) {
                    record = grid.getStore().getAt(rowIndex);
                    Ext.getStore('TP.store.ContactToCommunications').remove(record);

                }
            }]
        }];
        this.callParent(arguments);
    }

});