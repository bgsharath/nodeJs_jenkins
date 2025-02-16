import i18n from 'i18n';
import path from 'path';

i18n.configure({
  locales: ['en', 'kn'],
  directory: path.join(__dirname, '../locales'),
  defaultLocale: 'kn',
  queryParameter: 'lang',
  autoReload: true,
  updateFiles: false,
});

export default i18n;
