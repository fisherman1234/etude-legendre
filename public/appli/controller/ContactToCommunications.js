Ext.define('TP.controller.ContactToCommunications', {
    extend: 'Ext.app.Controller',
    stores: ['ContactToCommunications', 'TP.store.ContactDossiers', 'TP.store.TransmissionMediums'],
    models: ['ContactToCommunication', 'TP.model.TransmissionMedium'],
    views: ['contacttocommunication.ListLarge', 'contacttocommunication.ListShort', 'contacttocommunication.EditContactCommunication'],

    init: function() {
        this.control({
            'contacttocommunicationListShort button[action=editContacts]': {
                click: this.editContacts
            },
            'contacttocommunicationListLarge button[action=purgeContactToCommunicationList]': {
                click: this.purgeContactToCommunicationList
            },
            'contacttocommunicationEditContactCommunication button[action=saveConCom]': {
                click: this.saveConCom
            }

        });
    },
    editContacts: function() {
        comWin = Ext.widget('contacttocommunicationEditContactCommunication');
    },
    purgeContactToCommunicationList: function() {
        Ext.getStore('TP.store.ContactToCommunications').removeAll();

    },
    saveConCom: function(button) {
        comWin = button.up('window');
				communication_id = Ext.getStore('TP.store.ContactToCommunications').proxy.extraParams.communication_id;
				newRecords = Ext.getStore('TP.store.ContactToCommunications').getNewRecords();
				Ext.each(newRecords, function(record, index) {
            record.set('communication_id', communication_id);
        });
        Ext.getStore('TP.store.ContactToCommunications').sync();
        comWin.close();
    }

});