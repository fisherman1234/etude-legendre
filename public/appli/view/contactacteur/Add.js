Ext.define('TP.view.contactacteur.Add', {
    extend: 'Ext.window.Window',
    alias: 'widget.contactActeurAdd',
    id: 'contactActeurAdd',
    title: "Role dans le dossier",
    width: 800,
    height: 400,
    layout: 'card',
    activeItem: 0,
    autoShow: true,
    bodyStyle: 'padding:15px',
    defaults: {
        // applied to each contained panel
        border: false
    },
    // make sure the active item is set on the container config!    id: "contactacteurEdit",
    bbar: [{
        id: 'move-prev',
        text: 'Back',
        handler: function(btn) {
            var layout = btn.up("panel").getLayout();
            layout["prev"]();
            Ext.getCmp('move-prev').setDisabled(!layout.getPrev());
            Ext.getCmp('move-next').setDisabled(!layout.getNext());
        },
        disabled: true
    },
    '->', // greedy spacer so that the buttons are aligned to each side
    {
        id: 'contactActeurAdd-move-next',
        text: 'Suivant',
				handler: function(btn) {
            var layout = btn.up("panel").getLayout();
            layout["next"]();
            Ext.getCmp('move-prev').setDisabled(!layout.getPrev());
            Ext.getCmp('move-next').setDisabled(!layout.getNext());
        }

    }],
    items: [{
        xtype: 'PickContact'
    },
    {
        xtype: 'contactEditForm'
    },
    {
        xtype: 'pickActeurForm'
    },
    {
        xtype: 'contactacteurEditForm'
    }]

});