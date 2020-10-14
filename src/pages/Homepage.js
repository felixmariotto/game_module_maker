
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

// TABS CONTAINER

const tabsContainer = document.createElement('DIV');
tabsContainer.id = "tabs-container";

container.append( tabsContainer );

//

tabsContainer.append( Dialogues, DialogueUI );