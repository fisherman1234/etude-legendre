Ext.define('TP.view.contactacteur.Add', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.contactActeurAdd',
    id: 'contactActeurAdd',
    title: "Role dans le dossier",
    width: 300,
    height: 200,
    layout: 'card',
    activeItem: 0,
    // make sure the active item is set on the container config!    id: "contactacteurEdit",
    bbar: [{
        id: 'contactActeurAdd-move-prev',
        text: 'Précédent',
        disabled: true
    },
    '->', // greedy spacer so that the buttons are aligned to each side
    {
        id: 'contactActeurAdd-move-next',
        text: 'Suivant'

    }],
    initComponent: function() {
        this.items = [{
            xtype: 'form',
            items: [{}]
        }];

        this.callParent(arguments);
    }
});