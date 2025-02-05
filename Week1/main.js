import {halfOf, multiply} from './lib.js';
//
console.log(halfOf(84));
console.log(multiply(21, 2));
// using export default
import doSomething from './doSomething.js';
doSomething();
// using export bindings
import { flag, touch } from './validator.js';
console.log(flag); 
touch();
console.log(flag); 


