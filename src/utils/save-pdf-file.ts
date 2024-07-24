import { fs } from "@tauri-apps/api";
import { Row } from "./read-excel-file";
import { jsPDF } from "jspdf";

import { save } from "@tauri-apps/api/dialog";
import { writeFile } from "@tauri-apps/api/fs";
import { appDir } from "@tauri-apps/api/path";
import { downloadDir } from "@tauri-apps/api/path";

export const saveFile = async (excelRows: Row[]) => {
  const suggestedFilename = "test.txt";

  // Save into the default downloads directory, like in the browser
  const filePath = (await save({
    defaultPath: (await downloadDir()) + "/" + suggestedFilename,
  })) as string;

  // create arraybuffer from excelRows
  const bufferfromExcelRows = JSON.stringify(excelRows);

  // Now we can write the file to the disk
  await writeFile(filePath, bufferfromExcelRows);
};

// export async function saveFile(excelRows: Row[]) {
//   const pdf = new jsPDF("p", "px", "a4");
//   pdf.text("Hello world!", 10, 10);
//   pdf.save("a4.pdf");
//   // await pdf.html("[1, 2]", {
//   //   callback: function (pdf) {
//   //     fs.writeBinaryFile(
//   //       "yourFileName",
//   //       new Uint8Array(pdf.output("arraybuffer")),
//   //       {
//   //         dir: fs.BaseDirectory.Document,
//   //       }
//   //     );
//   //   },
//   // });
// }
