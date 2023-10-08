import { Accordion, Box, Button, Center, Group, Modal, ScrollArea, Select, Text, TextInput,Textarea } from "@mantine/core"
import { showNotification, updateNotification } from "@mantine/notifications";
import FAQAPI from "../../API/faq.api";
import { IconCheck, IconTicketOff, IconX } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";


export const ManageFAQ = () => {
    const [editOpened, setEditOpened] = useState(false);


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

    //declare edit form
    const editForm = useForm({
        validateInputOnChange: true,
        initialValues: {
            _id: "",
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
    const deleteFAQ = (_id: string) => {
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

    //update Item  function
    const updateFAQ = async (values: {
        _id: string;
        question: string;
        category: string;
        answer: string;
    }) => {
        showNotification({
            id: "update-FAQ",
            loading: true,
            title: "Updating FAQ record",
            message: "Please wait while we update FAQ record..",
            autoClose: false,
        });
        FAQAPI.updateFAQ(values)
            .then((response) => {
                updateNotification({
                    id: "update-FAQ",
                    color: "teal",
                    icon: <IconCheck />,
                    title: "FAQ updated successfully",
                    message: "FAQ data updated successfully.",
                    //icon: <IconCheck />,
                    autoClose: 5000,
                });
                editForm.reset();
                setEditOpened(false);

                //getting updated items from database
                refetch();
            })
            .catch((error) => {
                updateNotification({
                    id: "update-FAQ",
                    color: "red",
                    title: "FAQ updatimg failed",
                    icon: <IconX />,
                    message: "We were unable to update the FAQ",
                    // icon: <IconAlertTriangle />,
                    autoClose: 5000,
                });
            });
    };

    return (
        <>
            {/* faq edit model */}
            <Modal
                opened={editOpened}
                onClose={() => {
                    editForm.reset();
                    setEditOpened(false);
                }}
                title="Update FAQ Records"
            >
                <form onSubmit={editForm.onSubmit((values) => updateFAQ(values))}>
                    <TextInput
                        placeholder="Enter Question"
                        label="Question"
                        {...editForm.getInputProps("question")}
                        radius="lg"
                        withAsterisk
                        required
                    />
                    <Select
                        data={[
                            { label: "GENERAL", value: "GENERAL" },
                            {
                                label: "ACCOUNT AND SECURITY",
                                value: "ACCOUNT AND SECURITY",
                            },
                            { label: "DELIVERY", value: "DELIVERY" },
                            { label: "ORDER AND SHOPPING", value: "ORDER AND SHOPPING" },
                            { label: "PRODUCT AND INVENTORY", value: "PRODUCT AND INVENTORY" },


                        ]}
                        {...editForm.getInputProps("category")}
                        searchable
                        dropdownPosition="bottom"
                        size="xs"
                        radius="lg"
                        placeholder="STAKEHOLDER TYPE"
                        label="CATEGORY"
                        required
                    />
                    <TextInput
                        placeholder="Enter Answer"
                        label="Answer"
                        {...editForm.getInputProps("answer")}
                        radius="lg"
                        withAsterisk
                        required
                    />

                    <Button color="yellow" radius="lg" type="submit"
                        style={{ marginLeft: "170px", marginTop: '10px' }}
                    >
                        Save
                    </Button>
                </form>
            </Modal>

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
                            { label: "GENERAL", value: "GENERAL" },
                            {
                                label: "ACCOUNT AND SECURITY",
                                value: "ACCOUNT AND SECURITY",
                            },
                            { label: "DELIVERY", value: "DELIVERY" },
                            { label: "ORDER AND SHOPPING", value: "ORDER AND SHOPPING" },
                            { label: "PRODUCT AND INVENTORY", value: "PRODUCT AND INVENTORY" },


                        ]}
                        {...addForm.getInputProps("category")}
                        searchable
                        dropdownPosition="bottom"
                        size="xs"
                        radius="lg"
                        placeholder="STAKEHOLDER TYPE"
                        label="CATEGORY"
                        required
                    />
                    <Textarea
                        placeholder="Enter Answer"
                        label="Answer"
                        maxRows={4}
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
                <ScrollArea h={200}>
                    {data.length === 0 ? ( // Check if data array is empty
                        <div style={{ textAlign: "center", padding: "20px" }}>
                            <>
                                <Center mt={1}>
                                    <IconTicketOff size={100} color="gray" opacity={0.2} />
                                </Center>
                                <Text align="center" weight={"bold"} size={30} pb={70}>
                                    NO FAQs yet!
                                </Text>
                            </>
                        </div>
                    ) : (
                        data.map((faqItem: any) => (
                            <Accordion variant="separated" mt={10} transitionDuration={500} key={faqItem.question}>
                                <Accordion.Item value={faqItem.question}>
                                    <Accordion.Control>
                                        <Group spacing={"xs"}>
                                            <Text size={15} weight={"bold"}>{`${faqItem.question}`}</Text>
                                            <Text color="dimmed" size={15}>{`( ${faqItem.category} )`}</Text>

                                            {/* button edit */}
                                            <Button color="red" radius="xl" size="xs"
                                                onClick={() => {
                                                    editForm.setValues({
                                                        _id: faqItem._id,
                                                        question: faqItem.question,
                                                        category: faqItem.category,
                                                        answer: faqItem.answer,
                                                    });
                                                    setEditOpened(true);
                                                }}
                                            >
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
                        ))
                    )}
                </ScrollArea>
            </Box>

        </>
    )
}