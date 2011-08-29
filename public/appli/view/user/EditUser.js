Ext.define('TP.view.user.EditUser', {
    extend: 'Ext.window.Window',
    alias: 'widget.userEditUser',
    title: "Détails de  l'utilisateur",
    width: 900,
    height: 400,
    autoShow: true,
    bodyStyle: 'padding:15px',
    defaults: {
        // applied to each contained panel
        border: false
    },
    initComponent: function() {
        this.items = [{
            xtype: 'userUserForm'
        }];
        this.buttons = [{
            text: 'Annuler',
            action: 'cancel',
						handler: function(button) {
				        win = button.up('window');
				        win.close();
				    }

        },{
            text: 'Enregistrer',
            action: 'save',
						handler: function(button) {
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
				            Ext.getStore('TP.store.Users').sync();
				            win.close();
				        }
				    }

        },
        {
            text: 'Supprimer',
            action: 'delete',
						handler: function(button) {
				        win = button.up('window');
				        form = win.down('form');
				        record = form.getRecord();

				        Ext.Msg.show({
				            title: 'Supprimer cet enregistrement',
				            msg: 'Voulez-vous supprimer cet utilisateur ?',
				            buttons: Ext.Msg.YESNO,
				            fn: function(id) {
				                if (id == "yes") {
				                    Ext.getStore('TP.store.Users').remove(record);
														Ext.getStore('TP.store.Users').sync();
				                    win.close();
				                }
				            },
				            icon: Ext.Msg.QUESTION
				        });

				    }
        }];
        this.callParent(arguments);
    }

});