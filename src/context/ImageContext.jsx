import { createContext, useContext, useState } from "react";

const ImageContext = createContext();

function ImageProvider({ children }) {
  const [image, setImage] = useState(null);

  return (
    <ImageContext.Provider value={{ image, setImage }}>
      {children}
    </ImageContext.Provider>
  );
}

function useImage() {
  const context = useContext(ImageContext);
  if (context === undefined)
    throw new Error("ImageContext was used outside of ImageProvider");
  return context;
}

export { ImageProvider, useImage };
