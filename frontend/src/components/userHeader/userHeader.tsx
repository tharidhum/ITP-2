import { useState } from "react";
import {
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Tabs,
  Burger,
  rem,
  useMantineTheme,
  createStyles,
  Image,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconLogout,
  IconHeart,
  IconStar,
  IconMessage,
  IconSettings,
  IconPlayerPause,
  IconTrash,
  IconSwitchHorizontal,
  IconChevronDown,
  IconAlignJustified,
} from "@tabler/icons-react";
import Support from "../Support/support";
import LOGO from "../../assets/LOGO png.png";

// Custom Theme
const useStyles = createStyles((theme) => ({
  header: {
    paddingTop: theme.spacing.md,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : "#ffbb38",
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? "transparent" : theme.colors.gray[2]
    }`,
    // marginBottom: 120,
  },

  mainSection: {
    paddingBottom: 55,
  },

  user: {
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: "background-color 100ms ease",
    paddingBlock: "10px",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.yellow[2],
    },

    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("xs")]: {
      display: "none",
    },
  },

  userActive: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[8]
        : theme.colors.yellow[2],
  },
  tabs: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
    marginTop: -38,
  },

  tabsList: {
    borderBottom: "0 !important",
  },

  tab: {
    fontWeight: 500,
    height: 38,
    backgroundColor: "transparent",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.yellow[2],
    },

    "&[data-active]": {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
      borderColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[2],
    },
  },
}));

const tabs = [
  { tab: "All Categories", icon: <IconAlignJustified size={10} /> },
  { tab: "HomePage", icon: null },
  { tab: "Shop", icon: null },
  { tab: "Pages", icon: null },
  { tab: "About", icon: null },
  { tab: "Blog", icon: null },
  { tab: "Contact", icon: null },
];

const UserHeader = () => {
  const { classes, cx } = useStyles();

  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const items = tabs.map((tab) => (
    <Tabs.Tab value={tab.tab} key={tab.tab} icon={tab.icon} p={5}>
      {tab.tab}
    </Tabs.Tab>
  ));

  // get user details
  const user = JSON.parse(localStorage.getItem("user")!!);
  return (
    <>
      <div className={classes.header}>
        <Container className={classes.mainSection}>
          <Group position="apart">
            {/* dashboard logo */}
            <Image src={LOGO} width={50} ml={50} />
            <Burger
              opened={opened}
              onClick={toggle}
              className={classes.burger}
              size="sm"
            />
            <Menu
              width={260}
              position="bottom-end"
              //   transition="pop-top-right"
              onClose={() => setUserMenuOpened(false)}
              onOpen={() => setUserMenuOpened(true)}
            >
              <Menu.Target>
                <UnstyledButton
                  className={cx(classes.user, {
                    [classes.userActive]: userMenuOpened,
                  })}
                >
                  <Group spacing={7}>
                    {/* profile picture */}
                    <Avatar
                      src={
                        "data:image/jpeg;base64,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"
                      }
                      alt={user.name}
                      radius="xl"
                      size={"sm"}
                    />
                    <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                      {user.name}
                    </Text>
                    <IconChevronDown size={12} stroke={1.5} />
                  </Group>
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item>{user.email}</Menu.Item>
                <Menu.Divider />
                <Menu.Item icon={<IconLogout size={14} stroke={1.5} />}>
                  <a
                    href="/"
                    style={{
                      color: "inherit",
                      textDecoration: "inherit",
                    }}
                  >
                    Logout
                  </a>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Container>
      </div>
      <Container size="md">
        <Tabs
          defaultValue="All Categories"
          variant="outline"
          classNames={{
            root: classes.tabs,
            tabsList: classes.tabsList,
            tab: classes.tab,
          }}
        >
          <Tabs.List grow>{items}</Tabs.List>

          <Tabs.Panel value="All Categories">
            <Support />
          </Tabs.Panel>
        </Tabs>
      </Container>
    </>
  );
};

export default UserHeader;
