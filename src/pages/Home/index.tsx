import { SideBar } from "../../components/SideBar";
import { Content } from "../../components/Content";

export function Home() {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <SideBar />

      <Content />
    </div>
  );
}
