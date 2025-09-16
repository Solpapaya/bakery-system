import styled from "styled-components";
import TagWithIcon from "./TagWithIcon";
import { CiImageOn } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useImage } from "../context/ImageContext";
import { ITEM_IMAGE_DIMENSIONS } from "../constants/item";
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import DeleteModal from "./DeleteModal";
import Loading from "./Loading";
import { useItem } from "../context/ItemContext";

const Wrapper = styled.div`
  position: relative;
`;

const HiddenInput = styled.input`
  display: none;
`;

const SelectedImageWrapper = styled.div`
  display: flex;
  gap: 3rem;
`;

const Image = styled.img`
  width: ${ITEM_IMAGE_DIMENSIONS.width * 4}${ITEM_IMAGE_DIMENSIONS.unit};
  height: ${ITEM_IMAGE_DIMENSIONS.height * 4}${ITEM_IMAGE_DIMENSIONS.unit};
  border-radius: var(--border-radius-sm);
  object-fit: cover;
  object-position: center;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3rem;
`;

const IconWrapper = styled.button`
  border: none;
  background-color: ${(props) => props.$backgroundColor};
  border-radius: var(--border-radius-lg);
  padding: 0.6rem;

  & svg {
    display: block;
    color: ${(props) => props.$color};
    width: 2.4rem;
    height: 2.4rem;
  }
`;

const DeleteModalMessage = styled.div`
  & span {
    font-weight: 700;
  }
`;

function ImageInput({ id }) {
  const navigate = useNavigate();
  const { item, setItem } = useItem();
  const { setImage } = useImage();
  const hasImage = item?.img ? item?.img !== "" : false;
  const [deleteModal, setDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleImageChange(e) {
    const file = e.target.files[0];

    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImage(imageURL);
      navigate("image");
    }
  }

  function handleDeleteImage() {
    // DB logic
    setLoading(true);
    setTimeout(() => {
      setItem((prev) => ({ ...prev, img: "" }));
      setLoading(false);
      // Success
      setDeleteModal(false);
    }, 1000);
  }

  function handleEditImage() {
    setImage(item.img);
    navigate("image");
  }

  return (
    <>
      <Wrapper>
        <>
          {!hasImage && (
            <>
              <TagWithIcon
                as="label"
                htmlFor={id}
                icon={<CiImageOn />}
                iconStrokeWidth=".4"
              >
                Imagen
              </TagWithIcon>
              <HiddenInput id={id} type="file" onChange={handleImageChange} />
            </>
          )}

          {hasImage && (
            <TagWithIcon as="div" paddingTagForIconSpace="1rem" selected={true}>
              <SelectedImageWrapper>
                <Image src={item?.img} />
                <ButtonsWrapper>
                  <IconWrapper
                    $backgroundColor="var(--color-gray-0)"
                    onClick={handleEditImage}
                  >
                    <HiOutlinePencilSquare />
                  </IconWrapper>
                  <IconWrapper
                    $color="var(--color-gray-0)"
                    $backgroundColor="var(--color-red-1000)"
                    onClick={() => {
                      setDeleteModal(true);
                    }}
                  >
                    <HiOutlineTrash />
                  </IconWrapper>
                </ButtonsWrapper>
              </SelectedImageWrapper>
            </TagWithIcon>
          )}
        </>
      </Wrapper>

      <DeleteModal
        open={deleteModal}
        setOpen={setDeleteModal}
        message={
          <DeleteModalMessage>
            ¿Seguro que deseas eliminar la <span>imagen</span> de tu producto{" "}
            <span>{item?.name}</span>?
          </DeleteModalMessage>
        }
        handleDelete={handleDeleteImage}
      />
      <Loading open={loading} />
    </>
  );
}

export default ImageInput;
