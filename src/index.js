import Uniwrap from './uniwrap';

let instance = null;

const root = `${process.cwd()}/.uniwraprc`
console.log('Root:', root);
const wrp = new Uniwrap(root);

export default wrp;
