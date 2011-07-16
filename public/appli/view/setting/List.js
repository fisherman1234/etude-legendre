Ext.define('TP.view.setting.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.settingList',

	store: 'Settings',
    initComponent: function() {
        

        this.columns = [
            {header: 'Description',  dataIndex: 'description',  flex: 1}
            
            
        ];

        this.callParent(arguments);
    }
});