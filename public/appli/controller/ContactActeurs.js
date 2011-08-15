Ext.define('TP.controller.ContactActeurs', {
    extend: 'Ext.app.Controller',
    stores: ['ContactActeurs'],
    views: ['contactacteur.Edit', 'contactacteur.PickContact', 'contactacteur.Add', 'contactacteur.EditForm'],

    init: function() {
        this.control({
            'contactActeurAdd button[action=add-contact-next]': {
                click: this.contactActeurNext
            },
            'contactActeurAdd button[action=add-contact-prev]': {
                click: this.contactActeurPrev
            },
            'contactacteurEditForm button[action=save]': {
                click: this.saveForm
            },
            'contactacteurEdit button[action=save]': {
                click: this.saveForm
            }
        });
    },
		saveForm: function(button){
			var win = button.up('panel');
      form = win.down('form');
      record = form.getRecord();
      values = form.getValues();
      record.set(values);
      record.save();
		},
    contactActeurNext: function(button) {
        panel = button.up("panel");
        current_panel = panel.layout.activeItem;
        current_index = panel.items.indexOf(current_panel);

        switch (current_index) {
        case 0:
            formValues = current_panel.getValues();
            panel.new_record = Ext.ModelManager.create({},
            'TP.model.ContactActeur');
            if (typeof(formValues.contact_id) != 'undefined' && formValues.add_contact != 1) {
                panel.new_record.set('contact_id', formValues.contact_id);
                panel.contact = Ext.getStore('TP.store.Contacts').findRecord('id', formValues.contact_id);
                panel.items.items[1].loadRecord(panel.contact);
            } else {
                panel.contact = undefined;
            }
            var layout = button.up("panel").getLayout();
            layout.next();
            Ext.getCmp('contactActeurAdd-move-prev').setDisabled(!layout.getPrev());
            Ext.getCmp('contactActeurAdd-move-next').setDisabled(!layout.getNext());
            break;
        case 1:
            if (current_panel.form.isValid()) {
                formValues = current_panel.getValues();
                if (typeof(panel.contact) != 'undefined') {
                    record = panel.contact;
                    record.set(formValues);
                } else {
                    panel.contact = Ext.ModelManager.create(formValues, 'TP.model.Contact');
                    Ext.getStore('TP.store.Contacts').insert(0, panel.contact);
                    var timer = setInterval(function() {
                        contact = Ext.getStore('TP.store.Contacts').getAt(0);
                        if (!contact.phantom) {
                            panel.contact = contact;
                            panel.new_record.set('contact_id', panel.contact.data.id);
                            clearInterval(timer);
                        }
                    },
                    200);
                }
                Ext.getStore('TP.store.Contacts').sync();
                layout = button.up("panel").getLayout();
                layout.next();
                Ext.getCmp('contactActeurAdd-move-prev').setDisabled(!layout.getPrev());
                Ext.getCmp('contactActeurAdd-move-next').setDisabled(!layout.getNext());
            }
            break;
        case 2:
            formValues = current_panel.getValues();

            if (typeof(formValues.acteur_id) != 'undefined' && formValues.acteur_id !== '') {
                panel.acteur = Ext.getStore('TP.store.Acteurs').findRecord('id', formValues.acteur_id);
                panel.new_record.set('acteur_id', formValues.acteur_id);
                layout = button.up("panel").getLayout();
                layout.next();
                Ext.getCmp('contactActeurAdd-move-prev').setDisabled(!layout.getPrev());
                Ext.getCmp('contactActeurAdd-move-next').setText('Terminer');
            } else if (formValues.new_partie !== '') {
                if (typeof(panel.acteur) == 'undefined') {
                    new_acteur = Ext.ModelManager.create({
                        type_acteur_id: 2,
                        description: formValues.new_partie,
                        dossier_id: Ext.getStore('TP.store.ContactActeurs').proxy.extraParams.dossier

                    },
                    'TP.model.Acteur');
                    Ext.getStore('TP.store.Acteurs').insert(0, new_acteur);
                    Ext.getStore('TP.store.Acteurs').sync();
                    var timer_acteur = setInterval(function() {
                        acteur = Ext.getStore('TP.store.Acteurs').getAt(0);
                        if (!acteur.phantom) {
                            panel.new_record.set('acteur_id', acteur.data.id);
                            panel.acteur = acteur;
                            clearInterval(timer_acteur);
                        }
                    },
                    200);
                }

                layout = button.up("panel").getLayout();
                layout.next();
                Ext.getCmp('contactActeurAdd-move-prev').setDisabled(!layout.getPrev());
                Ext.getCmp('contactActeurAdd-move-next').setText('Terminer');

            } else {
                Ext.Msg.alert('Nouveau contact', 'Veuillez sélectionner un role ou créer une nouvelle partie');
            }
            break;
        case 3:
            if (current_panel.form.isValid()) {
                formValues = current_panel.getValues();
                panel.new_record.set(formValues);
                Ext.getStore('TP.store.ContactActeurs').insert(0, panel.new_record);
                Ext.getStore('TP.store.ContactActeurs').sync();
                button.up("window").close();
            }

            break;
        }
    },
    contactActeurPrev: function(button) {
        panel = button.up("panel");
        current_index = panel.items.indexOf(panel.layout.activeItem);
        console.log(current_index);
        /*
			switch(n)
			{
			case 1:
			  execute code block 1
			case 2:
			  execute code block 2
			}*/
        var layout = button.up("panel").getLayout();
        layout.prev();
        Ext.getCmp('contactActeurAdd-move-prev').setDisabled(!layout.getPrev());
        Ext.getCmp('contactActeurAdd-move-next').setDisabled(!layout.getNext());
    }
});