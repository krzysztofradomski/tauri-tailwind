import { useState } from "react";
import { utils } from "xlsx";
import reactLogo from "../assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import { openFile } from "../utils/read-excel-file";

type Row = Record<string, string | number>;

async function readFile(callback: React.Dispatch<React.SetStateAction<Row[]>>) {
  let data = { value: [] };
  const wb = await openFile();

  /* get the first worksheet */
  const ws = wb.Sheets[wb.SheetNames[0]];

  /* get data from the first worksheet */
  const array = utils.sheet_to_json(ws) as Row[];
  console.log({ data, array });
  return callback(array);
}

export default function Home() {
  const [excelRows, setExcelRows] = useState<Row[]>([]);

  return (
    <div className="flex flex-row h-full w-full m-10">
      <div>
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold mb-4">
            Kliknij przycisk i odczytaj plik z Excela
          </h1>

          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              readFile(setExcelRows);
            }}
          >
            <button
              className="px-4 py-2 border-2 rounded-md text-primary"
              type="submit"
            >
              Wczytaj plik
            </button>
          </form>

          <table className="mt-4">
            <thead>
              <tr>
                {Object.keys(excelRows[0] || {}).map((key) => (
                  <th key={key} className="px-4 py-2 border-b">
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {excelRows.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, index) => (
                    <td key={index} className="px-4 py-2 border-b">
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
