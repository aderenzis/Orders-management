Sectores = new Mongo.Collection('sectores');


Sectores.allow({
	insert : function(userId,doc){
		return !!userId; // Esto significa que user id existe
	},
	update: function(userId,doc){
		return !!userId;
	}
});
SectorSchema = new SimpleSchema({
	name:{
		type: String,
		label: "Nombre",
	},
	desc: {
		type: String,
		label: "Descripcion",
		autoform: {	
    		afFieldInput: {
      		 type: "textarea",
     		 rows: 5,
     		// class: "foo"
    	  	}
  		}

	},
});

Sectores.attachSchema( SectorSchema);


Meteor.methods({
	deleteSector:function(id){
			Sectores.remove(id);
	},
})

