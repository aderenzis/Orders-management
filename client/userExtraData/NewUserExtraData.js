Template.NewUserExtraData.events({
	'click .fa-close': function(){
		Session.set('newUserExtraData',false);
	}
});

Template.NewUserExtraData.onCreated(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('sectores');
	});
});
