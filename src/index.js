import Uniwrap from './uniwrap';
import path from 'path';

const root = path.resolve(__dirname, '.uniwraprc');
console.log(root);
const wrp = new Uniwrap(path);

export default wrp;
