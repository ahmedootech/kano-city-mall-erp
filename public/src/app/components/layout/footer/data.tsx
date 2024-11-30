import ExploreIcon from "@mui/icons-material/Explore";
import PhoneSharpIcon from "@mui/icons-material/PhoneSharp";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";

export const contactList = [
  {
    icon: ExploreIcon,
    title: "Location",
    description: (
      <p className="font-arial">N0 8KL Kano City Mall , Kano State Nigeria.</p>
    ),
  },
  {
    icon: PhoneSharpIcon,
    title: "Phone",
    description: <p className="font-arial">(+234) 9113346612</p>,
  },
  {
    icon: WhatsAppIcon,
    title: "Whatsapp",
    description: <p className="font-arial">(+234) 9113346612</p>,
  },
  {
    icon: EmailIcon,
    title: "Email",
    description: <p className="font-arial">kanocitymall@gmail.com</p>,
  },
];
