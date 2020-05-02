import { ApolloError } from 'apollo-boost';

export interface FormComponentProp {
  form: any;
  registration: boolean;
  handleAction: (event: React.FormEvent<HTMLFormElement>) => void;
  validationError: string;
  actionError: ApolloError | undefined;
  loading: boolean;
}
