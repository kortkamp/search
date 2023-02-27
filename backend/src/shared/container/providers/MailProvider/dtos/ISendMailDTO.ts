interface ITemplateVariables {
  [key: string]: string | number;
}

interface ISendMailDTO {
  to: string;
  from: string;
  subject: string;
  template: string;
  variables: ITemplateVariables;
}

export { ISendMailDTO };
