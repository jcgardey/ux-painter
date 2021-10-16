import VersionList from '../components/Version/VersionList';
import Version from '../components/Version/Version';
import {
  EDIT_VERSION,
  REFACTORING_CATALOGUE,
  VERSION,
  VERSION_LIST,
} from './types';
import EditVersion from '../components/Version/EditVersion';
import RefactoringCatalogue from '../components/Refactoring/RefactoringCatalogue';

export default [
  {
    name: VERSION_LIST,
    Component: VersionList,
  },
  {
    name: VERSION,
    Component: Version,
  },
  {
    name: EDIT_VERSION,
    Component: EditVersion,
  },
  {
    name: REFACTORING_CATALOGUE,
    Component: RefactoringCatalogue,
  },
];
