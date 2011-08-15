Ext.define('TP.store.TreeActeurs', {
    extend: 'Ext.data.TreeStore',
    autoLoad: false,
		clearOnLoad: true,
		fields: ['text', 'id', 'qualite_procedurale', 'institution', 'telephone', 'email'],
    proxy: {
      type: 'ajax',
      url: 'getactortree.json'
    }
});