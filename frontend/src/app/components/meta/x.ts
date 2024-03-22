import fs from 'fs';
import { x, CountryToISO2 } from './country';

function main() {
  const d: any = CountryToISO2.map((r) => {
    const y: string = r.countryCode;
    const ctn: any = x;
    return {
      ...r,
      countryKorName: ctn[y],
    };
  });
  fs.writeFileSync('x.json', d);
}

main();
