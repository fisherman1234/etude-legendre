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
        console.log('click');
        var comWin = Ext.getCmp('contacttocommunicationEditContactCommunication');
        if (typeof(comWin) == 'undefined') {
            comWin = Ext.widget('contacttocommunicationEditContactCommunication');
        }
        comWin.show();
    },
    purgeContactToCommunicationList: function() {
        Ext.getStore('TP.store.ContactToCommunications').removeAll();

    },
    saveConCom: function() {
        var comWin = Ext.getCmp('contacttocommunicationEditContactCommunication');
        Ext.getStore('TP.store.ContactToCommunications').sync();
        comWin.hide();
    }

});