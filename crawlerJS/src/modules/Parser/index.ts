import { parse } from 'node-html-parser';

export interface IParseResult {
  title: string;
  description: string;
  h1: string;
  h2: string;
  content: string;
  links: string[];
}

// const removeImageLinks = (links: string[])=> links.filter()

const parser = (raw: string): IParseResult => {
  const root = parse(raw);

  const links = root
    .querySelectorAll('a[href]')
    .map(link => link.attributes.href)
    .filter(link => link.startsWith('http'))
    .filter(
      link =>
        !(
          link.endsWith('.pdf') ||
          link.endsWith('.jpg') ||
          link.endsWith('.png')
        ),
    );

  const h1Result = root.querySelectorAll('h1').map(h1 => h1.text);
  const h2Result = root.querySelectorAll('h2').map(h2 => h2.text);

  const content = root
    .querySelectorAll('p, h2, h3, h4 , h5, h6, li')
    .map(item => item.textContent.trim().replace(/\s\s+\t+/g, ' '))
    .filter(item => item !== '' && item !== undefined);

  const result = {
    title: root.querySelector('title')?.text,
    description: root.querySelector('meta[name="description"]')?.attributes
      ?.content,
    h1: h1Result.join(' | '),
    h2: h2Result.join(' | '),
    content: content.join(' | ').substring(0, 20000),
    links,
  };
  return result;
};

export { parser };
