Ext.define('TP.store.TreeActeurs', {
    extend: 'Ext.data.TreeStore',
    proxy: {
      type: 'ajax',
      url: 'getactortree.json'
    }
});