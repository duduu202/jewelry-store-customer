import { Message } from "./styles";

interface Props {
  error?: string;
}
const ErrorMessage = ({ error }: Props) => {
  if (!error) return null;
  return <Message>{error}</Message>;
};

export default ErrorMessage;
