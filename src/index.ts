import * as fs from 'fs';
import _ from 'lodash';

function convertJSON() {
  // READ FROM FILE
  const rawAllocData: string = fs.readFileSync('./files/alloc.json', {encoding:'utf8', flag:'r'});
  const rawVestingData: string = fs.readFileSync('./files/vesting.json', {encoding:'utf8', flag:'r'});

  // PARSE READ FILE
  const parsedAllocData: [string, number][] = JSON.parse(rawAllocData);
  const parsedVestingData: [string, [string, number][]][] = JSON.parse(rawVestingData);
  const convertedAllocData = _.map(parsedAllocData, allocation => {
    return [allocation[0], (allocation[1] * (10**10))]
  })
  const convertedVestingData: [string, [string, number][]][] = _.map(parsedVestingData, vest => {
    const newVestSchedule: [string, number][] = _.map(vest[1], schedule => [schedule[0], (schedule[1] * (10**10))])
    const convertedVest: [string, [string, number][]] = [vest[0], newVestSchedule]
    return convertedVest
  })
  fs.writeFileSync('./files/new-alloc.json', JSON.stringify(convertedAllocData));
  fs.writeFileSync('./files/new-vesting.json', JSON.stringify(convertedVestingData));
}
convertJSON()