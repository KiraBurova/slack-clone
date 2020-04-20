import { FormComponentProps as AntFormProps } from 'antd/lib/form/Form';

export interface FormComponentProps extends AntFormProps {
  registration: boolean;
}
