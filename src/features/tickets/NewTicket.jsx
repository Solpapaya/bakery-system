import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { HiOutlineCalendarDays, HiOutlineUserCircle } from "react-icons/hi2";
import { LuCroissant } from "react-icons/lu";
import ButtonWithIcon from "../../ui/ButtonWithIcon";
import Modal from "../../ui/Modal";
import CalendarDeliveryDate from "../../ui/CalendarDeliveryDate";
import SlidingWindow from "../../ui/SlidingWindow";
import TagWithIcon from "../../ui/TagWithIcon";
import { useItems } from "../../context/ItemsContext";
import ItemsSummary from "../../ui/ItemsSummary";
import AcceptButton from "../../ui/AcceptButton";
import { useCustomer } from "../../context/CustomerContext";
import { useDate } from "../../context/DateContext";
import { useScroll } from "../../context/useScrollContext";
import Loading from "../../ui/Loading";
import { getTicket } from "./useTicketsData";
import { convertArrayToObjBasedOnKey, isEqualObjs } from "../../utils/helpers";
import toast from "react-hot-toast";
import DeleteModal from "../../ui/DeleteModal";
import { TICKET_DANGER_DAYS } from "../../constants/tickets";

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

const FilterButtonContent = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.6fr;
  align-items: center;
  column-gap: 2rem;
  margin-top: 3rem;
`;

const DateShortcut = styled.span`
  margin-left: 1.5rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  background-color: var(--color-gray-200);
  color: var(--color-gray-700);

  border-radius: var(--border-radius-sm);
  padding: 0rem 0.4rem;
  font-weight: 500;

  ${(props) =>
    props.$danger &&
    css`
      background-color: var(--color-red-1000);
      color: var(--color-gray-0);
    `}
`;

const MODAL_TITLES = {
  calendar: "Fecha de Entrega",
};

function NewTicket() {
  const navigate = useNavigate();
  const { ticketId } = useParams();
  const path = useLocation().pathname;
  const newMode = path.includes("new");
  const prevPath = path.split("/").slice(0, -1).join("/");
  const { customer, setCustomer, initialCustomer, setInitialCustomer } =
    useCustomer();
  const {
    formattedDeliveryDate,
    dateShortcut,
    setDeliveryDate,
    initialFormattedDeliveryDate,
    setInitialDeliveryDate,
    daysLeft,
  } = useDate();
  const {
    ticketItems,
    setTicketItems,
    initialTicketItems,
    setInitialTicketItems,
  } = useItems();
  const { setTopMinScrollY } = useScroll();
  const [openModal, setOpenModal] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    setTopMinScrollY(50);
  }, [setTopMinScrollY]);

  useEffect(() => {
    if (newMode || customer !== "") return setInitialLoading(false);

    // Get data from DB
    // NOTE: Remember to also get image for the items of the ticket
    const {
      customerFullName,
      deliveryDate: date,
      items,
    } = getTicket(parseInt(ticketId));
    const ticketItemsQueried = convertArrayToObjBasedOnKey(items, "name");

    setCustomer(customerFullName);
    setInitialCustomer(customerFullName);
    setDeliveryDate(new Date(date));
    setInitialDeliveryDate(new Date(date));
    setTicketItems(ticketItemsQueried);
    setInitialTicketItems(ticketItemsQueried);
    setInitialLoading(false);
  }, [
    newMode,
    customer,
    ticketId,
    setCustomer,
    setInitialCustomer,
    setDeliveryDate,
    setInitialDeliveryDate,
    setTicketItems,
    setInitialTicketItems,
  ]);

  async function handleSave() {
    // Logic that will edit item in DB
    // Loading Animation
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Success
      const type = newMode ? "creado" : "editado";
      toast.success(`Ticket ${type} con éxito`);
      navigate("/tickets");
    }, 1000);
  }

  function handleDelete() {
    // Logic for deleting in DB
    // Loading Animation
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Success
      toast.success("Ticket eliminado con éxito");
      navigate("/tickets");
    }, 1000);
  }

  if (!newMode && initialLoading) return <Loading open={true} />;
  return (
    <>
      <SlidingWindow
        previousPage={prevPath}
        headerText={newMode ? "Nuevo Ticket" : "Editar Ticket"}
      >
        <Form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <FieldWrapper>
            <Label htmlFor="customerName">Nombre del Cliente</Label>
            <TagWithIcon
              as={NavLink}
              id="customerName"
              to="customer"
              selected={customer}
              icon={<HiOutlineUserCircle />}
              iconWidth="1.8rem"
              iconHeight="1.8rem"
              iconStrokeWidth="1.4"
              iconStrokeWidthSelected="1.6"
            >
              {customer || "Nombre"}
            </TagWithIcon>
          </FieldWrapper>

          <FieldWrapper>
            <Label htmlFor="date">Fecha Entrega</Label>
            <ButtonWithIcon
              id="date"
              width="100%"
              placeholder={formattedDeliveryDate}
              padding="1rem 1rem"
              paddingLeft="3.8rem"
              icon={<HiOutlineCalendarDays />}
              onClick={() => {
                setOpenModal("calendar");
              }}
            >
              <FilterButtonContent>
                <span>{formattedDeliveryDate || "Fecha"}</span>
                {dateShortcut && (
                  <>
                    <DateShortcut
                      $danger={daysLeft <= 0 && daysLeft >= -TICKET_DANGER_DAYS}
                    >
                      {dateShortcut}
                    </DateShortcut>
                  </>
                )}
              </FilterButtonContent>
            </ButtonWithIcon>
          </FieldWrapper>

          <FieldWrapper>
            <Label htmlFor="item">Productos</Label>
            {Object.keys(ticketItems).length === 0 ? (
              <TagWithIcon
                as={NavLink}
                id="item"
                to="items"
                icon={<LuCroissant />}
                iconStrokeWidth="1.2"
                iconStrokeWidthSelected="1.6"
              >
                Productos
              </TagWithIcon>
            ) : (
              <ItemsSummary items={ticketItems} setItems={setTicketItems} />
            )}
          </FieldWrapper>

          {newMode && (
            <AcceptButton
              marginTop="3rem"
              disabled={
                Object.keys(ticketItems).length === 0 ||
                !customer ||
                !formattedDeliveryDate
              }
              onClick={() => {
                navigate("checkout");
              }}
            >
              Checkout
            </AcceptButton>
          )}

          {!newMode && (
            <ButtonsWrapper>
              <AcceptButton
                marginTop="0"
                height="100%"
                disabled={
                  customer === "" ||
                  formattedDeliveryDate === undefined ||
                  Object.keys(ticketItems).length === 0 ||
                  (customer === initialCustomer &&
                    formattedDeliveryDate === initialFormattedDeliveryDate &&
                    isEqualObjs(initialTicketItems, ticketItems, [
                      "img",
                      "activeDecrease",
                    ]))
                }
                onClick={handleSave}
              >
                Guardar Cambios
              </AcceptButton>
              {!newMode && (
                <AcceptButton
                  marginTop="0"
                  backgroundColor="var(--color-red-1000)"
                  onClick={() => setDeleteModal(true)}
                >
                  Borrar Ticket
                </AcceptButton>
              )}
            </ButtonsWrapper>
          )}
        </Form>
      </SlidingWindow>

      {openModal !== "" && (
        <Modal setOpenModal={setOpenModal} title={MODAL_TITLES[openModal]}>
          {openModal === "calendar" && (
            <CalendarDeliveryDate setOpenModal={setOpenModal} />
          )}
        </Modal>
      )}

      <Loading open={loading} />
      <DeleteModal
        open={deleteModal}
        setOpen={setDeleteModal}
        message={
          <div>
            ¿Seguro que deseas eliminar el <span>ticket</span>?
          </div>
        }
        handleDelete={handleDelete}
      />
    </>
  );
}

export default NewTicket;
