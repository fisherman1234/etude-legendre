Ext.define('TP.controller.Menus', {
    extend: 'Ext.app.Controller',
    views: ['menu.Main'],

    init: function() {
			this.control({
          'mainMenu button[action=home]': {
              click: this.homeButton
          },
					'mainMenu button[action=new_dosser]': {
              click: this.newDossier
          }

      });
    },
		homeButton: function(){
			console.log("home button");
		},
		newDossier: function(){
			console.log("new dosseir");
		}

});