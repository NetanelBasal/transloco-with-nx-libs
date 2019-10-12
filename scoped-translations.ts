export const availableLangs = ['en', 'es'];

export const scopeLoader = (importer, root = 'i18n') => {
  return availableLangs.reduce((acc, lang) => {
    acc[lang] = () => importer(lang, root);
    return acc;
  }, {});
};
