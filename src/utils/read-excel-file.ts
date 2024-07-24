import { utils } from "xlsx";
import { openFile } from "./open-file";

export type Row = Record<string, string | number>;

export async function readFile() {
  let data = { value: [] };
  const wb = await openFile();

  /* get the first worksheet */
  const ws = wb.Sheets[wb.SheetNames[0]];

  /* get data from the first worksheet */
  const array = utils.sheet_to_json(ws) as Row[];
  console.log({ data, array });
  return array;
}
