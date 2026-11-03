import { missing } from "./does-not-exist";

interface Props {
  when: Date
}

export default function Dirty({ when }: Props) {
  console.log(missing)
  return <time onClick={() => null} dateTime='x'>{when.toLocaleDateString()}</time>;
}
