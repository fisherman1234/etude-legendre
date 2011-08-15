Ext.define('TP.view.contactacteur.Add', {
    extend: 'Ext.window.Window',
    alias: 'widget.contactActeurAdd',
    id: 'contactActeurAdd',
    title: "Role dans le dossier",
    width: 900,
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
        id: 'contactActeurAdd-move-prev',
        text: 'Précédent',
        action: 'add-contact-prev',
        disabled: true
    },
    '->', // greedy spacer so that the buttons are aligned to each side
    {
        id: 'contactActeurAdd-move-next',
        text: 'Suivant',
        action: 'add-contact-next'

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