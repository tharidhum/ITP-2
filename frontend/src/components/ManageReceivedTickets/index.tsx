import { Badge, Button, Center, Group, Modal, ScrollArea, Select, Table, Text, TextInput, Textarea } from '@mantine/core';
import { IconCheck, IconSearch, IconTicketOff, IconX } from "@tabler/icons-react";
import { useQuery } from '@tanstack/react-query';
import TicketAPI from '../../API/tickets';
import { useState } from 'react';
import { Form, useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';


export function ReceivedTicketsTable() {
  const [ticketOpened, setTicketOpened] = useState(false);


  // specific ticket details
  const [ticketInfo, setTicketInfo] = useState({
    _id: "",
    ticketId: "",
    date: "",
    time: "",
    category: "",
    subject: "",
    message: "",
    status: "",
  });

  //   ticket response submit form
  const ticketResponseSubmitForm = useForm({
    validateInputOnBlur: true,
    initialValues: {
      message: "",

    },
  });

  //get all rised tickets
  const {
    data = [],
    isLoading,
    isError,
    refetch,
  } = useQuery(
    ["ticketsData"],
    () => {
      return TicketAPI.getAllTicketsByAdmin().then((res) => res.data);
    },
    { initialData: [] }
  );

  // Filter PENDING and COMPLETE tickets
  const pendingTickets = data.filter((ticket: any) => ticket.status === "PENDING");
  const completeTickets = data.filter((ticket: any) => ticket.status === "COMPLETE");

  //submit response
  const submitTicketResponse = async (values: {
    _id: string,
    message: string;
  }) => {
    TicketAPI.submitResponse(values)
      .then((res) => {
        showNotification({
          title: "Response was submitted!",
          message: "your Response was submitted!",
          color: "teal",
          icon: <IconCheck />,
          autoClose: 1500,
        });
        // Reset the message box
        ticketResponseSubmitForm.reset();
        refetch()
      })
      .catch((error) => {
        showNotification({
          title: "Response was not raised",
          message: "There is an error while submitting your Response.",
          autoClose: 2000,
          color: "red",
          icon: <IconX />,
        });
      });
  }

  // generate tickets table body for pending tickets
  const pendingRows =
    pendingTickets.length > 0 ? (
      pendingTickets.map((tickets: any) => (
        <tr
          key={tickets._id}
          onClick={() => {
            setTicketInfo({
              _id: tickets._id,
              ticketId: tickets.ticketId,
              date: new Date(tickets.date).toLocaleDateString("en-CA"),
              time: tickets.time,
              category: tickets.category,
              subject: tickets.subject,
              message: tickets.message,
              status: "NEW",
            });

            // open ticket modal
            setTicketOpened(true);
          }}
        >
          <td>
            {
              <Badge
                color={tickets.status === "COMPLETE" ? "teal" : "orange"}
                variant="light"
              >
                {tickets.status}
              </Badge>
            }
          </td>
          <td>{tickets.ticketId}</td>
          <td>{new Date(tickets.date).toLocaleDateString("en-CA")}</td>
          <td>{tickets.time}</td>
          <td>{tickets.category}</td>
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

  //generate table for completed tickets
  const completeRows =
    completeTickets.length > 0 ? (
      completeTickets.map((tickets: any) => (
        <tr
          key={tickets._id}
          >
          <td>
            {
              <Badge
                color={tickets.status === "COMPLETE" ? "teal" : "orange"}
                variant="light"
              >
                {tickets.status}
              </Badge>
            }
          </td>
          <td>{tickets.ticketId}</td>
          <td>{new Date(tickets.date).toLocaleDateString("en-CA")}</td>
          <td>{tickets.time}</td>
          <td>{tickets.category}</td>
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
              You haven't completed ticket yet!
            </Text>
          </>
        </td>
      </tr>
    );


  return (
    <>
      {/* Ticket Modal */}
      <ScrollArea>
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
              color={ticketInfo.status === "COMPLETE" ? "teal" : "red"}
            >
              {ticketInfo.status === "COMPLETE" ? "COMPLETE" : "NEW"}
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
          </Modal.Body>
          <Modal.Body>


            <Text fw={700} style={{ textAlign: "center" }}>WRITE RESPONSE</Text>

            <Group spacing={"xs"}>
              <Text>Message: </Text>
              <Textarea
                placeholder="Enter a detailed message related issue"
                maxRows={8}
                minRows={5}
                w={"80%"}
                ml={68}
                required
                {...ticketResponseSubmitForm.getInputProps("message")}
              />
            </Group>

            <Button
              type="submit"
              radius={30}
              style={{ backgroundColor: "#ffbb38", padding: "10px", marginTop: "10px", marginLeft: "235px" }}
              onClick={() => {
                setTicketOpened(false);
                submitTicketResponse({
                  _id: ticketInfo._id,
                  message: ticketResponseSubmitForm.values.message,
                });
              }}
            >
              Submit Response
            </Button>

          </Modal.Body>
        </Modal>
      </ScrollArea>

      {/* new tickets table */}
      <div style={{ border: "2px solid black", width: "100%", height: "60vh", padding: "10px", marginTop: '50px' }}>
        <Text fw={700} style={{ textAlign: "center" }}>New Received Tickets</Text>

        <Group spacing={"md"}>
          <TextInput
            radius={20}
            icon={<IconSearch size={15} />}
            placeholder="Search..."
            size="xs"
            style={{
              width: '300px', // Increase length
              padding: '10px', // Add margin to the bottom
            }}
          />
          <Select
            data={[
              { label: "Customer", value: "Customer" },
              {
                label: "SUPPLIER",
                value: "SUPPLIER",
              },
              { label: "ARTISAN", value: "ARTISAN" },
            ]}
            searchable
            dropdownPosition="bottom"
            size="xs"
            placeholder="STAKEHOLDER TYPE"
          />

          <Select
            data={[
              { label: "NEW", value: "NEW" },
              {
                label: "OLD",
                value: "OLD",
              },
            ]}
            searchable
            dropdownPosition="bottom"
            size="xs"
            placeholder="TICKET STATUS"
          />

          <Select
            data={[

            ]}
            searchable
            dropdownPosition="bottom"
            size="xs"
            placeholder="Raised Date"
          />
        </Group>
        <ScrollArea h={350}>
          <Table striped highlightOnHover withBorder withColumnBorders>
            <thead>
              <tr>
                <th>TICKET STATUS</th>
                <th>TICKET ID</th>
                <th>DATE</th>
                <th>TIMER</th>
                {/* <th>STAKEHOLDER TYPE</th> */}
                <th>CATEGORY</th>
              </tr>
            </thead>
            <tbody>{pendingRows}</tbody>
          </Table>
        </ScrollArea>
      </div>


      {/* completed ticket table */}
      <div style={{ border: "2px solid black", width: "100%", height: "60vh", padding: "10px", marginTop: '50px', marginBottom: "50px" }}>
        <Text fw={700} style={{ textAlign: "center" }}>Completed Tickets</Text>

        <Group spacing={"md"}>
          <TextInput
            radius={20}
            icon={<IconSearch size={15} />}
            placeholder="Search..."
            size="xs"
            style={{
              width: '300px', // Increase length
              padding: '10px', // Add margin to the bottom
            }}
          />
          <Select
            data={[
              { label: "Customer", value: "Customer" },
              {
                label: "SUPPLIER",
                value: "SUPPLIER",
              },
              { label: "ARTISAN", value: "ARTISAN" },
            ]}
            searchable
            dropdownPosition="bottom"
            size="xs"
            placeholder="STAKEHOLDER TYPE"
          />

          <Select
            data={[
              { label: "NEW", value: "NEW" },
              {
                label: "OLD",
                value: "OLD",
              },
            ]}
            searchable
            dropdownPosition="bottom"
            size="xs"
            placeholder="TICKET STATUS"
          />

          <Select
            data={[

            ]}
            searchable
            dropdownPosition="bottom"
            size="xs"
            placeholder="Raised Date"
          />
        </Group>
        <ScrollArea h={350}>
          <Table striped highlightOnHover withBorder withColumnBorders>
            <thead>
              <tr>
                <th>TICKET STATUS</th>
                <th>TICKET ID</th>
                <th>DATE</th>
                <th>TIMER</th>
                {/* <th>STAKEHOLDER TYPE</th> */}
                <th>CATEGORY</th>
              </tr>
            </thead>
            <tbody>{completeRows}</tbody>
          </Table>
        </ScrollArea>
      </div>
    </>
  );
}