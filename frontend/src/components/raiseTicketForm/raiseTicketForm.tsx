import {
  Anchor,
  Box,
  Breadcrumbs,
  Group,
  Select,
  Text,
  TextInput,
  Title,
  Textarea,
  Button,
} from "@mantine/core";
import UserHeader from "../userHeader/userHeader";
import { useEditor } from "@tiptap/react";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import TicketAPI from "../../API/tickets";
import { showNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const RaiseTicketForm = () => {
  // get loged in user details
  const user = JSON.parse(localStorage.getItem("user")!!);

  // breadcrumbs items
  const items = [
    { title: "Home", href: "#" },
    { title: "Support Service", href: "/user/support" },
    { title: "Raise A Ticket", href: "#" },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  // initialize navigate hook

  const navigate = useNavigate();

  //   useEffect use to fetch next Form Id
  useEffect(() => {
    const getNextTicketId = async () => {
      TicketAPI.generateNextTicketId()
        .then((res) => {
          ticketSubmitForm.setFieldValue("ticketId", res.data.ticketId);
        })
        .catch((error) => {
          showNotification({
            title: "Refresh the page",
            message: "There is an error while generating ticket Id",
            autoClose: 2000,
            color: "red",
            icon: <IconX />,
          });
        });
    };

    getNextTicketId();
  }, []);
  //   ticket submit form
  const ticketSubmitForm = useForm({
    validateInputOnBlur: true,

    initialValues: {
      ticketId: "",
      date: new Date().toLocaleDateString("en-CA"),
      issueId: "",
      subject: "",
      message: "",
      category: "",
      stakeHolder : ""
    },
  });

  //   handles the raising ticket
  const handleRaiseTickets = (values: {
    ticketId: string;
    date: string;
    issueId: string;
    subject: string;
    message: string;
    category: string;
    stakeHolder : string;
  }) => {
    TicketAPI.raiseTicket({ ...values, userId: user._id })
      .then((res) => {
        showNotification({
          title: "Ticket was submitted!",
          message: "your ticket was submitted!",
          color: "teal",
          icon: <IconCheck />,
          autoClose: 1500,
        });

        // refresh and redirect to the support screen after 1600 ms
        setTimeout(() => {
          // refresh the page and go to the Support page
          navigate(0);
        }, 1000);
      })
      .catch((error) => {
        showNotification({
          title: "Ticket was not raised",
          message: "There is an error while submitting your ticket.",
          autoClose: 2000,
          color: "red",
          icon: <IconX />,
        });
      });
  };
  return (
    <>
      {/* breadCrumbs */}
      <Breadcrumbs mt={20} mb={20}>
        {items}
      </Breadcrumbs>
      <Title align="center" order={2} mb={20}>
        Raise a Ticket
      </Title>
      {/* Ticket form */}
      <Box
        style={{ border: "2px solid black", width: "100%", marginBottom: 30 }}
        p={30}
      >
        <form
          onSubmit={ticketSubmitForm.onSubmit((values) =>
            handleRaiseTickets(values)
          )}
        >
          <Group spacing={80} mb={40}>
            <Group spacing={"xs"}>
              <Text>Ticket ID:</Text>
              <TextInput
                ml={73}
                readOnly
                required
                {...ticketSubmitForm.getInputProps("ticketId")}
              />
            </Group>
            <Group spacing={"xs"}>
              <Text>Date: </Text>
              <TextInput
                type="Date"
                readOnly
                required
                {...ticketSubmitForm.getInputProps("date")}
              />
            </Group>
          </Group>

          <Group spacing={"xs"} mb={20}>
            <Text>Issue Category :</Text>
            <Select
              size="sm"
              placeholder="Select category"
              data={[
                { label: "General", value: "General" },
                {
                  label: "Account And Security",
                  value: "Account And Security",
                },
                { label: "Delivery", value: "Delivery" },
                {
                  label: "Order and Shipping",
                  value: "Order and Shipping",
                },
                {
                  label: "Products and inventory",
                  value: "Products and inventory",
                },
              ]}
              ml={27}
              
              required
              {...ticketSubmitForm.getInputProps("category")}
            />
          </Group>

          <Group spacing={"xs"} mb={20}>
            <Text>Issue Related ID : </Text>
            <TextInput
              placeholder="ex:ProductID, OrderID"
              ml={19}
              w={208}
              {...ticketSubmitForm.getInputProps("issueId")}
            />
          </Group>

          <Group spacing={"xs"}  mb={30}>
            <Text>Stakeholder type :</Text>
            <Select
              size="sm"
              placeholder="Select category"
              data={[
                { label: "Seller", value: "SELLER" },
                {
                  label: "Buyer",
                  value: "BUYER",
                },
                { label: "Artisan", value: "ARTISAN" },
              ]}
              ml={13}
              required
              {...ticketSubmitForm.getInputProps("stakeHolder")}
            />
          </Group>

          <Group spacing={"xs"} mb={10}>
            <Text>Subject : </Text>
            <TextInput
              ml={80}
              w={"80%"}
              placeholder="Enter a breif topic related to your issue"
              required
              {...ticketSubmitForm.getInputProps("subject")}
            />
          </Group>

          <Group spacing={"xs"}>
            <Text>Message : </Text>
            <Textarea
              placeholder="Enter a detailed message related to your issue"
              maxRows={8}
              minRows={5}
              w={"80%"}
              ml={68}
              required
              {...ticketSubmitForm.getInputProps("message")}
            />
          </Group>

          {/* Add attachments comming to here */}

          <Group position="center">
            <Button
              type="submit"
              radius={30}
              mt={20}
              pl={20}
              pr={20}
              style={{ backgroundColor: "#ffbb38" }}
            >
              Submit Ticket
            </Button>
            <Button
              type="reset"
              radius={30}
              mt={20}
              pl={20}
              pr={20}
              style={{ backgroundColor: "#ff8282" }}
            >
              Reset
            </Button>
          </Group>
        </form>
      </Box>
    </>
  );
};

export default RaiseTicketForm;
