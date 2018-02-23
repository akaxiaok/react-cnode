import { browserHistory, hashHistory } from 'react-router';

const history = process.env.NODE_ENV !== 'production' ? browserHistory : hashHistory;
export default history;