import {
  Badge,
  Box,
  Center,
  Divider,
  Group,
  Modal,
  ScrollArea,
  Select,
  Table,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { IconSearch, IconTicketOff } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import TicketAPI from "../../API/tickets";
import { DateInput } from "@mantine/dates";

const RaisedTicketTable = () => {
  // get user details from the localstorage
  const user = JSON.parse(localStorage.getItem("user")!!);

  // ticket table tickets filter by status
  const [status, setStatus] = useState("ALL");

  // user react query to fetch the the raised ticket data
  const {
    error,
    isLoading,
    data = [],
  } = useQuery(["raisedTickets"], () =>
    TicketAPI.getAllTicketsByUser(user._id).then((res) => res.data)
  );

  // open ticket window
  const [ticketOpened, setTicketOpened] = useState(false);

  // search query state
  const [search, setSearch] = useState("");

  // specific ticket details
  const [ticketInfo, setTicketInfo] = useState({
    ticketId: "",
    date: "",
    time: "",
    category: "",
    subject: "",
    message: "",
    status: "",
    response: "",
  });

  // sort by
  const [dateSort, setDateSort] = useState<Date>();

  // format date
  const generateFormatDate = (dbDate: any) => {
    const sortDate = new Date(dateSort!!).toLocaleDateString("en-CA");
    const ticketDbDate = new Date(dbDate).toLocaleDateString("en-CA");

    return sortDate === ticketDbDate;
  };

  // generate tickets table body
  const rows =
    data.length > 0 ? (
      data.map((ticket: any) => {
        if (
          ((search.length === 0  && status.toLowerCase() === "all"))||
          (search.length > 0  && ticket.ticketId.toLowerCase().includes(search.toLowerCase())) ||
          (search.length > 0 && ticket.category.toLowerCase().includes(search.toLowerCase())) ||
          (search.length === 0 && ticket.status.toLowerCase() === status.toLowerCase())

        ) {
          return (
            <tr
              key={ticket._id}
              onClick={() => {
                setTicketInfo({
                  ticketId: ticket.ticketId,
                  date: new Date(ticket.date).toLocaleDateString("en-CA"),
                  time: ticket.time,
                  category: ticket.category,
                  subject: ticket.subject,
                  message: ticket.message,
                  status: ticket.status,
                  response: ticket.response,
                });

                // open ticket modal
                setTicketOpened(true);
              }}
              style={{ cursor: "pointer" }}
            >
              <td>
                {
                  <Badge
                    color={ticket.status === "COMPLETE" ? "teal" : "orange"}
                    variant="light"
                  >
                    {ticket.status}
                  </Badge>
                }
              </td>
              <td>{ticket.ticketId}</td>
              <td>{new Date(ticket.date).toLocaleDateString("en-CA")}</td>
              <td>{ticket.time}</td>
              <td>{ticket.category}</td>
              <td>{ticket.subject}</td>
            </tr>
          );
        }
      })
    ) : (
      <tr>
        <td colSpan={6}>
          <>
            <Center mt={60}>
              <IconTicketOff size={100} color="gray" opacity={0.2} />
            </Center>
            <Text align="center" weight={"bold"} size={30} pb={70}>
              You haven't raised ticket yet!
            </Text>
          </>
        </td>
      </tr>
    );

    const sortByDate =
    data.length > 0 ? (
      data.map((ticket: any) => {
      
        if (
          ((dateSort !== null || dateSort !== undefined) && generateFormatDate(ticket.date))
        ) {
          return (
            <tr
              key={ticket._id}
              onClick={() => {
                setTicketInfo({
                  ticketId: ticket.ticketId,
                  date: new Date(ticket.date).toLocaleDateString("en-CA"),
                  time: ticket.time,
                  category: ticket.category,
                  subject: ticket.subject,
                  message: ticket.message,
                  status: ticket.status,
                  response: ticket.response,
                });

                // open ticket modal
                setTicketOpened(true);
              }}
              style={{ cursor: "pointer" }}
            >
              <td>
                {
                  <Badge
                    color={ticket.status === "COMPLETE" ? "teal" : "orange"}
                    variant="light"
                  >
                    {ticket.status}
                  </Badge>
                }
              </td>
              <td>{ticket.ticketId}</td>
              <td>{new Date(ticket.date).toLocaleDateString("en-CA")}</td>
              <td>{ticket.time}</td>
              <td>{ticket.category}</td>
              <td>{ticket.subject}</td>
            </tr>
          );
        }
      })
    ) : (
      <tr>
        <td colSpan={6}>
          <>
            <Center mt={60}>
              <IconTicketOff size={100} color="gray" opacity={0.2} />
            </Center>
            <Text align="center" weight={"bold"} size={30} pb={70}>
              You haven't raised ticket yet!
            </Text>
          </>
        </td>
      </tr>
    );
  return (
    <>
      {/* Ticket Modal */}
      <Modal
        opened={ticketOpened}
        onClose={() => setTicketOpened(false)}
        size={"50%"}
      >
        <Modal.Header>
          <Text weight={"bold"} size={30}>
            Ticket Details
          </Text>
          <Badge
            size="lg"
            color={ticketInfo.status === "COMPLETE" ? "teal" : "orange"}
          >
            {ticketInfo.status === "COMPLETE" ? "COMPLETE" : "PENDING"}
          </Badge>
        </Modal.Header>

        <Modal.Body>
          <TextInput
            mb={10}
            label={"Ticket ID"}
            readOnly
            value={ticketInfo.ticketId}
          />
          <TextInput
            mt={20}
            mb={10}
            label={"Raised date and Time"}
            readOnly
            value={`${ticketInfo.date}  ${ticketInfo.time}`}
          />
          <TextInput
            mt={20}
            mb={10}
            label={"Category"}
            readOnly
            value={ticketInfo.category}
          />
          <TextInput
            mt={20}
            mb={10}
            label={"Subject"}
            readOnly
            value={ticketInfo.subject}
          />
          <Textarea
            mt={20}
            mb={10}
            minRows={2}
            maxRows={5}
            label={"Message"}
            readOnly
            value={ticketInfo.message}
          />
          {/* Admin response */}
          <Divider mb={-10} mt={30} />
          <Textarea
            mt={20}
            mb={10}
            minRows={2}
            maxRows={5}
            label={"Response"}
            readOnly
            value={ticketInfo.response}
            placeholder={
              "Here will be display admin response for the ticket. If you see this message, That means admin have not replied to your message yet!"
            }
          />
        </Modal.Body>
      </Modal>
      <Box
        style={{
          border: "2px solid black",
          width: "100%",
          height: "500px",
          marginTop: 30,
          marginBottom: 30,
        }}
        py={10}
        px={20}
      >
        <Box
          style={{
            backgroundColor: "#f1f1f1",
            paddingTop: 20,
            paddingBottom: 20,
            paddingLeft: 10,
            paddingRight: 10,
          }}
        >
          {/* Table header */}
          <Title align="center" order={1} mt={5} mb={20}>
            My Tickets
          </Title>

          <Group grow position="apart">
            <Group spacing={"md"} ml={20}>
              {" "}
              {/* Search bar */}
              <TextInput
                icon={<IconSearch size={15} />}
                radius={30}
                size="xs"
                placeholder="Search..."
                onChange={(e) => setSearch(e.target.value)}
              />
              {/* Raised ticket table */}
              <Select
                data={[
                  { label: "ALL", value: "ALL" },
                  { label: "PENDING", value: "PENDING" },
                  { label: "COMPLETE", value: "COMPLETE" },
                ]}
                placeholder="Ticket Status"
                size="xs"
                value={status}
                onChange={(e) => setStatus(e!!)}
              />
            </Group>
            <Group position="right">
              <Text size={15}>Sort By:</Text>
              <DateInput
                clearable
                placeholder="Raised Date"
                valueFormat="YYYY MM DD"
                size="xs"
                onChange={(e) => setDateSort(e!!)}
              />
            </Group>
          </Group>
        </Box>

        {/* Ticket Table */}
        <ScrollArea mt={10} h={330} w={"100%"}>
          <Table horizontalSpacing={30} highlightOnHover>
            <thead>
              <tr style={{ backgroundColor: "#f1f1f1" }}>
                <th>TICKET STATUS</th>
                <th>TICKET ID</th>
                <th>DATE</th>
                <th>TIME</th>
                <th>CATEGORY</th>
                <th>ISSUE SUBJECT</th>
              </tr>
            </thead>
            <tbody>{dateSort ? sortByDate : rows}</tbody>
          </Table>
        </ScrollArea>
      </Box>
    </>
  );
};

export default RaisedTicketTable;
