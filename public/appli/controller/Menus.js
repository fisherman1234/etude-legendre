Ext.define('TP.controller.Menus', {
    extend: 'Ext.app.Controller',
    views: ['menu.TypeActivites', 'menu.Main', 'menu.Settings', 'menu.SettingsList', 'menu.Categories', 'menu.Items', 'menu.QualiteProcedurales', 'menu.TauxTvas', 'menu.Unites', 'menu.TypeDecisions', 'menu.TypeEtatDossiers', 'menu.TypeExpertises', 'menu.TypeInstitutions', 'menu.TypeIntervenants', 'TP.view.user.UserList', 'TP.view.user.UserForm', 'TP.view.user.NewUserForm','TP.view.user.EditUser', 'TP.view.user.NewUser','TP.view.messagetemplate.Edit', 'menu.TypeCivilitesCorrespondances', 'menu.TypeDocuments', 'menu.Civilites'],
		stores: ['TP.store.TypeActivites','TP.store.Settings', 'TP.store.Categories', 'TP.store.TauxTvas', 'TP.store.Unites', 'TP.store.QualiteProcedurales', 'TP.store.TypeDecisions', 'TP.store.TypeEtatDossiers', 'TP.store.TypeExpertises', 'TP.store.TypeInstitutions','TP.store.TypeIntervenants', 'TP.store.Users', 'TP.store.ParametresCabinets'],

    init: function() {
			this.control({
          'mainMenu button[action=home]': {
              click: this.homeButton
          }, 
					'settingsList': {
              itemclick: this.openSetting
          }, 
					'menuSettings button[action=close]': {
						click: this.close
					},
					'userUserList': {
              itemdblclick: this.editUser
          }



      });
    },
		editUser: function(store, record) {
        win = Ext.widget('userEditUser');
        win.down('form').loadRecord(record);
    },
		homeButton: function(){
			var main_window = Ext.getCmp('centerArea');
			main_window.layout.setActiveItem(0);
		}, 
		close: function(button){
			win = button.up('window');
			win.close();
			Ext.getStore('TP.store.Categories').sync();
			Ext.getStore('TP.store.Items').sync();
			Ext.getStore('TP.store.QualiteProcedurales').sync();
			Ext.getStore('TP.store.TauxTvas').sync();
			Ext.getStore('TP.store.Unites').sync();
			Ext.getStore('TP.store.TypeDecisions').sync();
			Ext.getStore('TP.store.TypeEtatDossiers').sync();	
			Ext.getStore('TP.store.TypeExpertises').sync();
			Ext.getStore('TP.store.TypeInstitutions').sync();
			Ext.getStore('TP.store.TypeIntervenants').sync();
			Ext.getStore('TP.store.TypeActivites').sync();
			Ext.getStore('TP.store.TypeCivilitesCorrespondances').sync();
			Ext.getStore('TP.store.TypeDocuments').sync();
			Ext.getStore('TP.store.Civilites').sync();
			
			
		}, 
		openSetting: function(grid, record){
			win = grid.up('window');
			win.items.items[1].layout.setActiveItem(record.data.card_id);
		}

});