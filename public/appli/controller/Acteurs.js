Ext.define('TP.controller.Acteurs', {
    extend: 'Ext.app.Controller',
    stores: ['TP.store.TreeActeurs'],
		views: ['acteur.Tree'],
    init: function() {
      this.control({
          'acteurTree' : {
              itemclick: this.loadRecord
          }
      });
    },
    loadRecord: function(grid, record) {
			if (typeof(record.data.leaf) != 'undefined'){
				contactacteur = Ext.getStore('TP.store.ContactActeurs').findRecord('id', record.data.id);
				contactacteurEdit = Ext.getCmp("contactacteurEdit");
				contactacteurEdit.down('form').loadRecord(contactacteur);
				
				
				contact = Ext.getStore('TP.store.Contacts').findRecord('id', contactacteur.data.contact_id);
				contactEditLight = Ext.getCmp("contactEditLight");
				contactEditLight.down('form').loadRecord(contact);
				
			}
    }

});