import Handlebars from 'handlebars';
import {
  loadTemplate
} from '../../functions/templates';
import { markdownToHtml } from '../../../utils';


/**
 * Create HTML content for WorkspaceAtom
 * @param {object} atom atom json
 * @returns {string} HTML content
 */
export default function createHtmlWorkspaceAtom(atom) {
  const { configuration } = atom;
  let defaultPath = '';
  let openFiles = [];
  let userCode;
  let kind = 'Unknown';

  // attempt to get workspace information
  if (configuration && configuration.blueprint) {
    kind = configuration.blueprint.kind;
    const { conf } = configuration.blueprint;
    if (conf) {
      // Jupyter workspace usually has defaultPath
      if (conf.defaultPath)
        defaultPath = conf.defaultPath;
      // Coding workspace usually has openFiles
      if (conf.openFiles && conf.openFiles.length) {
        openFiles = conf.openFiles;
      }
      userCode = conf.userCode;
      userCode = markdownToHtml(userCode);
    } //.if conf
  } //.if configuration

  return loadTemplate('atom.workspace')
    .then(html => {
      const data = {
        defaultPath,
        kind,
        openFiles,
        userCode
      };

      const template = Handlebars.compile(html);
      const htmlResult = template(data);

      return htmlResult;
    });
}