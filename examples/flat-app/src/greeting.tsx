type GreetingProps = {
  name: string,
  when: Date
};

export function Greeting({ name, when }: GreetingProps) {
  return (
    <p>
      {name}
      {when.toLocaleDateString()}
    </p>
  );
}
