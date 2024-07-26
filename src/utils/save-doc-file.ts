import * as docx from "docx";
import { save } from "@tauri-apps/api/dialog";
import { writeBinaryFile } from "@tauri-apps/api/fs";
import { downloadDir } from "@tauri-apps/api/path";
import { Row } from "./read-excel-file";

const { Document, Packer, Paragraph, TextRun, PageBreak } = docx;

export const saveFile = async (rows: Row[]) => {
  const suggestedFilename = "test.doc";

  // Save into the default downloads directory, like in the browser
  const filePath = (await save({
    defaultPath: (await downloadDir()) + "/" + suggestedFilename,
  })) as string;

  const doc = new Document({
    creator: "Jan Kowalski",
    description: "Import pliku Excel do pliku Word",
    title: "Moje dane",
    sections: [
      {
        properties: {},
        children: [
          ...rows.map((row) => {
            return new Paragraph({
              children: [
                new TextRun({
                  text: "\t" + Object.keys(row).join(", "),
                  break: 1,
                }),
                new TextRun({
                  text: "\t" + Object.values(row).join(", "),
                  break: 1,
                }),
                new PageBreak(),
              ],
            });
          }),
        ],
      },
    ],
  });
  // change this Blob to a buffer
  const b64string = await Packer.toBlob(doc);
  const buffer = await b64string.arrayBuffer();

  // Now we can write the file to the disk
  await writeBinaryFile(filePath, buffer);
};
