import { CoursePart } from "../types";
import Part from "./Part";

const Content = ({ parts }: { parts: Array<CoursePart> }) => {
  return (
    <div>
      {parts.map((part, i) => (
        <div key={i} style={{margin: " 0px 0px 15px 0px"}}>
          <Part part={part} />
        </div>
      ))}
    </div>
  );
};

export default Content;
