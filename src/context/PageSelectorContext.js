import { createContext, useContext } from 'react';
import PageSelector from '../components/Selection/PageSelector';

const PageSelectorContext = createContext(new PageSelector());
export const usePageSelector = () => useContext(PageSelectorContext);
