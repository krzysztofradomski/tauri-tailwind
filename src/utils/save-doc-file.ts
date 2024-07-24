import { Row } from "./read-excel-file";

import { save } from "@tauri-apps/api/dialog";
import { writeBinaryFile, writeFile } from "@tauri-apps/api/fs";
import { downloadDir } from "@tauri-apps/api/path";

import * as docx from "docx";
const { Document, Packer, Paragraph, TextRun } = docx;

export const saveFile = async (rows: Row[]) => {
  const suggestedFilename = "test.doc";

  // Save into the default downloads directory, like in the browser
  const filePath = (await save({
    defaultPath: (await downloadDir()) + "/" + suggestedFilename,
  })) as string;

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: "\t" + Object.keys(rows[0]).join(", "),
                bold: true,
                break: 1,
              }),
            ],
          }),
          ...rows.map((row) => {
            return new Paragraph({
              children: [
                new TextRun({
                  text: "\t" + Object.values(row).join(", "),
                  break: 1,
                }),
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
