import { useEffect, useState } from "react";

import api from "../../services/api";




interface Props {
  column_names?: string[];
  // data: IData[];
  object: any;
  route: string;
}
// interface IData {
  // items: JSX.Element[];
// }
function GenericCreate({
  //column_names,
  object = {},
  route,
}: Props) {
  const [keys, setKeys] = useState<string[]>();
  const [updatedObject, setUpdatedObject] = useState<any>({} as any);

  useEffect(() => {
    setKeys(Object.keys(object));
    setUpdatedObject(object);
  }, [object]);
  
  const handleCreate = async () => {
    const {
      data: any,
    } = await api.post<any>(route, updatedObject);
    setUpdatedObject(any);
  }

  const handleInputChange = (key: string, value: string) => {
    setUpdatedObject({
      ...updatedObject,
      [key]: value,
    });
    
  };


  return (
    <div>
      {
        keys?.map((key) => {
          return (
            <div>
              <label>{key}</label>
              <input type="text" value={updatedObject?.[key]}
                onChange={(e) => {
                  handleInputChange(key, e.target.value);
                }}
              />
            </div>
          )
        })
      }
      <button onClick={handleCreate}>Criar</button>
      

    </div>
  );
}

export default GenericCreate;
