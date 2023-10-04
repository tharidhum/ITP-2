import ManageTicket from "../ManageTicket";
import { createStyles } from '@mantine/styles';
import { Group } from '@mantine/core';
import {
    Container,
    Title,
    Text,
    Button,
    rem,
} from "@mantine/core";
// import LoginPage from "../Login";
import { RefObject, useRef } from "react";
import Footer from "../../components/footer";


const useStyles = createStyles((theme) => ({
    root: {
        height: '100vh',
        backgroundColor: 'yellow', // Change background color here
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: `linear-gradient(250deg, rgba(130, 201, 30, 0) 0%, #062343 70%), url("https://unsplash.com/photos/BxgVEo_rF-o")`,
        paddingTop: `calc(${theme.spacing.xl} * 3)`,
        paddingBottom: `calc(${theme.spacing.xl} * 3)`,
    },

    inner: {
        display: "flex",
        justifyContent: "space-between",
        width: 800,
        [theme.fn.smallerThan("md")]: {
            flexDirection: "column",
        },
    },

    image: {
        [theme.fn.smallerThan("md")]: {
            display: "none",
        },
    },

    content: {
        width: 1000,
        display: "flex",
        alignItems: "center",
        paddingTop: `calc(${theme.spacing.xl} * 2)`,
        paddingBottom: `calc(${theme.spacing.xl} * 2)`,
        marginRight: `calc(${theme.spacing.xl} * 3)`,
        [theme.fn.smallerThan("md")]: {
            marginRight: 0,
        },
    },

    title: {
        color: theme.white,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontWeight: 900,
        lineHeight: 1.05,
        fontSize: rem(60),

        [theme.fn.smallerThan("md")]: {
            maxWidth: "100%",
            fontSize: rem(34),
            lineHeight: 1.15,
        },
    },

    description: {
        color: theme.white,
        opacity: 0.75,
        textAlign: 'justify',
        maxWidth: rem(1000),
        fontSize: rem(20), // Adjust the font size here

        [theme.fn.smallerThan('md')]: {
            maxWidth: '100%',
        },
    },

    control: {
        paddingLeft: rem(50),
        paddingRight: rem(50),
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontSize: rem(22),

        [theme.fn.smallerThan("md")]: {
            width: "100%",
        },
    },
}));

const LandingPage = () => {

    const { classes } = useStyles();

    //ref the login
    const login: RefObject<HTMLInputElement> = useRef(null);

    //handle scroll
    const handleScroll = (elmRef: any) => {
        window.scrollTo({ top: elmRef.current.offsetTop, behavior: "smooth" });
    };

    return (
        <>
            {/* display: "flex", justifyContent: "center", alignItems: "center", */}
            <div className={classes.root} style={{ minHeight: "100vh" }}>
                <Group position="center">
                    <Title
                        className={classes.title}
                        style={{ letterSpacing: "15px", marginTop: "25vh" }}
                    >
                        Ticket Management System
                    </Title>
                </Group>
                <Group position="center">
                    <Text className={classes.description} mt={30}>

                        The Ticket Management System streamlines the process of handling and resolving customer inquiries or issues. It efficiently manages incoming tickets, assigns them to the appropriate personnel, tracks their status, and ensures timely resolution. This system enhances communication, organizes tasks, and provides a centralized platform for customer support. It is crucial for businesses to maintain customer satisfaction by addressing concerns promptly. With features like ticket tracking, prioritization, and analytics, the Ticket Management System optimizes workflows, empowers support teams, and ultimately contributes to a positive customer experience
                    </Text>
                </Group>
                <Group position="center">
                    <Button
                        variant="gradient"
                        gradient={{ from: "pink", to: "yellow" }}
                        size="xl"
                        className={classes.control}
                        mt={40}
                        onClick={() => handleScroll(login)}
                    >
                        Get started
                    </Button>
                </Group>
            </div>

            {/* // connect Login Page */}

            {/* <LoginPage ref={login}/> */}
            <ManageTicket ref={login}/>
            <Footer />
        </>
    );
};

export default LandingPage;
