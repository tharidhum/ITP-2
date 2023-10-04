import {
  Badge,
  Box,
  Center,
  Container,
  Group,
  Modal,
  ScrollArea,
  Select,
  Space,
  Table,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { IconSearch, IconTicketOff } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import TicketAPI from "../../API/tickets";

const RaisedTicketTable = () => {
  // get user details from the localstorage
  const user = JSON.parse(localStorage.getItem("user")!!);

  // ticket table tickets filter by status
  const [status, setStatus] = useState("");

  // user react query to fetch the the raised ticket data
  const {
    error,
    isLoading,
    data = [],
  } = useQuery(["raisedTickets"], () =>
    TicketAPI.getAllTicketsByUser(user._id).then((res) => res.data)
  );

  // generate tickets table body
  const rows =
    data.length > 0 ? (
      data.map((ticket: any) => (
        <tr key={ticket._id}>
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
      ))
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

  // filtering pending tickets only
  const pendingTickets =
    data.length > 0 ? (
      data.map((ticket: any) => {
        if (ticket.status === "PENDING") {
          return (
            <tr key={ticket._id}>
              <td>
                {
                  <Badge color={"orange"} variant="light">
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

  // filtering successing tickets only
  const completeTickets =
    data.length > 0 ? (
      data.map((ticket: any) => {
        if (ticket.status === "COMPLETE") {
          return (
            <tr key={ticket._id}>
              <td>
                {
                  <Badge color={"teal"} variant="light">
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
                defaultChecked
                onChange={(e) => setStatus(e!!)}
              />
            </Group>
            <Group position="right">
              <Text size={15}>Sort By:</Text>
              <Select
                data={[
                  { label: "TIME", value: "TIME" },
                  { label: "DATE", value: "DATE" },
                ]}
                placeholder="Raised Date"
                size="xs"
                value={status}
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
            <tbody>
              {status === "COMPLETE"
                ? completeTickets
                : status === "PENDING"
                ? pendingTickets
                : rows}
            </tbody>
          </Table>
        </ScrollArea>
      </Box>
    </>
  );
};

export default RaisedTicketTable;
