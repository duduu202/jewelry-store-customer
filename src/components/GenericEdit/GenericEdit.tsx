import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { FaRegTrashAlt } from "react-icons/fa";
import { ButtonModel } from "../ButtonModel/ButtonModel";

interface Props {
  object: ObjectParams;
  route: string;
  id?: string;
  updateFunction?: () => void;
}

interface ObjectParams {
  fields: Field[];
}

interface Field {
  field: any;
  field_name: string;
  required?: boolean;
  hidden?: boolean;
  render?: boolean;
}

function GenericEdit({ object, route, id }: Props) {
  const [updatedObject, setUpdatedObject] = useState<ObjectParams>({ fields: [] });

  

  useEffect(() => {
    setUpdatedObject(object);
  }, [object]);

  const buildObject = (inputObject: ObjectParams) => {
    const newObject: Record<string, any> = {};
    inputObject.fields.forEach((field) => {
      newObject[field.field_name] = field.field;
    });
    return newObject;
  };

  const handleUpdate = async () => {
    try {
      const updatedData = buildObject(updatedObject);

      if (id) {
        delete updatedData.id;
        await api.put(route + "/" + id, updatedData);
      } else {
        await api.post(route, updatedData);
      }
      console.log("Objeto atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar o objeto:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(route + "/" + id);
      console.log("Objeto deletado com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar o objeto:", error);
    }
  }

  const handleInputChange = (field_name: string, value: any) => {
    setUpdatedObject((prevObject) => ({
      ...prevObject,
      fields: prevObject.fields?.map((field) =>
        field.field_name === field_name ? { ...field, field: value } : field
      ),
    }));
  };

  return (
    <div>
      {updatedObject.fields?.map((field) => (
        field.render !== false && (
          <div key={field.field_name}>
            <label>{field.field_name}</label>
            <input
              type={field.hidden ? "password" : "text"}
              value={field.field}
              onChange={(e) => {
                handleInputChange(field.field_name, e.target.value);
              }}
              required={field.required !== false}
            />
          </div>
        )
      ))}
      <ButtonModel onClick={handleUpdate}>Atualizar</ButtonModel>
      <ButtonModel onClick={handleDelete}><FaRegTrashAlt/> Deletar</ButtonModel>
    </div>
  );
}

export default GenericEdit;