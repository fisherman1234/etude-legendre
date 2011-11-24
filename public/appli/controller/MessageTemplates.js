Ext.define('TP.controller.MessageTemplates', {
    extend: 'Ext.app.Controller',
    stores: ['TP.store.MessageTemplates', 'TP.store.MessageTemplateFields'],
    models: ['TP.model.MessageTemplate'],
    views: ['messagetemplate.AvailableSettings', 'messagetemplate.Edit', 'messagetemplate.EditForm'],

    init: function() {
        this.control({
            'messageTemplateEdit button[action=save]': {
                click: this.save
            },
            'messagetemplateAvailableSettings': {
                itemdblclick: this.setValue
            }
        });
    },
    setValue: function(grid, record){
      win = grid.up('window');
      field = win.items.items[0].items.items[1].activeTab.items.items[0];
      field.insertAtCursor(record.data.field);      
    },
    save: function(button) {
        var win = button.up("window");
        contactForm = win.down('form');
        if (contactForm.form.isValid()) {
            record = contactForm.getRecord();
            values = contactForm.getValues();
            if (typeof record == "undefined") {
                record = Ext.ModelManager.create({},
                'TP.model.MessageTemplate');
                Ext.getStore('TP.store.MessageTemplates').insert(0, record);
            }
            record.set(values);
            Ext.getStore('TP.store.MessageTemplates').sync();
            if (record.phantom) {
                var timer2 = setInterval(function() {
                    var record = Ext.getStore('TP.store.MessageTemplates').getAt(0);
                    if (!record.phantom) {
                        clearInterval(timer2);
                        var rec = Ext.getStore('TP.store.TypeActivites').getAt(win.parentRowIndex);
                        rec.set('message_template_id', record.data.id);
                        rec.store.sync();
                        win.close();
                    }
                },
                200);
            } else {
                var rec = Ext.getStore('TP.store.TypeActivites').getAt(win.parentRowIndex);
                rec.set('message_template_id', record.data.id);
                rec.store.sync();
                win.close();
            }
        }
    }

});