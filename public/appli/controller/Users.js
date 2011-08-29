Ext.define('TP.controller.Users', {
    extend: 'Ext.app.Controller',
    stores: ['Users'],
    models: ['User'],
    views: ['user.UserList', 'user.EditUser', 'user.UserForm', 'user.NewUserForm', 'user.NewUser'],
    init: function() {
        this.control({
            'userUserList': {
                itemdblclick: this.editUser
            },
            'userNewUser button[action=cancel]': {
                click: this.cancel
            },
            'userNewUser button[action=save]': {
                click: this.save
            },
            'userEditUser button[action=save]': {
                click: this.save
            },
            'userEditUser button[action=cancel]': {
                click: this.cancel
            },
            'userEditUser button[action=delete]': {
                click: this.deleteUser
            }

        });
    },
    editUser: function(store, record) {
        win = Ext.wiget('userEditUser');
        win.down('form').loadRecord(record);
    },
    cancel: function(button) {
        win = button.up('window');
        win.close();
    },
    save: function(button) {
        win = button.up('window');
        form = win.down('form');
        record = form.getRecord();
        values = form.getValues();
        if (form.form.isValid()) {
            if (typeof record == 'undefined') {
                record = Ext.ModelManager.create({},
                'TP.model.User');
            }
            record.set(values);
            record.save();
            win.close();
        }
    },
    deleteUser: function(button) {
        win = button.up('window');
        form = win.downn('form');
        record = form.getRecord();

        Ext.Msg.show({
            title: 'Supprimer cet enregistrement',
            msg: 'Voulez-vous supprimer cet utilisateur ?',
            buttons: Ext.Msg.YESNO,
            fn: function(id) {
                if (id == "yes") {
                    Ext.getStore('TP.store.Users').remove(record);
                    win.close();
                }
            },
            icon: Ext.Msg.QUESTION
        });

    }

});