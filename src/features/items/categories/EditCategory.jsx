import styled, { css } from "styled-components";
import { HiOutlineSwatch } from "react-icons/hi2";
import { LuCroissant } from "react-icons/lu";
import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import SlidingWindow from "../../../ui/SlidingWindow";
import TagWithIcon from "../../../ui/TagWithIcon";
import { useCategory } from "../../../context/CategoryContext";
import Loading from "../../../ui/Loading";
import { getCategoryField } from "./useCategoriesData";
import ItemsSummary from "../../../ui/ItemsSummary";
import AcceptButton from "../../../ui/AcceptButton";
import toast from "react-hot-toast";
import DeleteModal from "../../../ui/DeleteModal";
import { CATEGORY_REQUIRED_FIELDS } from "../../../constants/category";
import FormErrorMessage from "../../../ui/FormErrorMessage";

const Form = styled.form`
  background-color: var(--color-gray-0);
  padding: 2rem 2rem;
  border-radius: var(--border-radius-md);
  margin: 1rem 0;
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

const Label = styled.label`
  font-size: 1.4rem;
  font-weight: 500;
`;

const ItemCountWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const IconWrapper = styled.div`
  & svg {
    display: block;
    stroke-width: 1.2;
    width: 2rem;
    height: 2rem;
  }
`;

const ItemCount = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius-lg);
  background-color: var(--color-gray-100);
  color: var(--color-brand-1000);
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

const DeleteModalMessage = styled.div`
  & span {
    font-weight: 700;
  }
`;

function EditCategory() {
  const newMode = useLocation().pathname.includes("new");
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { name, setName, items, setItems } = useCategory();
  const [initialName, setInitialName] = useState(null);
  const [initialItems, setInitialItems] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [errors, setErrors] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    let nameQueried = "";
    let itemsQueried = {};
    if (categoryId) {
      nameQueried = getCategoryField(parseInt(categoryId), "name");
      itemsQueried = getCategoryField(parseInt(categoryId), "items");
    }

    setInitialName(nameQueried);
    setInitialItems(itemsQueried);
    setName((prev) => {
      if (!prev) return nameQueried;
      else return prev;
    });
    setItems((prev) => {
      if (!prev) return itemsQueried;
      else return prev;
    });
  }, [categoryId, setName, setItems]);

  function handleDelete() {
    // Logic for deleting in DB
    // Loading Animation
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Success
      toast.success("Categoría eliminada con éxito");
      navigate("/items/categories");
    }, 1000);
  }

  async function handleSave() {
    if (validateFields()) {
      // Logic that will edit item in DB
      // Loading Animation
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        // Success
        const type = newMode ? "creada" : "editada";
        toast.success(`Categoría ${type} con éxito`);
        navigate("/items/categories");
      }, 1000);
    }
  }

  function validateFields() {
    let numErrors = 0;
    CATEGORY_REQUIRED_FIELDS.forEach((requiredField) => {
      if (requiredField === "name") {
        if (name === "") {
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
      }
    });

    if (numErrors === 0) {
      setErrorMessage("");
      return true;
    }
    return false;
  }

  if (!newMode && (!initialName || !initialItems))
    return <Loading open={true} />;

  return (
    <SlidingWindow
      previousPage="/items/categories"
      headerText={newMode ? "Nueva Categoría" : "Editar Categoría"}
    >
      <Form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <ItemCountWrapper>
          <ItemCount>
            <IconWrapper>
              <LuCroissant />
            </IconWrapper>
            <div>{items ? Object.keys(items).length : "0"}</div>
          </ItemCount>
        </ItemCountWrapper>

        {errorMessage && (
          <FormErrorMessage
            message={errorMessage}
            onClose={setErrorMessage}
            marginTop="1.5rem"
          />
        )}

        <FieldWrapper>
          <Label htmlFor="categoryName">Nombre de la Categoría</Label>
          <TagWithIcon
            as="input"
            type="text"
            id="categoryName"
            placeholder="Nombre"
            value={name}
            selected={name}
            onChange={(e) => setName(e.target.value)}
            icon={<HiOutlineSwatch />}
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
          <Label htmlFor="categoryItems">Productos</Label>
          {!items || Object.keys(items).length === 0 ? (
            <TagWithIcon
              as={NavLink}
              id="categoryItems"
              to="items"
              icon={<LuCroissant />}
              iconStrokeWidth="1.2"
              iconStrokeWidthSelected="1.6"
            >
              Productos
            </TagWithIcon>
          ) : (
            <ItemsSummary
              items={items}
              setItems={setItems}
              price={false}
              quantity={false}
            />
          )}
        </FieldWrapper>

        <ButtonsWrapper $newMode={newMode}>
          <AcceptButton
            marginTop="0"
            height="100%"
            disabled={
              newMode
                ? name === ""
                : JSON.stringify(items) === JSON.stringify(initialItems) &&
                  name === initialName
            }
            onClick={handleSave}
          >
            {newMode ? "Crear Categoría" : "Guardar Cambios"}
          </AcceptButton>

          {!newMode && (
            <AcceptButton
              marginTop="0"
              backgroundColor="var(--color-red-1000)"
              onClick={() => setDeleteModal(true)}
            >
              Borrar Categoría
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
            ¿Seguro que deseas eliminar <span>{name} </span>de tus categorías?
          </DeleteModalMessage>
        }
        handleDelete={handleDelete}
      />
    </SlidingWindow>
  );
}

export default EditCategory;
