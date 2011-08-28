Ext.define('TP.view.communication.CourrierForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.communicationCourrierForm',
    layout: 'anchor',

    frame: true,
    border: false,
		initComponent: function() {
		      this.items= [{
			        xtype: 'textfield',
			        fieldLabel: "Objet du courrier",
			        anchor: '96%',
			        name: 'subject_id',
			        allowBlank: false

			    },
			    {
			        xtype: 'textarea',
			        fieldLabel: "Corps du mail",
			        anchor: '96%',
			        name: 'description'

			    },
					{
			        xtype: 'textarea',
			        fieldLabel: "Corps de la lettre",
			        anchor: '96%',
			        name: 'letter_body'

			    }];

		      this.callParent(arguments);
		  }
    
});