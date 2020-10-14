
const commands = [];

const eventDispatcher = document.createElement('DIV');

//

function addCommand( moduleName, cmdName, params ) {

	commands.push( { moduleName, cmdName, params } );

	dispatchCommand( commands.length - 1 );

}

//

// create and dispatch an event containing the command data
	
function dispatchCommand( id ) {

	const event = new CustomEvent( commands[ id ].moduleName, {
		detail: commands[ id ]
	});

	eventDispatcher.dispatchEvent(event);

}

//

export default {
	addCommand,
	eventDispatcher
}
