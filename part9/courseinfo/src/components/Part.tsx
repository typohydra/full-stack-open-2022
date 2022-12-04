import { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.type) {
    case "normal":
      return (
        <div>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <div>
            <i>{part.description}</i>
          </div>
        </div>
      );
    case "groupProject":
      return (
        <div>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <div>
            <i>project exercises {part.groupProjectCount}</i>
          </div>
        </div>
      );
    case "submission":
      return (
        <div>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <div>
            <i>{part.description}</i>
          </div>
          <div>submit to {part.exerciseSubmissionLink}</div>
        </div>
      );
    case "special":
      return (
        <div>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <div>
            <i>{part.description}</i>
          </div>
          <div>required skills: {part.requirements.join(" ")}</div>
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
