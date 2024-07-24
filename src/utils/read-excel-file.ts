import { read } from "xlsx";
import { open } from "@tauri-apps/api/dialog";
import { readBinaryFile } from "@tauri-apps/api/fs";
import { utils } from "xlsx";

export type Row = Record<string, string | number>;

const filters = [
  { name: "Excel Binary Workbook", extensions: ["xlsb"] },
  { name: "Excel Workbook", extensions: ["xlsx"] },
  { name: "Excel 97-2004 Workbook", extensions: ["xls"] },
];

async function openFile() {
  const selected = (await open({
    title: "Open Spreadsheet",
    multiple: false,
    directory: false,
    filters,
  })) as string;

  const d = await readBinaryFile(selected);

  const wb = read(d);
  return wb;
}

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
