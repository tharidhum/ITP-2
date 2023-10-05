import { Accordion, Box, Button, Group, ScrollArea, Select, Text, TextInput } from "@mantine/core"
import { showNotification, updateNotification } from "@mantine/notifications";
import FAQAPI from "../../API/faq.api";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";


export const ManageFAQ = () => {

    //use react query and fetch FAQ data
    const {
        data = [],
        isLoading,
        isError,
        refetch,
    } = useQuery(
        ["faqData"],
        () => {
            return FAQAPI.getAllFAQ().then((res) => res.data);
        },
        { initialData: [] }
    );

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
                refetch();

            })
    };

    //delete faq
    const deleteFAQ = (_id : string) => {
        FAQAPI.deleteFAQ(_id)
            .then((res) => {
                showNotification({
                    title: `FAQ was deleted`,
                    message: "FAQ was deleted successfully",
                    autoClose: 1500,
                    icon: <IconCheck />,
                    color: "teal",
                });

                // after successing the deletion refetch the data from the database
                refetch();

            })
            .catch((err) => {
                showNotification({
                    title: `FAQ was not deleted`,
                    message: "FAQ was not deleted",
                    autoClose: 1500,
                    icon: <IconX />,
                    color: "red",
                });
            });
    }

    return (
        <>
            <form onSubmit={addForm.onSubmit((values) => addFAQ(values))}>
                <div style={{ border: "2px solid black", width: "100%", height: "40vh", padding: "10px", marginTop: '50px' }}>
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
                <ScrollArea h={200} >
                    {data.map((faqItem: any) => (
                        <Accordion variant="separated" mt={10} transitionDuration={500} key={faqItem.question}>
                            <Accordion.Item value={faqItem.question}>
                                <Accordion.Control>
                                    <Group spacing={"xs"}>
                                        <Text size={15} weight={"bold"}>{`${faqItem.question}`}</Text>
                                        <Text color="dimmed" size={15}>{`( ${faqItem.category} )`}</Text>

                                        {/* button edit */}
                                        <Button color="red" radius="xl" size="xs">
                                            Edit
                                        </Button>
                                        
                                        {/* button delete */}
                                        <Button color="red" radius="xl" size="xs"
                                            onClick={() => deleteFAQ(faqItem._id)}
                                        >
                                            Delete
                                        </Button>
                                    </Group>
                                </Accordion.Control>
                                <Accordion.Panel>
                                    <Text size={15}>{faqItem.answer}</Text>
                                </Accordion.Panel>
                            </Accordion.Item>
                        </Accordion>
                    ))}
                </ScrollArea>
            </Box>
        </>
    )
}