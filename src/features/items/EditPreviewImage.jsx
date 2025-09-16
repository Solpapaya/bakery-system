import { useLocation, useNavigate } from "react-router-dom";
import SlidingWindow from "../../ui/SlidingWindow";
import styled from "styled-components";
import { ITEM_IMAGE_DIMENSIONS } from "../../constants/item";
import { useImage } from "../../context/ImageContext";
import AcceptButton from "../../ui/AcceptButton";
import { useState } from "react";
import Cropper from "react-easy-crop";
import { mqHeight } from "../../utils/mediaQueryHelpers";
import getCroppedImg from "../../utils/helpers";
import Loading from "../../ui/Loading";
import { useItem } from "../../context/ItemContext";

const ModeWrapper = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PreviewImage = styled.img`
  width: ${ITEM_IMAGE_DIMENSIONS.width * 6}${ITEM_IMAGE_DIMENSIONS.unit};
  height: ${ITEM_IMAGE_DIMENSIONS.height * 6}${ITEM_IMAGE_DIMENSIONS.unit};
  border-radius: var(--border-radius-sm);
  object-fit: cover;
  object-position: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ButtonsWrapper = styled.div`
  width: 90%;
  margin-top: 5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 2rem;
  align-items: center;
`;

const CropperWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 30rem;

  @media ${mqHeight.iphone15ProMax} {
    height: 40rem;
  }
`;

function EditPreviewImage() {
  const prevPath = useLocation().pathname.split("/").slice(0, -1).join("/");
  const { item, setItem } = useItem();
  const navigate = useNavigate();
  const { image, setImage } = useImage();
  const [previewMode, setPreviewMode] = useState(true);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [loading, setLoading] = useState(false);

  function onCropComplete(_, croppedAreaPixels) {
    setCroppedAreaPixels(croppedAreaPixels);
  }

  async function handleAcceptEditImage() {
    try {
      setLoading(true);
      const croppedImage = await getCroppedImg(image, croppedAreaPixels);
      setTimeout(() => {
        setLoading(false);
        // Success
        setImage(croppedImage);
        setPreviewMode(true);
      }, 1000);
    } catch (e) {
      console.error(e);
    }
  }

  function handleAccept() {
    // DB logic
    setItem((prev) => ({ ...prev, img: image }));
    // Loading
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Success
      navigate(-1);
    }, 1000);
  }

  return (
    <SlidingWindow
      previousPage={prevPath}
      headerText={previewMode ? "Vista Previa" : "Editar Imagen"}
    >
      {previewMode && (
        <ModeWrapper>
          <PreviewImage src={image} alt="Preview" />

          <ButtonsWrapper>
            <AcceptButton
              marginTop="0"
              color="var(--color-gray-1000)"
              backgroundColor="var(--color-gray-300)"
              onClick={() => setPreviewMode((prev) => !prev)}
            >
              Editar Imagen
            </AcceptButton>
            <AcceptButton
              marginTop="0"
              onClick={handleAccept}
              disabled={item.img === image}
            >
              Aceptar
            </AcceptButton>
          </ButtonsWrapper>
        </ModeWrapper>
      )}

      {!previewMode && (
        <ModeWrapper>
          <CropperWrapper>
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={4 / 3}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </CropperWrapper>

          <ButtonsWrapper>
            <AcceptButton
              marginTop="0"
              color="var(--color-gray-1000)"
              backgroundColor="var(--color-gray-300)"
              onClick={() => setPreviewMode((prev) => !prev)}
            >
              Cancelar
            </AcceptButton>
            <AcceptButton marginTop="0" onClick={handleAcceptEditImage}>
              Editar
            </AcceptButton>
          </ButtonsWrapper>
        </ModeWrapper>
      )}

      <Loading open={loading} />
    </SlidingWindow>
  );
}

export default EditPreviewImage;
