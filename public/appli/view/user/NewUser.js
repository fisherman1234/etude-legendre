Ext.define('TP.view.user.NewUser', {
    extend: 'Ext.window.Window',
    alias: 'widget.userNewUser',
    title: "Ajout d'un utilisateur au cabinet",
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
            xtype: 'userNewUserForm'
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
										record = Ext.ModelManager.create({},
		                'TP.model.User');
				            record.set(values);
				            Ext.getStore('TP.store.Users').insert(0, record);
										Ext.getStore('TP.store.Users').sync();
				            win.close();
				        }
				    }

        }];
        this.callParent(arguments);
    }

});