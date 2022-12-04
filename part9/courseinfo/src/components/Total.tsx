import { Course } from "../types";

const Total = ({ parts }: { parts: Array<Course> }) => {
  return (
    <p>
      Number of exercises{" "}
      {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
};

export default Total;
