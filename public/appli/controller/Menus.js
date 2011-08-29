Ext.define('TP.controller.Menus', {
    extend: 'Ext.app.Controller',
    views: ['menu.Main'],

    init: function() {
			this.control({
          'mainMenu button[action=home]': {
              click: this.homeButton
          }

      });
    },
		homeButton: function(){
			var main_window = Ext.getCmp('centerArea');
			main_window.layout.setActiveItem(0);
		}

});