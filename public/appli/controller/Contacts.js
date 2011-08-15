Ext.define('TP.controller.Contacts', {
    extend: 'Ext.app.Controller',
    stores: ['Contacts', 'TP.store.Civilites'],
    models: ['Contact'],
		views: ['contact.EditLight', 'contact.EditForm'],

    init: function() {
      this.control({
          'contactEditLight button[action=save]' : {
              click: this.saveActeur
          }
      });
    },
    saveActeur: function(button) {
			contactEditLight = Ext.getCmp("contactEditLight");
			contactEditLightForm = contactEditLight.down('form');
			record = contactEditLightForm.getRecord();
      values = contactEditLightForm.getValues();
      record.set(values);
    }

});