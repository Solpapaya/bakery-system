import GlobalStyles from "./styles/GlobalStyles";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Dashboard from "./pages/Dashboard";
import Tickets from "./pages/Tickets";
import PageNotFound from "./pages/PageNotFound";
import { MobileProvider } from "./context/MobileContext";
import NewTicket from "./features/tickets/NewTicket";
import CustomerNewTicket from "./features/tickets/CustomerNewTicket";
import ItemsNewTicket from "./features/tickets/ItemsNewTicket";
import { ItemsProvider } from "./context/ItemsContext";
import Checkout from "./features/tickets/Checkout";
import { Toaster } from "react-hot-toast";
import Items from "./pages/Items";
import EditItem from "./features/items/EditItem";
import EditPreviewImage from "./features/items/EditPreviewImage";
import { ImageProvider } from "./context/ImageContext";
import { ScrollProvider } from "./context/useScrollContext";
import { CustomerProvider } from "./context/CustomerContext";
import { DateProvider } from "./context/DateContext";
import { ItemProvider } from "./context/ItemContext";
import ItemsCategories from "./pages/ItemsCategories";
import { CategoriesProvider } from "./context/CategoriesContext";
import EditCategory from "./features/items/categories/EditCategory";
import { CategoryProvider } from "./context/CategoryContext";
import EditCategoryItems from "./features/items/categories/EditCategoryItems";
import TicketOverview from "./features/tickets/TicketOverview";

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <MobileProvider>
                <ScrollProvider>
                  <AppLayout />
                </ScrollProvider>
              </MobileProvider>
            }
          >
            <Route index element={<Navigate replace to="tickets" />} />
            <Route path="tickets" element={<Tickets />} />
            <Route
              path="tickets/new"
              element={
                <ItemsProvider>
                  <CustomerProvider>
                    <DateProvider>
                      <Outlet />
                    </DateProvider>
                  </CustomerProvider>
                </ItemsProvider>
              }
            >
              <Route index element={<NewTicket />} />
              <Route path="customer" element={<CustomerNewTicket />} />
              <Route path="items" element={<ItemsNewTicket />} />
              <Route path="checkout" element={<Checkout />} />
            </Route>
            <Route path="tickets/:ticketId/" element={<TicketOverview />} />
            <Route
              path="tickets/:ticketId/edit"
              element={
                <ItemsProvider>
                  <CustomerProvider>
                    <DateProvider>
                      <Outlet />
                    </DateProvider>
                  </CustomerProvider>
                </ItemsProvider>
              }
            >
              <Route index element={<NewTicket />} />
              <Route path="customer" element={<CustomerNewTicket />} />
              <Route path="items" element={<ItemsNewTicket />} />
            </Route>
            <Route
              path="items"
              element={
                <ItemsProvider>
                  <Items />
                </ItemsProvider>
              }
            />
            <Route
              path="items/:itemId/edit"
              element={
                <ImageProvider>
                  <ItemProvider>
                    <Outlet />
                  </ItemProvider>
                </ImageProvider>
              }
            >
              <Route index element={<EditItem />} />
              <Route path="image" element={<EditPreviewImage />} />
            </Route>
            <Route
              path="items/new"
              element={
                <ImageProvider>
                  <ItemProvider>
                    <Outlet />
                  </ItemProvider>
                </ImageProvider>
              }
            >
              <Route index element={<EditItem />} />
              <Route path="image" element={<EditPreviewImage />} />
            </Route>
            <Route
              path="items/categories"
              element={
                <CategoriesProvider>
                  <ItemsCategories />
                </CategoriesProvider>
              }
            ></Route>
            <Route
              path="items/categories/:categoryId/edit"
              element={
                <CategoryProvider>
                  <ItemsProvider>
                    <Outlet />
                  </ItemsProvider>
                </CategoryProvider>
              }
            >
              <Route index element={<EditCategory />} />
              <Route path="items" element={<EditCategoryItems />} />
            </Route>
            <Route
              path="items/categories/new"
              element={
                <CategoryProvider>
                  <ItemsProvider>
                    <Outlet />
                  </ItemsProvider>
                </CategoryProvider>
              }
            >
              <Route index element={<EditCategory />} />
              <Route path="items" element={<EditCategoryItems />} />
            </Route>
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: ".8rem" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "1.6rem",
            maxWidth: "50rem",
            padding: "1.6rem 2.4rem",
            backgroundColor: "var(--color-gray-0)",
            color: "var(--color-gray-700)",
          },
        }}
      />
    </>
  );
}

export default App;
