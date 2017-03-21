

Template.UserExtraDatas.onCreated(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('userExtraDatas');
		self.subscribe('sectores');
		self.subscribe('userList');//ojo con esto
	});
});

Template.UserExtraDatas.helpers({
	userExtraDatas: ()=>{
		return UserExtraDatas.find({});
	}
});

Template.UserExtraDatas.events({
	'click .new-recipe': () => {
		Session.set('newUserExtraData',true);
	}
});