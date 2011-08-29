Ext.define('TP.view.user.UserList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.userUserList',

    title: 'Fonctions types',
    store: 'TP.store.Users',

    initComponent: function() {

        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                xtype: 'button',
                text: 'Ajouter',
                icon: '/images/add.png',
                handler: function() {
                    // empty record
                    Ext.widget('userNewUser');
                }
            }],
            layout: 'hbox' // The items are arranged horizontally
        }];
        this.columns = [{
            header: 'Nom',
            dataIndex: 'nom',
            flex: 1
        },
        {
            header: 'Prénom',
            dataIndex: 'prenom',
            flex: 1
        },
        {
            header: 'Email',
            dataIndex: 'email',
            flex: 1
        }];

        this.callParent(arguments);
    }
});