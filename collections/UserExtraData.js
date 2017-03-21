

UserExtraDatas = new Mongo.Collection('userExtraDatas');


UserExtraDatas.allow({
	insert : function(userId,doc){
		return !!userId; // Esto significa que user id existe
	},
	update: function(userId,doc){
		return !!userId;
	}
});

UserExtraDataSchema = new SimpleSchema({
	userId: {
		type: String,
		label: "Usuario",
		unique:true,
		custom: function(){
			if(Meteor.isClient && this.isSet){
				Meteor.call('uniqueSectorsUser', this.value, function(error,result){
					if(!result){
						UserExtraDatas.simpleSchema().namedContex("insertUserExtraDataForm").addInvalidKeys([{name:"userId", type:"notUnique"}]);
					}
				});
			}
		},

		autoform: {
   		options: function() {
   			       return Meteor.users.find({}).map(function(obj) {
		          return { label: (obj.profile.nombre + " "+ obj.profile.apellido), value: obj._id };
		        });
		    }
      	}
	},
	sectorIds: {
	  type: Array,
      minCount: 1,
      maxCount: 5,
	  label: "Sectores Asignado",
	  autoform: {
   		options: function() {
	        return Sectores.find().map(function(obj) {
	          return { label: obj.name, value: obj._id };
	        });
      	}
  	 }
    },
    "sectorIds.$": {
      type: String
   }
	

});

UserExtraDatas.helpers({
  user() {
    return Meteor.users.findOne(this.userId);
  }
});

UserExtraDatas.attachSchema(UserExtraDataSchema);


Meteor.methods({
	uniqueSectorsUser:function(userId){
		return UserExtraDatas.find({
        	userId: userId}).count() === 0;
    },
    deleteUserExtraData:function(id){
			UserExtraDatas.remove(id);
	}
});