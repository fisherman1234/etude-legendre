Ext.define('TP.view.user.NewUserForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.userNewUserForm',
    layout: 'anchor',
    frame: true,
    border: false,
    initComponent: function() {
        this.items = [{
            xtype: 'fieldcontainer',
            combineErrors: true,
            layout: 'hbox',
            padding: 5,
            defaults: {
                flex: 1,
                margin: '0 5 0 0'
            },
            items: [{
                xtype: 'combo',
                fieldLabel: "Civilité",
                anchor: '96%',
                name: 'civilite',
                store: 'TP.store.Civilites',
                displayField: 'description',
                valueField: 'id',
                hiddenName: 'civilite',
                queryMode: 'local',
                forceSelection: true,
                allowBlank: false

            },
            {
                xtype: 'textfield',
                fieldLabel: 'Prénom',
                anchor: '96%',
                name: 'prenom',
                allowBlank: false

            },
            {
                xtype: 'textfield',
                fieldLabel: 'Nom',
                anchor: '96%',
                name: 'nom',
                allowBlank: false

            }]
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Email',
            anchor: '96%',
            name: 'email',
            allowBlank: false

        },
        {
            xtype: 'textfield',
						inputType:'password',
            fieldLabel: 'Mot de passe',
            anchor: '96%',
            name: 'password',
            allowBlank: false

        }];
        this.callParent(arguments);
    }

});