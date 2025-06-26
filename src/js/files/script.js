import { isMobile,_slideUp,_slideDown } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";


 const menuBody = document.querySelector('.menu__body');
 if (menuBody) {
   _slideUp(menuBody, 0);
 
 }