import { Accordion, Box, Button, Group, ScrollArea, Select, Text, TextInput } from "@mantine/core"
import { showNotification, updateNotification } from "@mantine/notifications";
import FAQAPI from "../../API/faq.api";
import { IconCheck } from "@tabler/icons-react";
import { useForm } from "@mantine/form";


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


export const ManageFAQ = () => {

    //declare add form
    const addForm = useForm({
        validateInputOnChange: true,
        initialValues: {
            question: "",
            category: "",
            answer: "",
        },
    });

    //add function
    const addFAQ = async (values: {
        question: string;
        category: string;
        answer: string;
    }) => {
        showNotification({
            id: "add-FAQ",
            loading: true,
            title: "Adding FAQ",
            message: "Please wait while we add FAQ..",
            autoClose: false,
        });
        FAQAPI.addFAQ(values)
            .then((response) => {
                updateNotification({
                    id: "add-FAQ",
                    color: "teal",
                    icon: <IconCheck />,
                    title: "FAQ added successfully",
                    message: "FAQ data added successfully.",
                    //icon: <IconCheck />,
                    autoClose: 5000,
                });
                addForm.reset();

            })

    }


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
            <form onSubmit={addForm.onSubmit((values) => addFAQ(values))}>
                <div style={{ border: "2px solid black", width: "100%", height: "40vh", padding: "10px", marginTop: '100px' }}>
                    <Text fw={700} style={{ textAlign: "center" }}>Enter NEW FAQ</Text>
                    <TextInput
                        placeholder="Enter Question"
                        label="Question"
                        {...addForm.getInputProps("question")}
                        radius="lg"
                        withAsterisk
                        required
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
                        {...addForm.getInputProps("category")}
                        searchable
                        dropdownPosition="bottom"
                        size="xs"
                        radius="lg"
                        placeholder="STAKEHOLDER TYPE"
                        label="Category"
                        required
                    />
                    <TextInput
                        placeholder="Enter Answer"
                        label="Answer"
                        {...addForm.getInputProps("answer")}
                        radius="lg"
                        withAsterisk
                        required
                    />

                    <Button color="yellow" radius="lg" type="submit"
                        style={{ marginLeft: "425px", marginTop: '10px' }}
                    >
                        Submit
                    </Button>

                </div>
            </form>
            <Box
                style={{ border: "2px solid black", width: "100%", height: "40vh", padding: "10px", marginTop: '50px', marginBottom: '50px' }}
            >
                <Box style={{ backgroundColor: "#f1f1f1", padding: 20 }}>
                    <Text fw={700} style={{ textAlign: "center" }}>Existing FAQs</Text>
                </Box>
                <ScrollArea h={200} >{collapsed}</ScrollArea>
            </Box>
        </>
    )
}