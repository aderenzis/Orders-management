import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
	//console.log(Meteor.settings.maxi);//Variable de configuracion


	if (Meteor.users.findOne("mvT3fSksam8N7T4BQ"))
            Roles.addUsersToRoles("mvT3fSksam8N7T4BQ", ['admin']);

    /*    
    // create a couple of roles if they don't already exist (THESE ARE NOT NEEDED -- just for the demo)
    if(!Meteor.roles.findOne({name: "secret"}))
        Roles.createRole("secret");

    if(!Meteor.roles.findOne({name: "double-secret"}))
        Roles.createRole("double-secret");

    */    
});
