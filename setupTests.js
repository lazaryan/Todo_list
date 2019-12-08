import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import react from 'react'

global.React = react

configure({ adapter: new Adapter() });