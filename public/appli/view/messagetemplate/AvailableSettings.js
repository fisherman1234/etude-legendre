Ext.define('TP.view.messagetemplate.AvailableSettings', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.messagetemplateAvailableSettings',

    title: 'Liste des champs disponibles',
    store: 'TP.store.MessageTemplateFields',

    initComponent: function() {

        this.columns = [{
            header: 'Champ',
            dataIndex: 'field',
            flex: 1
        },
        {
            header: 'Description',
            dataIndex: 'description',
            flex: 1
        }];

        this.callParent(arguments);
    }
});