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
  RENAME_ELEMENT,
  TURN_ATTRIBUTE_INTO_LINK,
  ADD_LINK,
  ADD_TOOLTIP,
  TURN_INPUT_INTO_RADIOS,
  TURN_INPUT_INTO_SELECT,
  RESIZE_INPUT,
  FORMAT_INPUT,
  DATE_INPUT_INTO_SELECTS,
  ADD_FORM_VALIDATION,
} from './types';
import EditVersion from '../components/Version/EditVersion';
import RefactoringCatalogue from '../components/Refactoring/RefactoringCatalogue';
import { SingleElementSelection } from '../components/Selection/SingleElementSelection';
import { AddAutocompleteSuggestedValues } from '../components/AddAutocomplete/AddAutocompleteSuggestedValues';
import RefactoringPreview from '../components/RefactoringPreview/RefactoringPreview';
import { RenameElement } from '../components/RenameElement/RenameElement';
import { TurnAttributeIntoLink } from '../components/TurnAttributeIntoLink/TurnAttributeIntoLink';
import { AddLink } from '../components/AddLink/AddLink';
import { AddTooltip } from '../components/AddTooltip/AddTooltip';
import { TurnInputIntoRadios } from '../components/TurnInputIntoRadios/TurnInputIntoRadios';
import { TurnInputIntoSelect } from '../components/TurnInputIntoSelect/TurnInputIntoSelect';
import { ResizeInput } from '../components/ResizeInput/ResizeInput';
import { FormatInput } from '../components/FormatInput/FormatInput';
import { DateInputIntoSelects } from '../components/DateInputIntoSelects/DateInputIntoSelects';
import { AddFormValidation } from '../components/AddFormValidation/AddFormValidation';

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
  {
    name: RENAME_ELEMENT,
    Component: RenameElement,
  },
  {
    name: TURN_ATTRIBUTE_INTO_LINK,
    Component: TurnAttributeIntoLink,
  },
  {
    name: ADD_LINK,
    Component: AddLink,
  },
  {
    name: ADD_TOOLTIP,
    Component: AddTooltip,
  },
  {
    name: TURN_INPUT_INTO_RADIOS,
    Component: TurnInputIntoRadios,
  },
  {
    name: TURN_INPUT_INTO_SELECT,
    Component: TurnInputIntoSelect,
  },
  {
    name: RESIZE_INPUT,
    Component: ResizeInput,
  },
  {
    name: FORMAT_INPUT,
    Component: FormatInput,
  },
  {
    name: DATE_INPUT_INTO_SELECTS,
    Component: DateInputIntoSelects,
  },
  {
    name: ADD_FORM_VALIDATION,
    Component: AddFormValidation,
  },
];
