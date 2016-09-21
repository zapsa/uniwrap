import Uniwrap from './uniwrap';
import path from 'path';

const path = path.resolve(__dirname, '.uniwraprc');
console.log(path);
const wrp = new Uniwrap(path);

export default wrp;
