Ext.define('TP.controller.Contacts', {
    extend: 'Ext.app.Controller',
    stores: ['Contacts', 'TP.store.Civilites', 'ContactDossiers', 'TP.store.ContactToCommunications', 'TP.store.TransmissionMediums'],
    models: ['Contact', 'TP.model.ContactToCommunication', 'TP.model.TransmissionMedium'],
    views: ['contact.ListLarge', 'contact.EditLight', 'contact.Edit', 'contact.EditForm', 'contact.ContactList', 'contact.ListAll'],

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
            'contactEdit button[action=cancel]': {
                click: this.cancelAdd
            },
            'contactEditLight button[action=add_institution]': {
                click: this.addInstitution
            },
            'contactEdit button[action=add_institution]': {
                click: this.addInstitution
            },
            'contactEditForm button[action=add_institution]': {
                click: this.addInstitution
            },
            'contactListLarge button[action=filterAllContacts]': {
                click: this.filterAllContacts
            },
            'contactListLarge button[action=filterContactsDossier]': {
                click: this.filterContactsDossier
            },
            'contactListLarge button[action=addAllContactsToCom]': {
                click: this.addAllContactsToCom
            },
            'contactListAll': {
                itemdblclick: this.openContact
            },
						'contactContactList button[action=close]': {
                click: this.cancelAdd
            }

        });
    },
		openContact: function(grid, record){
			win = Ext.widget('contactEdit');
			form = win.down('form');
			form.loadRecord(record);
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
        win = button.up("window");
        contactForm = win.down('form');
				if (contactForm.form.isValid()){
				  record = contactForm.getRecord();
	        values = contactForm.getValues();
					if (typeof record == "undefined"){
						record = Ext.ModelManager.create({},
		        'TP.model.Contact');
						Ext.getStore('TP.store.Contacts').insert(0, record);
					}
	        record.set(values);
	        Ext.getStore('TP.store.Contacts').sync();
	        win.close();	
				}


    },
    cancelAdd: function(button) {
        win = button.up("window");
        win.close();
    },
    deleteContact: function(button)  {
        win = button.up("window");
        contactForm = win.down('form');
        record = contactForm.getRecord();
        Ext.Msg.show({
            title: 'Supprimer cet enregistrement',
            msg: 'Voulez-vous supprimer définitivement ce contact ? Toutes les associations entre ce contact et les différents dossiers seront également supprimées (montant des devis, notes ...)',
            buttons: Ext.Msg.YESNO,
            fn: function(id) {
                if (id == "yes") {
                    if (typeof record != "undefined") {
                        Ext.getStore('TP.store.Contacts').remove(record);
                        Ext.getStore('TP.store.Contacts').sync();
                    }
                    win.close();

                }
            },
            icon: Ext.Msg.QUESTION
        });
    },
    filterAllContacts: function() {
        delete Ext.getStore('TP.store.ContactDossiers').proxy.extraParams.dossier;
        Ext.getStore('TP.store.ContactDossiers').load();
    },
    filterContactsDossier: function() {
        Ext.getStore('TP.store.ContactDossiers').proxy.extraParams.dossier = dossier_id; //  a supprimer ensuite
        Ext.getStore('TP.store.ContactDossiers').load();
    },
    addAllContactsToCom: function() {
        records = Ext.getStore('TP.store.ContactDossiers').data.items;

        //activite = Ext.ModelManager.create({},'TP.model.Activite');
        //Ext.getStore('TP.store.Activites').insert(0, activite);

        Ext.each(records, function(record, index) {
            concom = Ext.ModelManager.create({
                contact_id: record.data.id,
                transmission_medium_id: record.data.contact_medium_id
            },
            'TP.model.ContactToCommunication');
            Ext.getStore('TP.store.ContactToCommunications').insert(0, concom);

        });

    },
    addContactCom: function(grid, rowIndex, colIndex) { // unused ...
        record = grid.getStore().getAt(rowIndex);
        concom = Ext.ModelManager.create({
            contact_id: record.data.id,
            transmission_medium_id: record.data.contact_medium_id
        },
        'TP.model.ContactToCommunication');
        Ext.getStore('TP.store.ContactToCommunications').insert(0, concom);
    }

});