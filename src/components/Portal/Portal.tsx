import { createPortal } from 'react-dom';

interface Prop {
   children: JSX.Element | string;
}

const Portal = ({ children }: Prop) => {
   return createPortal(children, document.body);
};

export default Portal;
