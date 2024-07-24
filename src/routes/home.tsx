import { useState } from "react";
import { readFile, Row } from "../utils/read-excel-file";
import { saveFile } from "../utils/save-doc-file";

export default function Home() {
  const [excelRows, setExcelRows] = useState<Row[]>([]);

  return (
    <div className="h-full w-full m-10">
      <div className="flex flex-row items-baseline align-middle gap-4">
        <h1 className="text-2xl font-bold mb-4">
          Kliknij przycisk i odczytaj plik z Excela
        </h1>
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            readFile().then(setExcelRows);
          }}
        >
          <button className="px-4 py-2 border-2 rounded-md" type="submit">
            Wczytaj plik
          </button>
          {excelRows?.length ? (
            <button
              className="px-4 py-2 border-2 rounded-md text-danger"
              type="reset"
              onClick={() => setExcelRows([])}
            >
              Usuń plik
            </button>
          ) : null}
        </form>
      </div>

      {excelRows?.length ? (
        <div className="flex flex-row items-baseline align-middle gap-4">
          <h1 className="text-2xl font-bold mb-4">
            Kliknij przycisk i pobierz dane jako pdf
          </h1>
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              saveFile(excelRows);
            }}
          >
            <button
              className="px-4 py-2 border-2 rounded-md text-secondary"
              type="submit"
            >
              Zapisz dane
            </button>
          </form>
        </div>
      ) : null}

      <table className="mt-8 border-t-4">
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
  );
}
