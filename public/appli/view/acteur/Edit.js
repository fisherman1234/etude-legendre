Ext.define('TP.view.acteur.Edit', {
    extend:'Ext.panel.Panel',
    alias:'widget.acteurEdit',
    title:"Edition d'un acteur",
    layout:'fit',
    border:false,
    padding:10,
    id:"acteurEdit",
    initComponent:function () {
        this.items = [
            {
                xtype:'form',
                border:false,

                items:[
                    {
                        xtype:'textfield',
                        fieldLabel:'Type acteur',
                        name:'type_acteur_id'
                    },
                    {
                        xtype:'textfield',
                        fieldLabel:'Description',
                        name:'description'
                    }
                ]
            }
        ];
        this.buttons = [
            {
                text:'Enregistrer',
                action:'save'
            },
            {
                text:'Annuler',
                scope:this,
                handler:this.close
            }
        ];

        this.callParent(arguments);
    }
});