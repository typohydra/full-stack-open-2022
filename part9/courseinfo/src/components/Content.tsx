import { Course } from "../types";

const Content = ({ parts }: { parts: Array<Course> }) => {
  return (
    <div>
      {parts.map((part, i) => (
        <p key={i}>
          {part.name} {part.exerciseCount}
        </p>
      ))}
    </div>
  );
};

export default Content;
