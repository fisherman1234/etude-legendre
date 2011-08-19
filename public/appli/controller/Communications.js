Ext.define('TP.controller.Communications', {
    extend: 'Ext.app.Controller',
    stores: ['Communications'],
    models: ['Communication'],
		views: ['communication.CallForm'],
    init: function() {
       
    },

    add: function(button) {
        console.log('add');
				console.log(button);
    }

});