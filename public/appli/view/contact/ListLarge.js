Ext.define('TP.view.contact.ListLarge', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.contactListLarge',
    title: 'Contacts enregistrés',
    store: 'TP.store.ContactDossiers',
    height: 300,
    initComponent: function() {
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            displayInfo: true,
            items: [{
                xtype: 'button',
                text: 'Afficher tous',
                icon: '/images/chart_organisation.png',
                action: 'filterAllContacts'
            },
            {
                xtype: 'button',
                text: 'Restreindre au dossier',
                icon: '/images/chart_organisation_add.png',
                action: 'filterContactsDossier'
            },
            {
                xtype: 'button',
                text: 'Tout ajouter',
                icon: '/images/group_add.png',
                action: 'addAllContactsToCom'
            }],
            layout: 'hbox' // The items are arranged horizontally
        }];
        this.columns = [{
            header: 'Nom',
            dataIndex: 'full_name',
            flex: 1
        },
        {
            header: 'Entreprise',
            dataIndex: 'entreprise',
            flex: 1
        },
        {
            header: 'Moyen de transmission',
            dataIndex: 'contact_medium_id',
            flex: 1,
            renderer: function(val) {
                if (val !== null) {
                    return Ext.getStore('TP.store.TransmissionMediums').findRecord('id', val).data.description;
                }
            }
        },
        {
            xtype: 'actioncolumn',
            width: 30,
            items: [{
                icon: '/images/add.png',
                tooltip: 'Ajouter',
                handler: function(grid, rowIndex, colIndex) {
                    record = grid.getStore().getAt(rowIndex);
                    concom = Ext.ModelManager.create({
                        contact_id: record.data.id,
                        transmission_medium_id: record.data.contact_medium_id
                    },
                    'TP.model.ContactToCommunication');
                    Ext.getStore('TP.store.ContactToCommunications').insert(0, concom);
                }
            }]
        }];
        this.callParent(arguments);
    }

});