Ext.define('TP.controller.Institutions', {
    extend: 'Ext.app.Controller',
    stores: ['Institutions'],
    models: ['Institution'],
    views: ['institution.List', 'institution.EditForm', 'institution.Edit', 'institution.FindInstitution'],

    init: function() {
        this.control({
            'institutionlist': {
                itemdblclick: this.editInstitution
            },
            'institutionEdit button[action=save]': {
                click: this.updateInstitution
            },
            'institutionEdit button[action=cancel]': {
                click: this.cancel
            },
            'institutionEdit button[action=delete]': {
                click: this.deleteInst
            },
            'institutionFindInstitution button[action=close]': {
                click: this.close
            }
        });
    },
    close: function(button) {
        win = button.up('window');
        win.close();
    },
    deleteInst: function(button) {
        win = button.up('window');
        contactForm = win.down('form');
        record = contactForm.getRecord();
        Ext.Msg.show({
            title: 'Supprimer cet enregistrement',
            msg: 'Voulez-vous supprimer cet enregistrement ?',
            buttons: Ext.Msg.YESNO,
            fn: function(id) {
                if (id == "yes") {
                    if (typeof record != "undefined") {
                        Ext.getStore('TP.store.Institutions').remove(record);
                        Ext.getStore('TP.store.Institution').sync();
                    }
                    win.close();

                }
            },
            icon: Ext.Msg.QUESTION
        });
        win.close();
    },
    editInstitution: function(grid, record) {
        var view = Ext.widget('institutionEdit');
        view.down('form').loadRecord(record);
    },
    cancel: function(button) {
        win = button.up('window');
        win.close();
    },
    updateInstitution: function(button) {
        var win = button.up('panel');
        form = win.down('form');
        if (form.form.isValid()) {
            record = form.getRecord();
            values = form.getValues();
            if (typeof(record) != 'undefined') { // this records exits, let's save it
                record.set(values);
            } else { //let's go for create & save !
                institution = Ext.ModelManager.create(values, 'TP.model.Institution');
                Ext.getStore('TP.store.Institutions').insert(0, institution);
            }
            Ext.getStore('TP.store.Institutions').sync();
            win.close();
        }

    }
});