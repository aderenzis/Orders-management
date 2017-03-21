
Pedidos = new Mongo.Collection('pedidos');

Pedidos.allow({
	insert : function(userId,doc){
		return !!userId; // Esto significa que user id existe
	},
	update: function(userId,doc){
		return !!userId;
	}
});


TareaSchema = new SimpleSchema({
	id:{
		type: String,
		 autoValue: function() {
        	return Meteor.uuid();
        },
        autoform: {
			type:"hidden"
		}
	},
	titulo:{
		type: String,
		label:'Titulo de la Tarea'
	},
	desc: {
		type: String,
		label: 'Descripcion',
		autoform: {	
    		afFieldInput: {
      		 type: "textarea",
     		 rows: 3,
     		// class: "foo"
    	  	}
  		}
	},
	isFinalizada:{
		type: Boolean, //Autoform con type boolean no funciona ok. por eso opcional es true
		
		//defaultValue: false,
		optional:true,
		autoform: {
			type:"hidden"
		}
	},
	finalizadaPor:{
		type: String,
		optional:true,
		regEx: SimpleSchema.RegEx.Id,
		autoform: {
			type:"hidden"
		}
	},
	finalizadaPorName:{
		type: String,
		optional:true,
		autoform: {
			type:"hidden"
		}
	}
});

PedidoSchema = new SimpleSchema({
	titulo:{
		type: String,
		label: "Titulo",
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
	sectorId: {
	  type: String,
	  label: "Sector Asignado",
	  regEx: SimpleSchema.RegEx.Id,

	  autoform: {
      options: function() {
        return Sectores.find().map(function(obj) {
          return { label: obj.name, value: obj._id };
        });
      }
    }

	},
	tareas:{
		type: [TareaSchema],
		
	},

	isFinalizado:{
		type: Boolean,
		defaultValue: false,
		optional:true,
		autoform: {
			type:"hidden"
		}
	},
	author: {
		type: String,
		label: "Author",
		autoValue: function(){
			return this.userId
		},
		autoform: {
			type: "hidden"
		}
	},
	createdAt: {
		type: Date,
		label: "Created at",
		autoValue: function(){
			return new Date()
		},
		autoform: {
			type: "hidden"
		}
	},

});




Meteor.methods({
	finalizarPedido: function(id, currentState){
		Pedidos.find({ "_id": id })
			  .forEach(function (doc) {
			    doc.tareas.forEach(function (tarea) {
			     // if (tarea.isFinalizada === currentState) { //Lo comento por si es undefined
			        var userProfile = Meteor.user().profile;
			        if(currentState){
			        	tarea.finalizadaPor="";
			        	tarea.finalizadaPorName="";
			        }
			        else{
			        	if(!tarea.isFinalizada){
			        		tarea.finalizadaPor=this.userId;
			        		tarea.finalizadaPorName=userProfile.nombre+" "+userProfile.apellido;
			        	}
			        }
			    	tarea.isFinalizada=!currentState;
			     // }
			    });
			    Pedidos.update({"_id":id},
			    	{"$set":
			    		{'tareas':doc.tareas}
			    	});
			  });

			

		Pedidos.update(id,{
			$set:{
				isFinalizado: !currentState
			}
		});
	},
	deletePedido:function(id){
		Pedidos.remove(id);
	},
	finalizarTarea:function(idTarea, idPedido,currentState){

		if(currentState){
			Pedidos.update(
	    	{ "_id": idPedido, "tareas.id": idTarea },
	   		 {
		        "$set": {
		            'tareas.$.isFinalizada': !currentState,
		            'tareas.$.finalizadaPor':"",
		            'tareas.$.finalizadaPorName':"",
		        }
	    	}
			);
		}
		else{
			var userProfile = Meteor.user().profile;
			console.log("userProfile: ");
			console.log(userProfile);
			Pedidos.update(
	    	{ "_id": idPedido, "tareas.id": idTarea },
	   		 {
		        "$set": {
		            'tareas.$.isFinalizada': !currentState,
		            'tareas.$.finalizadaPor':this.userId,
		            'tareas.$.finalizadaPorName':userProfile.nombre+" "+userProfile.apellido,
		        }
	    	}
			);
		}

		
		var pedido = Pedidos.findOne({_id:idPedido});
		finalizado = true;

		for (var i = pedido.tareas.length - 1; i >= 0; i--) {
			if (!pedido.tareas[i].isFinalizada){
				finalizado=false;
			}
		}

		if(finalizado != pedido.isFinalizado){
			Pedidos.update(
			{ "_id": idPedido},
		   		 {
			        "$set": {
			            'isFinalizado':finalizado
			        }
		    	}
			);
		}
		
		
		
	},
	getSectorPedido: function(idPedido){
		var sector= Pedidos.findOne({_id:idPedido}).sectorId;
		return sector;
	}
});


Pedidos.helpers({
  sector() {
    return Sectores.findOne(this.sectorId);
  }
});

Pedidos.attachSchema( PedidoSchema);