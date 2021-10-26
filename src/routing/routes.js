import VersionList from '../components/Version/VersionList';
import Version from '../components/Version/Version';
import {
  ADD_AUTOCOMPLETE_SUGGESTED_VALUES,
  EDIT_VERSION,
  REFACTORING_CATALOGUE,
  REFACTORING_PREVIEW,
  SINGLE_ELEMENT_SELECTION,
  VERSION,
  VERSION_LIST,
} from './types';
import EditVersion from '../components/Version/EditVersion';
import RefactoringCatalogue from '../components/Refactoring/RefactoringCatalogue';
import { SingleElementSelection } from '../components/Selection/SingleElementSelection';
import { AddAutocompleteSuggestedValues } from '../components/AddAutocomplete/AddAutocompleteSuggestedValues';
import RefactoringPreview from '../components/RefactoringPreview/RefactoringPreview';

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
  {
    name: SINGLE_ELEMENT_SELECTION,
    Component: SingleElementSelection,
  },
  {
    name: REFACTORING_PREVIEW,
    Component: RefactoringPreview,
  },
  {
    name: ADD_AUTOCOMPLETE_SUGGESTED_VALUES,
    Component: AddAutocompleteSuggestedValues,
  },
];
