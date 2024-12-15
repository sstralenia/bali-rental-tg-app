export function capitalize(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function formatString(template: string, data: Record<string, string>): string {
  return template.replace(/{{(.*?)}}/g, (match, p1) => data[p1] || match);
}
