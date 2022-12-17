export const getQueryParameter: (parameter: string, url?: string) => string | undefined = (parameter: string, url = window.location.href) => {
  parameter = parameter.replace(/[[\]]/g, '\\$&');
  const regex = new RegExp('[?&]' + parameter + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return undefined;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};
