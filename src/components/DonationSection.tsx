import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Heart,
  Home,
  BookOpen,
  Users,
  Utensils,
  CreditCard,
  Mail,
  Smartphone,
  Building2,
  Banknote,
  Copy,
  CheckCircle2,
  ExternalLink,
  Wallet,
} from "lucide-react";
import { useRouter } from "./Router";

export function DonationSection() {
  const { navigateTo } = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCause, setSelectedCause] = useState<any>(null);
  const [selectedAmount, setSelectedAmount] = useState<
    number | null
  >(null);
  const [selectedMethod, setSelectedMethod] = useState<
    string | null
  >(null);

  const paymentMethods = [
    {
      id: "etransfer",
      name: "Interact E-Transfer",
      icon: Mail,
      description: "Send directly from your bank",
      recommended: true,
    },
    {
      id: "paypal",
      name: "PayPal",
      icon: Wallet,
      description: "Pay with PayPal or card",
    },
    {
      id: "credit",
      name: "Credit/Debit Card",
      icon: CreditCard,
      description: "Visa, MasterCard, Debit",
    },
  ];

  const handleDonateClick = (cause: any, amount?: number) => {
    setSelectedCause(cause);
    setSelectedAmount(amount || null);
    setIsModalOpen(true);
  };

  const processDonation = () => {
    if (selectedMethod && selectedAmount && selectedCause) {
      // Handle different payment methods here
      switch (selectedMethod) {
        case "paypal":
          window.open(
            `https://paypal.me/nwmis/${selectedAmount}`,
            "_blank",
          );
          break;
        case "etransfer":
          // Copy email to clipboard
          navigator.clipboard.writeText("nwmis.bc@gmail.com");
          break;
        default:
          console.log(
            `Processing ${selectedAmount} for ${selectedCause.title} via ${selectedMethod}`,
          );
      }
      setIsModalOpen(false);
    }
  };

  const donationCauses = [
    {
      id: 1,
      title: "Mosque Development Fund",
      description:
        "Help us build and maintain our worship space for the growing community",
      icon: Home,
      goal: 50000,
      raised: 32000,
      urgent: true,
    },
    {
      id: 2,
      title: "Quran Learning Programs",
      description:
        "Support our educational initiatives and Islamic learning resources",
      icon: BookOpen,
      goal: 15000,
      raised: 8500,
      urgent: false,
    },
    {
      id: 3,
      title: "Community Events",
      description:
        "Fund our community gatherings, iftars, and cultural celebrations",
      icon: Users,
      goal: 10000,
      raised: 6200,
      urgent: false,
    },
    {
      id: 4,
      title: "Food Bank & Support",
      description:
        "Provide assistance to families in need within our community",
      icon: Utensils,
      goal: 8000,
      raised: 4100,
      urgent: false,
    },
  ];

  const quickAmounts = [25, 50, 100, 250, 500];

  return <></>;
}