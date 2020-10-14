
import './dialogues.css';

import Tab from '../../../components/tab/Tab.js';
import ModulableAreas from '../../../components/modulableAreas/ModulableAreas.js';

import commandManager from '../../../commandManager.js';

// DATA
// all the info needed by the module creator to create the code

const MODULE_NAME = 'dialogues';

const moduleData = {
	dialogues: []
};

// USER INTERFACE

const tab = Tab();
tab.id = 'dialogues-tab';

tab.setName( 'Dialogues' );

	// MODULABLE AREAS

	const modulableAreas = ModulableAreas( 'x', [ 30, 20, 30, 20 ] );

	tab.getContent().append( modulableAreas.container );

/*
// command firing test
tab.addEventListener( 'click', () => {

	commandManager.addCommand( MODULE_NAME, 'test', {foo: 'bar'} )

})
*/

// COMMAND LISTENER AND PARSER

commandManager.eventDispatcher.addEventListener( MODULE_NAME, (e)=> {

	switch ( e.detail.cmdName ) {

	case 'test':
		console.log( e.detail );
		break;

	}

});

//

export default tab