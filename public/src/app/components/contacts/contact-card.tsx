import { ReactElement } from "react";

const ContactCard: React.FC<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon: any;
  title: string;
  description: ReactElement;
}> = ({ Icon, title, description }) => {
  return (
    <div className="d-flex gap-3 mb-3">
      <div
        className="bg-dark rounded-circle d-flex align-items-center justify-content-center text-white"
        style={{ width: 50, height: 50 }}
      >
        <Icon />
      </div>
      <div className="">
        <h5>{title}</h5>
        <div>{description}</div>
      </div>
    </div>
  );
};
export default ContactCard;
