import {
  Breadcrumbs,
  Anchor,
  Box,
  ScrollArea,
  Center,
  Text,
  TextInput,
  Group,
  Stack,
  Select,
  Title,
  Space,
  Accordion,
  Button,
  Modal,
  Rating,
  Textarea,
} from "@mantine/core";
import { IconCheck, IconSearch, IconX } from "@tabler/icons-react";
import RaisedTicketTable from "../TicketTable/raisedTicketTable";
import { useState } from "react";
import { useForm } from "@mantine/form";
import axios from "axios";
import RatingAPI from "../../API/ratings";
import { showNotification, updateNotification } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import RaiseTicketForm from "../raiseTicketForm/raiseTicketForm";

const items = [
  { title: "Home", href: "#" },
  { title: "Support services", href: "#" },
].map((item, index) => (
  <Anchor href={item.href} key={index}>
    {item.title}
  </Anchor>
));

const faq = [

  {
    title: "Can I cancel or change my order after It's been placed ?",
    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
    cetergory: "Order and shopping",
  },
  {
    title: "How do i know if an item is in stock ?",
    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
    cetergory: "Products and inventory",
  },
];
const Support = () => {
  // rate modal opened closed
  const [rateOpened, setRateOpened] = useState(false);

  // user details
  const user = JSON.parse(localStorage.getItem("user")!!);

  // submit ticket form state
  const [ticketForm, setTicketForm] = useState(false);

  // generate collapsed
  const collapsed = faq.map((item, index) => (
    <Accordion
      variant="separated"
      mt={10}
      transitionDuration={500}
      key={item.title}
    >
      <Accordion.Item value={item.title}>
        <Accordion.Control>
          <Group spacing={"xs"}>
            <Text size={15} weight={"bold"}>{`${item.title}`}</Text>
            <Text color="dimmed" size={15}>{`( ${item.cetergory} )`}</Text>
          </Group>
        </Accordion.Control>
        <Accordion.Panel>
          {<Text size={15}>{item.description}</Text>}
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  ));

  // rating submit handle form
  const ratingForm = useForm({
    validateInputOnChange: true,

    initialValues: {
      rate: 0,
      comment: "",
    },
    validate: {
      comment: (value) =>
        value.length < 3
          ? "The comment should have at least 3 characters"
          : null,
    },
  });

  // handle rating submit
  const handleRatingSubmit = (values: { rate: number; comment: string }) => {
    showNotification({
      id: "submit-rate",
      title: "Submitting....",
      message: "We are trying to submit your ratings",
      loading: true,
    });
    // send request to backend
    RatingAPI.submitUserRating({ ...values, userId: user._id })
      .then((res) => {
        updateNotification({
          id: "submit-rate",
          title: "Your rating recorded",
          message: "Thank you for submmitting record form",
          autoClose: 1800,
          color: "teal",
          icon: <IconCheck />,
        });

        // close the rating modal
        setRateOpened(false);

        // reset the rating form
        ratingForm.reset();
      })
      .catch((error) => {
        updateNotification({
          id: "submit-rate",
          title: "Something went wrong",
          message: "There was an error while submitting your ratings",
          autoClose: 1800,
          color: "red",
          icon: <IconX />,
        });
      });
  };

  return (
    <>
      {/* Submit ticket form */}
      {ticketForm === true ? (
        <RaiseTicketForm />
      ) : (
        <>
          {/* path showing top of the page */}
          <Breadcrumbs mt={"lg"} mb={"xl"}>
            {items}
          </Breadcrumbs>

          {/* FAQ BOX */}
          <Box
            style={{
              border: "2px solid black",
              width: "100%",
              height: "500px",
            }}
            py={10}
            px={20}
          >
            <Box style={{ backgroundColor: "#f1f1f1", padding: 20 }}>
              <Group position="center">
                <Stack>
                  <Box
                    style={{
                      backgroundColor: "#ffbb38",
                      border: "1px solid black",
                      borderRadius: "20px",
                      paddingLeft: 1,
                      paddingRight: 1,
                    }}
                  >
                    <Text size={"sm"} align="center">
                      FAQ ! We have Answers ( most of the times ! )
                    </Text>
                  </Box>
                  <Group spacing={"md"}>
                    <TextInput
                      radius={20}
                      icon={<IconSearch size={15} />}
                      placeholder="Search..."
                      size="xs"
                    />
                    <Select
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
                      searchable
                      dropdownPosition="bottom"
                      size="xs"
                      placeholder="Category"
                    />
                  </Group>
                </Stack>
              </Group>
            </Box>
            <ScrollArea h={350}>{collapsed}</ScrollArea>
          </Box>

          {/* Buttons */}
          <Group position="center" spacing={80} mt={20}>
            <Button
              style={{ backgroundColor: "#ffbb38", border: "1px solid black" }}
              radius={30}
              size="sm"
              px={30}
              onClick={() => setTicketForm(true)}
            >
              Raise a ticket
            </Button>
            <Button
              style={{ backgroundColor: "#ffbb38", border: "1px solid black" }}
              radius={30}
              size="sm"
              px={20}
              onClick={() => setRateOpened(true)}
            >
              Rate our Service
            </Button>
          </Group>

          {/* Ticket Details Table */}
          {/* <Box style={{ border: "2px solid black", width: "100%", height: "60vh" }} mt={30}> */}
          <RaisedTicketTable />
          {/* </Box> */}

          {/* user rating modal */}
          {/* Rate Modal */}
          <Modal
            opened={rateOpened}
            onClose={() => setRateOpened(false)}
            radius={20}
          >
            <form
              onSubmit={ratingForm.onSubmit((values) =>
                handleRatingSubmit(values)
              )}
            >
              <Box
                p={20}
                style={{
                  border: "2px solid black",
                  marginBottom: 30,
                  borderRadius: 30,
                }}
              >
                <Text align="center" size={30} weight={"bold"}>
                  Rate Us
                </Text>
                <Center>
                  <Rating
                    size="xl"
                    mt={10}
                    mb={20}
                    {...ratingForm.getInputProps("rate")}
                  />
                </Center>
                <Textarea
                  minRows={3}
                  maxRows={8}
                  placeholder="Enter any comment here..."
                  {...ratingForm.getInputProps("comment")}
                />
                <Center>
                  <Button
                    type="submit"
                    radius={30}
                    mt={20}
                    pl={20}
                    pr={20}
                    style={{ backgroundColor: "#ffbb38" }}
                  >
                    Submit your rate
                  </Button>
                </Center>
              </Box>
            </form>
          </Modal>
        </>
      )}
    </>
  );
};

export default Support;
