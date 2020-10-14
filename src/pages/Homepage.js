
import './homepage.css';
import './globalStyle.css';

import Dialogues from './tabs/dialogues/Dialogues.js';
import DialogueUI from './tabs/dialogueUI/DialogueUI.js';

// CONTAINER

const container = document.createElement('DIV');
container.id = "homepage-container";

document.body.append( container );

// NAVBAR

const navbar = document.createElement('DIV');
navbar.id = 'navbar';

container.append( navbar );

// TASKBAR

const taskbar = document.createElement('DIV');
taskbar.id = 'taskbar';

navbar.append( taskbar );

// TABS CONTAINER

const tabsContainer = document.createElement('DIV');
tabsContainer.id = "tabs-container";

navbar.append( tabsContainer );

//

tabsContainer.append( Dialogues, DialogueUI );

// add event listener to each tab, so than when clicked on,
// the tab get a high z-index and all the others get their
// normal z-index

[ Dialogues, DialogueUI ].forEach( (tab, idx, arr) => {

	tab.addEventListener( 'click', () => {

		arr.forEach( (tab) => {
			
			tab.style.zIndex = 'auto';

		})

		tab.style.zIndex = '100';

	})

})