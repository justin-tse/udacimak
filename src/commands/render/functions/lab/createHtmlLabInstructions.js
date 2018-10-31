import Handlebars from 'handlebars';
import cheerio from 'cheerio';
import {
  loadTemplate
} from '../../functions/templates';
import {
  downloadImage,
  markdownToHtml
} from '../../../utils';


/**
 * Create HTML for Lab Instructions
 * @param {object} details instruction JSON data
 * @param {string} targetDir target directory
 */
export default function createHtmlLabInstructions(details, targetDir) {
  if (!details) {
    return;
  }

  let { text } = details;
  text = markdownToHtml(text);
  // TODO: find all media links and download them

  return loadTemplate('lab.instructions')
    .then(html => {
      const dataTemplate = {
        text
      };

      const template = Handlebars.compile(html);
      const htmlResult = template(dataTemplate);

      return htmlResult;
    });
}