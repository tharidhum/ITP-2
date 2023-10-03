import {
    Badge,
  Box,
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
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";

const RaisedTicketTable = () => {

    // ticket table tickets filter by status
    const [status,setStatus] = useState('');
    
    const tickets = [
        {
            _id : "adadsdqg123sadatyut11yasdd",
            status : "PENDING",
            ticketId : "#TKS0002",
            Date : "2023/08/28",
            time : "00:05 AM",
            category : "BILLING & PAYMENT",
            subject : "CARD DETAILS NOT TAKING ACTION"
        },
        {
            _id : "adadsdqadadaadasdjkhag12311yasdd",
            status : "COMPLETE",
            ticketId : "#TKS0002",
            Date : "2023/08/30",
            time : "00:05 AM",
            category : "BILLING & PAYMENT",
            subject : "CARD DETAILS NOT TAKING ACTION"
        },
        {
            _id : "adadsdqbvvcbcaadaddadasdag12311yasdd",
            status : "COMPLETE",
            ticketId : "#TKS0002",
            Date : "2023/08/30",
            time : "00:05 AM",
            category : "BILLING & PAYMENT",
            subject : "CARD DETAILS NOT TAKING ACTION"
        },        {
            _id : "adadsdqadadzczasddfsag12311yasdd",
            status : "PENDING",
            ticketId : "#TKS0002",
            Date : "2023/08/30",
            time : "00:05 AM",
            category : "BILLING & PAYMENT",
            subject : "CARD DETAILS NOT TAKING ACTION"
        },
        {
            _id : "adadssadczdqadadasdasfsdg12311yasdd",
            status : "COMPLETE",
            ticketId : "#TKS0002",
            Date : "2023/08/30",
            time : "00:05 AM",
            category : "BILLING & PAYMENT",
            subject : "CARD DETAILS NOT TAKING ACTION"
        }
    ]

  // generate tickets table body
  const rows = tickets.map((ticket) =>(
      <tr key={ticket._id} >
        <td>{<Badge color={ticket.status === 'COMPLETE' ? "teal" : "orange"} variant="light" >{ticket.status}</Badge>}</td>
        <td>{ticket.ticketId}</td>
        <td>{ticket.Date}</td>
        <td>{ticket.time}</td>
        <td>{ticket.category}</td>
        <td>{ticket.subject}</td>
      </tr>

  ));

  const pendingTickets = tickets.map((ticket) =>{
    if(ticket.status === 'PENDING'){
        return(
            <tr key={ticket._id} >
            <td>{<Badge color={"orange"} variant="light" >{ticket.status}</Badge>}</td>
            <td>{ticket.ticketId}</td>
            <td>{ticket.Date}</td>
            <td>{ticket.time}</td>
            <td>{ticket.category}</td>
            <td>{ticket.subject}</td>
          </tr>
        )
    }
  });

  const completeTickets =  tickets.map((ticket) =>{
    if(ticket.status === 'COMPLETE'){
        return(
            <tr key={ticket._id} >
            <td>{<Badge color={"teal"} variant="light" >{ticket.status}</Badge>}</td>
            <td>{ticket.ticketId}</td>
            <td>{ticket.Date}</td>
            <td>{ticket.time}</td>
            <td>{ticket.category}</td>
            <td>{ticket.subject}</td>
          </tr>
        )
    }
  });

  return (
    <>
      <Box
        style={{
          border: "2px solid black",
          width: "100%",
          height: "60vh",
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
                    {label : "ALL",value:"ALL"},
                  { label: "PENDING", value: "PENDING" },
                  { label: "COMPLETE", value: "COMPLETE" },
                ]}
                placeholder="Ticket Status"
                size="xs"
                defaultChecked
                onChange={(e)=> setStatus(e!!)}
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
        <ScrollArea mt={10} h={240} w={"100%"}>
          <Table horizontalSpacing={30} highlightOnHover>
            <thead>
              <tr style={{backgroundColor : "#f1f1f1"}}>
                <th>TICKET STATUS</th>
                <th>TICKET ID</th>
                <th>DATE</th>
                <th>TIME</th>
                <th>CATEGORY</th>
                <th>ISSUE SUBJECT</th>
              </tr>
            </thead>
            <tbody>{status === 'COMPLETE'? completeTickets : status === 'PENDING' ? pendingTickets : rows}</tbody>
          </Table>
        </ScrollArea>
      </Box>
    </>
  );
};

export default RaisedTicketTable;
