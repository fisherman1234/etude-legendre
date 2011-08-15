Ext.define('TP.controller.ContactActeurs', {
    extend: 'Ext.app.Controller',
    stores: ['ContactActeurs'],
		views: ['contactacteur.Edit', 'contactacteur.PickContact', 'contactacteur.Add', 'contactacteur.EditForm'],
		
    init: function() {
      this.control({
          'contactacteurEdit button[action=save]' : {
              click: this.saveContactActeur
          }
      });
    },
    saveContactActeur: function(button) {
			contactacteurEdit = Ext.getCmp("contactacteurEdit");
			contactacteurEditForm = contactacteurEdit.down('form');
			record = contactacteurEditForm.getRecord();
      values = contactacteurEditForm.getValues();
      record.set(values);
    }

});