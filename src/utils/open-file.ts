import { read } from "xlsx";
import { open } from "@tauri-apps/api/dialog";
import { readBinaryFile } from "@tauri-apps/api/fs";

const filters = [
  { name: "Excel Binary Workbook", extensions: ["xlsb"] },
  { name: "Excel Workbook", extensions: ["xlsx"] },
  { name: "Excel 97-2004 Workbook", extensions: ["xls"] },
];

export async function openFile() {
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
