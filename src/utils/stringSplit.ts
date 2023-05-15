export function stringSplit(str: string[]): string {
  let res = "";
  for (let key of str) {
    res += key + `\n`;
  }
  return res;
}
