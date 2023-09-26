import { useEffect, useState } from "react";
import {
  GenericListTable,
  GenericListCell,
  GenericListHeaderCell,
  GenericListRow,
  GenericSelectedCell,
} from "./styles";
import api from "../../services/api";

interface Props {
  column_names?: string[];
  data?: IData[];
}
interface IData {
  id: string;
  items: any[];
  highlight?: boolean;
}
function GenericList({ column_names, data }: Props) {
  return (
    <div>
      <GenericListTable>
        <thead>
          <tr>
            {column_names?.map((head) => (
              <GenericListHeaderCell key={head}>{head}</GenericListHeaderCell>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((line) => (
            <GenericListRow key={line.id}>
              {line.highlight
                ? line.items.map((item) => (
                    <GenericSelectedCell>{item}</GenericSelectedCell>
                  ))
                : line.items.map((item) => (
                    <GenericListCell>{item}</GenericListCell>
                  ))}
            </GenericListRow>
          ))}
        </tbody>
      </GenericListTable>
    </div>
  );
}

export default GenericList;
