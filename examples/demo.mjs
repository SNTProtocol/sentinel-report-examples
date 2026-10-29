import {readFileSync} from 'node:fs';
import {summarizeReport} from '../src/summarize-report.mjs';
const report = JSON.parse(readFileSync(new URL('./synthetic-report.json', import.meta.url), 'utf8'));
console.log(JSON.stringify(summarizeReport(report), null, 2));
