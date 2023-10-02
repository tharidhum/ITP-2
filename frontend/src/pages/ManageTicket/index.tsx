import backgroundimg from "../../assets/backgroundimg.jpg";
import { forwardRef } from "react";
import Admin from "../../components/Admin";
import Client from "../../components/Client";

const ManageTicket = forwardRef<HTMLInputElement>((props, ref) => {
  return (
    <div
      style={{
        height: "100vh",
        backgroundImage: `url(${backgroundimg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      ref={ref}
    >

        <Admin />
        <div style={{ marginLeft: "20px" }}> {/* Adjust the margin as needed */}

        <Client/>
        </div>
    </div>
  );
});

export default ManageTicket;