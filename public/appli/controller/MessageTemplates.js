Ext.define('TP.controller.MessageTemplates', {
    extend: 'Ext.app.Controller',
    stores: ['TP.store.MessageTemplates', 'TP.store.MessageTemplateFields'],
    models: ['TP.model.MessageTemplate'],
    views: ['messagetemplate.AvailableSettings', 'messagetemplate.Edit', 'messagetemplate.EditForm'],

    init: function() {
        this.control({
            'messageTemplateEdit button[action=save]': {
                click: this.save
            }
        });
    },
    save: function(button){
      win = button.up("window");
      contactForm = win.down('form');
			if (contactForm.form.isValid()){
			  record = contactForm.getRecord();
        values = contactForm.getValues();
				if (typeof record == "undefined"){
					record = Ext.ModelManager.create({},
	        'TP.model.MessageTemplate');
					Ext.getStore('TP.store.MessageTemplates').insert(0, record);
				}
        record.set(values);
        Ext.getStore('TP.store.MessageTemplates').sync();
        /*while (record.phantom === true) {
         console.log('phantom');
        }*/
			}
      
    }

   
});