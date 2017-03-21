Template.UserData.helpers({
	'user_name':function(){
		if(Meteor.user()){
			return  Meteor.user().profile.nombre +" "+ Meteor.user().profile.apellido;
		}
		else{
			return "Ingresar";
		}
	},
	'email': function(){
		if(Meteor.user()){
			
			return  Meteor.user().emails[0].address;
		}
		else{
			return "";
		}
	}
});