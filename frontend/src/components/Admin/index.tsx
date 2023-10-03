import { Button, Card, Group, Image, Text } from "@mantine/core";
import Inven from "../../assets/Dashboard.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
const Admin = () => {
  useEffect(() => {

    // manally Inject admin data to local storage to identify the user
    localStorage.setItem("admin",JSON.stringify({_id : "64f96b61193f907b75cc3ae4",name : "David Peris",email : "dev@gmail.com"}));
    AOS.init();
  }, []);

  return (
    <div data-aos="fade-up">
      <Card
        shadow="lg"
        withBorder
        radius="md"
        p="md"
        w={300}
        data-aos="fade-up"
        data-aos-delay="150"
        data-aos-easing="ease-in-sine"
      >
        <Card.Section withBorder>
          <Group position="center" m={50}>
            <Image src={Inven} alt="Admin photo" height={150} width={150} />
          </Group>
        </Card.Section>

        <Card.Section inheritPadding>
          <Text weight={400} p={20} style={{ textAlign: "justify" }}></Text>
        </Card.Section>
        <Card.Section>
          <Group position="center" grow m={10}>
            {/* <Button color="blue" p={10} component="a" href="/login/admin"> */}
            <Button
              variant="gradient"
              component="a"
              href="/admin/dashboard"
              gradient={{ from: "teal", to: "lime", deg: 105 }}
            >
              Admin 
            </Button>
          </Group>
        </Card.Section>
      </Card>
    </div>
  );
};

export default Admin;
