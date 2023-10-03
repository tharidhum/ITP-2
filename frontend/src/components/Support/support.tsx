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
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

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
    title: "How Do I contact customer support for technical issues?",
    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
    cetergory: "General",
  },
  {
    title: "How can I reset my password if I forget it?",
    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
    cetergory: "Account And Security",
  },
  {
    title: "What are your delivery options and costs ?",
    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
    cetergory: "Delivery",
  },
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
  // generate collapsed
  const collapsed = faq.map((item, index) => (
    <Accordion variant="separated" mt={10} transitionDuration={500}>
      <Accordion.Item value={item.title}>
        <Accordion.Control>
          <Group spacing={"xs"}>
            <Text size={15} weight={"bold"}>{`${item.title}`}</Text>
            <Text color="dimmed" size={15}>{`( ${item.cetergory} )`}</Text>
          </Group>
        </Accordion.Control>
        <Accordion.Panel>{<Text size={15}>{item.description}</Text>}</Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  ));
  return (
    <>
      {/* path showing top of the page */}
      <Breadcrumbs mt={"lg"} mb={"xl"}>
        {items}
      </Breadcrumbs>

      {/* FAQ BOX */}
      <Box
        style={{ border: "1px solid black", width: "100%", height: "60vh" }}
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
        <ScrollArea h={290} >{collapsed}</ScrollArea>
      </Box>

      {/* Buttons */}
      <Group position="center" spacing={80} mt={20}>
        <Button style={{backgroundColor : "#ffbb38",border : "1px solid black"}} radius={30} size="sm" px={30}>Raise a ticket</Button>
        <Button style={{backgroundColor : "#ffbb38",border : "1px solid black"}} radius={30} size="sm" px={20}>Rate our Service</Button>
      </Group>
    </>
  );
};

export default Support;
