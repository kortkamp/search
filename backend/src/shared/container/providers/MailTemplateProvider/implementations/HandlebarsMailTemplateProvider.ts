import fs from 'fs';
import handlebars from 'handlebars';
import path from 'path';

import IParseMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/dtos/IParseMailTemplateDTO';
import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';

class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
  public async parse({
    template,
    variables,
  }: IParseMailTemplateProvider): Promise<string> {
    const fileName = `${template}.hbs`;

    const templateFile = path.resolve(__dirname, '..', 'templates', fileName);

    const templateFileContent = await fs.promises.readFile(templateFile, {
      encoding: 'utf-8',
    });

    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}

export default HandlebarsMailTemplateProvider;
