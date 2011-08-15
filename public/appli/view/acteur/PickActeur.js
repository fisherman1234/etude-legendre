Ext.define('TP.view.acteur.PickActeur', {
    extend: 'Ext.form.Panel',
    alias: 'widget.pickActeurForm',
    layout: 'anchor',
    id: "pickActeurForm",
    frame: true,
    initComponent: function() {
        var store = Ext.getStore('TP.store.Acteurs');
        store.load();
        var itemsInGroup = [];
        store.each(function(record) {
            itemsInGroup.push({
                boxLabel: record.data.description,
                inputValue: record.data.id,
                value: record.data.id,
                name: "acteur_id"
            });
        });

        this.items = [{
            xtype: 'displayfield',
            value: 'Comment intervient ce contact dans le dossier ?'
        },
        {
            xtype: 'fieldcontainer',
            fieldLabel: 'Intervenant',
            defaultType: 'radiofield',
            items: itemsInGroup
        },
        {
            xtype: 'textfield',
            name: 'new_partie',
            fieldLabel: 'Ou créer une nouvelle partie',
            anchor: '100%'

        }];

        this.callParent(arguments);
    }
});