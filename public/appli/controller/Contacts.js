Ext.define('TP.controller.Contacts', {
    extend: 'Ext.app.Controller',
    stores: ['Contacts', 'TP.store.Civilites'],
    models: ['Contact'],
    views: ['contact.EditLight', 'contact.Edit', 'contact.EditForm'],

    init: function() {
        this.control({
            'contactEditLight button[action=save]': {
                click: this.saveActeur
            },
            'contactEditLight button[action=more]': {
                click: this.editActeur
            },
            'contactEdit button[action=save]': {
                click: this.saveContact
            },
            'contactEdit button[action=delete]': {
                click: this.deleteContact
            },
            'contactEditLight button[action=add_institution]': {
                click: this.addInstitution
            },
            'contactEdit button[action=add_institution]': {
                click: this.addInstitution
            },
            'contactEditForm button[action=add_institution]': {
                click: this.addInstitution
            }
        });
    },
    addInstitution: function(button) {
        //todo : lier directement le champs parent lors de l'ajout
        institution = Ext.widget('institutionEdit');
    },
    saveActeur: function(button) {
        contactEditLight = Ext.getCmp("contactEditLight");
        contactEditLightForm = contactEditLight.down('form');
        record = contactEditLightForm.getRecord();
        values = contactEditLightForm.getValues();
        record.set(values);
        record.store.sync();
    },
    editActeur: function(button) {
        contactEditLight = Ext.getCmp("contactEditLight");
        contactEditLightForm = contactEditLight.down('form');
        record = contactEditLightForm.getRecord();
        formDossier = Ext.widget('contactEdit').down('form');
        formDossier.loadRecord(record);
    },
    saveContact: function(button) {
        contactForm = Ext.getCmp("contactEditForm");
        record = contactForm.getRecord();
        values = contactForm.getValues();
        record.set(values);
        record.store.sync();
        button.up("window").close();

    },
    deleteContact: function(button)  {
        contactForm = Ext.getCmp("contactEditForm");
        record = contactForm.getRecord();
        Ext.Msg.show({
            title: 'Supprimer cet enregistrement',
            msg: 'Voulez-vous supprimer définitivement ce contact ? Toutes les associations entre ce contact et les différents dossiers seront également supprimées (montant des devis, notes ...)',
            buttons: Ext.Msg.YESNO,
            fn: function(id) {
                if (id == "yes") {
                    Ext.getStore('TP.store.Contacts').remove(record);
                    Ext.getStore('TP.store.Contacts').sync();
                    button.up("window").close();

                }
            },
            icon: Ext.Msg.QUESTION
        });
    }

});