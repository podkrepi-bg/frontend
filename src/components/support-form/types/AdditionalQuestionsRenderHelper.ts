export interface TextFieldOptions {
  value: string;
  name: string;
  placeholder: string;
}

export interface DropdownOption {
  text: string;
  value: string;
}

export interface Option {
  type: string;
  value: any;
  name: string;
  label: string;
  textFieldOptions?: TextFieldOptions;
  dropdownOptions?: DropdownOption[];
}

export interface RoleRenderObject {
  key: string;
  title: string;
  errorMessage: string;
  formikErrors: any;
  options: Option[];
}

