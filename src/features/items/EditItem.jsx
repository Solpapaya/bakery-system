import styled, { css } from "styled-components";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  HiOutlineCurrencyDollar,
  HiOutlineWrench,
  HiOutlineXMark,
} from "react-icons/hi2";
import { LuCroissant } from "react-icons/lu";
import SlidingWindow from "../../ui/SlidingWindow";
import TagWithIcon from "../../ui/TagWithIcon";
import MultiSelectDropDown from "../../ui/MultiSelectDropDown";
import { getCategories, getItem } from "./useItemsData";
import { convertStrToCurrency } from "../../utils/helpers";
import AcceptButton from "../../ui/AcceptButton";
import { ITEM_REQUIRED_FIELDS } from "../../constants/item";
import Loading from "../../ui/Loading";
import toast from "react-hot-toast";
import ImageInput from "../../ui/ImageInput";
import DeleteModal from "../../ui/DeleteModal";
import { useItem } from "../../context/ItemContext";

const Form = styled.form`
  background-color: var(--color-gray-0);
  padding: 2rem 2rem;
  border-radius: var(--border-radius-md);
  margin: 1rem 0;
`;

const Label = styled.label`
  font-size: 1.4rem;
  font-weight: 500;
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1.7rem;

  &:first-of-type {
    margin-top: 0;
  }
`;

const ButtonsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.6fr;
  align-items: center;
  column-gap: 2rem;
  margin-top: 3rem;

  ${(props) =>
    props.$newMode &&
    css`
      display: flex;
    `}
`;

const ErrorMessage = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.4rem;
  border-radius: var(--border-radius-lg);

  background-color: var(--color-red-1000);
  color: var(--color-gray-0);
`;

const ErrorMessageIconWrapper = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 1rem;
  background-color: transparent;
  border: none;

  & svg {
    display: block;
    stroke-width: 2;
  }
`;

const DeleteModalMessage = styled.div`
  & span {
    font-weight: 700;
  }
`;

function EditItem() {
  const newMode = useLocation().pathname.includes("new");
  const { itemId } = useParams();
  const navigate = useNavigate();
  const [initialItem, setInitialItem] = useState(null);
  const { item, setItem } = useItem();
  const [categories, setCategories] = useState(null);
  const [errors, setErrors] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    if (newMode) {
      const defaultItem = {
        name: "",
        price: "",
        cost: "",
        categories: [],
        img: "",
      };
      setInitialItem(defaultItem);

      setItem((prev) => {
        if (!prev) return defaultItem;
        else return prev;
      });
    } else {
      const queriedItem = getItem(parseInt(itemId));
      setInitialItem(queriedItem);

      setItem((prev) => {
        if (!prev) return queriedItem;
        else return prev;
      });
    }
  }, [itemId, setItem, newMode]);

  useEffect(() => {
    setCategories(getCategories());
  }, []);

  function handlePriceChange(e) {
    const type = e.target.id.split("item")[1].toLowerCase();

    const inputType = e.nativeEvent.inputType;
    const number = e.nativeEvent.data;

    if (/\d/.test(number)) {
      setItem((prev) => {
        const prevPriceFormatted = prev[type]
          ?.replace(".", "")
          .replace(/^0+/, ""); // removes all starting 0s
        let newPriceFormatted;
        if (prevPriceFormatted.length >= 9) newPriceFormatted = "999,999.99";
        else {
          const newPrice = prevPriceFormatted + number.toString();
          newPriceFormatted = convertStrToCurrency(newPrice);
        }
        return { ...prev, [type]: newPriceFormatted };
      });
    } else if (inputType === "deleteContentBackward") {
      setItem((prev) => {
        const prevPriceFormatted = prev[type]?.replace(".", "");
        const newPrice = prevPriceFormatted.slice(0, -1);
        let newPriceFormatted = convertStrToCurrency(newPrice);
        if (newPriceFormatted === "0.00") newPriceFormatted = "";
        return { ...prev, [type]: newPriceFormatted };
      });
    }
  }

  async function handleSave() {
    if (validateFields()) {
      // Logic that will edit item in DB
      // Loading Animation
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        // Success
        const type = newMode ? "creado" : "editado";
        toast.success(`Producto ${type} con éxito`);
        navigate("/items");
      }, 1000);
    }
  }

  function validateFields() {
    let numErrors = 0;
    ITEM_REQUIRED_FIELDS.forEach((requiredField) => {
      if (item[requiredField] === "") {
        setErrors((prev) => ({ ...prev, [requiredField]: true }));
        setErrorMessage("Campos obligatorios");
        numErrors += 1;
      } else {
        // setErrors((prev) => ({ ...prev, [requiredField]: false }));
        setErrors((prev) => {
          if (prev) {
            const copy = prev;
            delete copy[requiredField];
            return copy;
          } else return prev;
        });
      }
    });

    if (numErrors === 0) {
      setErrorMessage("");
      return true;
    }
    return false;
  }

  function handleDelete() {
    // Logic for deleting in DB
    // Loading Animation
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Success
      toast.success("Producto eliminado con éxito");
      navigate("/items");
    }, 1000);
  }

  if (!item) return <Loading open={true} />;

  return (
    <SlidingWindow
      previousPage="/items"
      headerText={newMode ? "Nuevo Producto" : "Editar Producto"}
    >
      <Form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        {errorMessage && (
          <ErrorMessage>
            <span>{errorMessage}</span>
            <ErrorMessageIconWrapper onClick={() => setErrorMessage("")}>
              <HiOutlineXMark />
            </ErrorMessageIconWrapper>
          </ErrorMessage>
        )}

        <FieldWrapper>
          <Label htmlFor="itemName">Nombre del Producto</Label>
          <TagWithIcon
            as="input"
            type="text"
            id="itemName"
            placeholder="Nombre"
            value={item?.name}
            selected={item?.name}
            onChange={(e) =>
              setItem((prev) => ({ ...prev, name: e.target.value }))
            }
            icon={<LuCroissant />}
            iconWidth="1.8rem"
            iconHeight="1.8rem"
            iconStrokeWidth="1.4"
            iconStrokeWidthSelected="1.6"
            paddingTagForIconSpace="4.2rem"
            danger={errorMessage && errors?.name}
            textTransform="capitalize"
          />
        </FieldWrapper>

        <FieldWrapper>
          <Label htmlFor="itemPrice">Precio</Label>
          <TagWithIcon
            as="input"
            type="text"
            inputMode="numeric"
            id="itemPrice"
            placeholder="Precio"
            value={item?.price}
            selected={item?.price}
            onChange={handlePriceChange}
            icon={<HiOutlineCurrencyDollar />}
            iconWidth="1.8rem"
            iconHeight="1.8rem"
            iconStrokeWidth="1.4"
            iconStrokeWidthSelected="1.6"
            paddingTagForIconSpace="4.2rem"
            danger={errorMessage && errors?.price}
          />
        </FieldWrapper>

        <FieldWrapper>
          <Label htmlFor="itemCost">Costo</Label>
          <TagWithIcon
            as="input"
            type="text"
            inputMode="numeric"
            id="itemCost"
            placeholder="Costo"
            value={item?.cost}
            selected={item?.cost}
            onChange={handlePriceChange}
            icon={<HiOutlineWrench />}
            iconWidth="1.8rem"
            iconHeight="1.8rem"
            iconStrokeWidth="1.4"
            iconStrokeWidthSelected="1.6"
            paddingTagForIconSpace="4.2rem"
          />
        </FieldWrapper>

        <FieldWrapper>
          <Label as="div">Categorias</Label>
          <MultiSelectDropDown
            item={item}
            setItem={setItem}
            id="categories"
            options={categories}
          />
        </FieldWrapper>

        <FieldWrapper>
          <Label htmlFor="itemImage">Imagen</Label>
          <ImageInput id="itemImage" />
        </FieldWrapper>

        <ButtonsWrapper $newMode={newMode}>
          <AcceptButton
            marginTop="0"
            height="100%"
            disabled={
              newMode
                ? item.name === "" || item.price === ""
                : JSON.stringify(item) === JSON.stringify(initialItem)
            }
            onClick={handleSave}
          >
            {newMode ? "Crear Producto" : "Guardar Cambios"}
          </AcceptButton>
          {!newMode && (
            <AcceptButton
              marginTop="0"
              backgroundColor="var(--color-red-1000)"
              onClick={() => setDeleteModal(true)}
            >
              Borrar Producto
            </AcceptButton>
          )}
        </ButtonsWrapper>
      </Form>

      <Loading open={loading} />
      <DeleteModal
        open={deleteModal}
        setOpen={setDeleteModal}
        message={
          <DeleteModalMessage>
            ¿Seguro que deseas eliminar <span>{item?.name} </span>de tus
            productos?
          </DeleteModalMessage>
        }
        handleDelete={handleDelete}
      />
    </SlidingWindow>
  );
}

export default EditItem;
