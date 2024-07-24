import { fs } from "@tauri-apps/api";
import { Row } from "./read-excel-file";
import { jsPDF } from "jspdf";

export async function saveFile(excelRows: Row[]) {
  const pdf = new jsPDF("p", "px", "a4");
  pdf.text("Hello world!", 10, 10);
  pdf.save("a4.pdf");
  // await pdf.html(
  //   excelRows
  //     .map((r) => `<div>${Object.values(r).join(" | ")}</div>`)
  //     .join("<br>"),
  //   {
  //     callback: function (pdf) {
  //       fs.writeBinaryFile("yourFileName", pdf.output(), {
  //         dir: fs.BaseDirectory.Document,
  //       });
  //     },
  //   }
  // );
}
