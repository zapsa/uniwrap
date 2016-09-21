import Uniwrap from './uniwrap';

let instance = null;

const root = `${process.cwd()}.uniwraprc`
console.log('Root:', root);
console.log(__dirname);
const wrp = new Uniwrap(root);

export default wrp;
