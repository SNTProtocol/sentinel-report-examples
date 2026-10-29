import test from 'node:test';
import assert from 'node:assert/strict';
import {summarizeReport} from '../src/summarize-report.mjs';
const fixture = observations => ({schema_version:'example-0.1',synthetic:true,observations});
const observed = {name:'balance',status:'observed',value:'0'};
const unknown = {name:'identity',status:'unknown',value:null};
test('missing evidence stays partial and no underwriting decision is produced', () => {
 const result=summarizeReport(fixture([observed,unknown]));
 assert.equal(result.observations_returned,1);assert.equal(result.observations_missing,1);
 assert.equal(result.evidence_status,'partial');assert.equal(result.underwriting_decision,'not_provided');assert.equal(result.review_required,true);
});
test('all observations returned still requires review and does not mean safe', () => {
 const result=summarizeReport(fixture([observed]));assert.equal(result.review_required,true);assert.equal(result.underwriting_decision,'not_provided');assert.equal(result.evidence_status,'configured_observations_returned');assert.equal(Object.hasOwn(result,'safe'),false);
});
test('refuses live or unsupported report formats', () => {
 for (const report of [null,{...fixture([observed]),synthetic:false},{...fixture([observed]),schema_version:'other'}]) assert.throws(()=>summarizeReport(report));
});
test('refuses empty and duplicate observations', () => {
 for(const observations of [[],[observed,observed],[{...observed,name:''}]])assert.throws(()=>summarizeReport(fixture(observations)));
});
test('refuses contradictory observations and unknown statuses', () => {
 for(const observation of [{...observed,value:null},{...unknown,value:'verified'},{...observed,status:'safe'}])assert.throws(()=>summarizeReport(fixture([observation])));
});
test('zero is preserved as an observation; input is not mutated', () => {
 const report=fixture([{...observed,value:0}]);const before=JSON.stringify(report);assert.equal(summarizeReport(report).observations_returned,1);assert.equal(JSON.stringify(report),before);
});
