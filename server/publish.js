Meteor.publish('pedidos', function(){
	if(Roles.userIsInRole(this.userId, ['admin'])) {
	    return Pedidos.find();
	}
  	else{

   		var userExtraData = UserExtraDatas.findOne({userId:this.userId});
   		var sectores = userExtraData.sectorIds;
  		return Pedidos.find({
  			sectorId:{$in:sectores}
  		});
	}
		
});



Meteor.publish('singlePedido', function(id){
	check(id,String);
	return Pedidos.find({_id:id});
});


Meteor.publish('sectores', function(){
	return Sectores.find({});
});


Meteor.publish('userExtraDatas', function(){
	if(Roles.userIsInRole(this.userId, ['admin'])) {
		return UserExtraDatas.find({});
	}
	else{
		return [];
	}
});


Meteor.publish('userList', function (){ 

	if(Roles.userIsInRole(this.userId, ['admin'])) {
	    return Meteor.users.find({});
	}
  	else
	  	return [];
  
});



