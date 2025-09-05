import { useState } from 'react';
import { DonationSection } from '../DonationSection';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Badge } from '../ui/badge';
import { 
  Heart, 
  CreditCard, 
  Mail, 
  Smartphone, 
  Building2, 
  Banknote, 
  Copy,
  CheckCircle2,
  X,
  ExternalLink,
  Wallet
} from 'lucide-react';

export function DonatePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const quickAmounts = [25, 50, 100, 250, 500, 1000];

  const paymentMethods = [
    {
      id: 'etransfer',
      name: 'Interact E-Transfer',
      icon: Mail,
      description: 'Send money directly from your bank account',
      details: {
        email: 'nwmis.bc@gmail.com',
        instructions: 'Send e-transfer to this email. No security question required for auto-deposit.',
        benefits: ['Instant transfer', 'No fees', 'Secure', 'Tax receipt via email']
      },
      color: 'bg-blue-50 border-blue-200 text-blue-800',
      recommended: true
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: Wallet,
      description: 'Pay securely with PayPal account or card',
      details: {
        link: 'https://paypal.me/nwmis',
        instructions: 'Click the PayPal button to be redirected to our secure payment page.',
        benefits: ['Secure payment', 'Buyer protection', 'International support', 'Instant confirmation']
      },
      color: 'bg-yellow-50 border-yellow-200 text-yellow-800'
    },
    {
      id: 'credit',
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Pay with Visa, MasterCard, or Debit',
      details: {
        processor: 'Stripe Secure Payment',
        instructions: 'Process payment through our secure online form with SSL encryption.',
        benefits: ['All major cards', 'SSL encrypted', 'Instant receipt', 'Recurring options']
      },
      color: 'bg-green-50 border-green-200 text-green-800'
    },
    {
      id: 'banking',
      name: 'Online Banking',
      icon: Building2,
      description: 'Direct transfer from your bank',
      details: {
        account: 'NWMIS Operating Account',
        instructions: 'Add NWMIS as a payee in your online banking. Contact us for account details.',
        benefits: ['No processing fees', 'Scheduled payments', 'Bank-level security', 'Large donations']
      },
      color: 'bg-purple-50 border-purple-200 text-purple-800'
    },
    {
      id: 'cash',
      name: 'Cash/Cheque',
      icon: Banknote,
      description: 'In-person donations at the mosque',
      details: {
        location: '8879 Selkirk Street, Vancouver',
        instructions: 'Visit during prayer times or community events. Speak with treasurer or board members.',
        benefits: ['Personal touch', 'Immediate receipt', 'Meet the community', 'Any amount welcome']
      },
      color: 'bg-gray-50 border-gray-200 text-gray-800'
    }
  ];

  const handleDonateClick = (amount?: number) => {
    setSelectedAmount(amount || null);
    setIsModalOpen(true);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const processDonation = () => {
    if (selectedMethod && selectedAmount) {
      // Handle different payment methods here
      switch (selectedMethod) {
        case 'paypal':
          window.open(`https://paypal.me/nwmis/${selectedAmount}`, '_blank');
          break;
        case 'etransfer':
          // Show instructions modal or copy email
          copyToClipboard('nwmis.bc@gmail.com');
          break;
        // Add other payment method handlers
        default:
          console.log(`Processing ${selectedAmount} via ${selectedMethod}`);
      }
      setIsModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white/95 backdrop-blur-sm relative">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-green-700 via-green-600 to-green-800 text-white relative">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl mb-6">Support Our Community</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-8">
            Your generous donations help us serve our community and strengthen our Islamic programs
          </p>
          
          {/* Quick Donate Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {quickAmounts.map((amount) => (
              <Button 
                key={amount}
                onClick={() => handleDonateClick(amount)}
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-green-700 px-6 py-3 text-lg font-medium rounded-full"
              >
                ${amount}
              </Button>
            ))}
          </div>
          
          <Button 
            onClick={() => handleDonateClick()}
            size="lg" 
            className="bg-white text-green-700 hover:bg-gray-100 px-8 py-4 text-lg font-medium rounded-full"
          >
            <Heart className="h-5 w-5 mr-2" />
            Choose Amount & Method
          </Button>
        </div>
      </section>

      {/* Donation Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center mb-4">
              Complete Your Donation
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Amount Selection */}
            <div>
              <h3 className="text-lg font-medium mb-4">Select Donation Amount</h3>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-4">
                {quickAmounts.map((amount) => (
                  <Button
                    key={amount}
                    onClick={() => setSelectedAmount(amount)}
                    variant={selectedAmount === amount ? "default" : "outline"}
                    className={`py-3 ${selectedAmount === amount ? 'bg-green-600 hover:bg-green-700' : 'border-green-600 text-green-600 hover:bg-green-50'}`}
                  >
                    ${amount}
                  </Button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Or enter custom amount: $</span>
                <input
                  type="number"
                  className="border border-gray-300 rounded px-3 py-2 text-center w-24"
                  placeholder="0"
                  onChange={(e) => setSelectedAmount(Number(e.target.value))}
                />
              </div>
            </div>

            {/* Payment Method Selection */}
            <div>
              <h3 className="text-lg font-medium mb-4">Choose Payment Method</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <Card
                      key={method.id}
                      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                        selectedMethod === method.id 
                          ? 'ring-2 ring-green-500 bg-green-50' 
                          : 'hover:shadow-lg'
                      }`}
                      onClick={() => setSelectedMethod(method.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${method.color.split(' ')[0]} ${method.color.split(' ')[1]}`}>
                            <Icon className={`h-5 w-5 ${method.color.split(' ')[2]}`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium">{method.name}</h4>
                              {method.recommended && (
                                <Badge className="bg-green-600 hover:bg-green-700 text-xs">
                                  Recommended
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{method.description}</p>
                            <div className="flex flex-wrap gap-1">
                              {method.details.benefits.slice(0, 2).map((benefit, index) => (
                                <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                  {benefit}
                                </span>
                              ))}
                            </div>
                          </div>
                          {selectedMethod === method.id && (
                            <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Selected Method Details */}
            {selectedMethod && (
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium mb-2">Payment Instructions</h4>
                <p className="text-sm text-gray-700 mb-3">
                  {paymentMethods.find(m => m.id === selectedMethod)?.details.instructions}
                </p>
                
                {selectedMethod === 'etransfer' && (
                  <div className="flex items-center gap-2 p-3 bg-white rounded border">
                    <span className="font-mono text-sm">nwmis.bc@gmail.com</span>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => copyToClipboard('nwmis.bc@gmail.com')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
              <Button
                onClick={() => setIsModalOpen(false)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={processDonation}
                disabled={!selectedAmount || !selectedMethod}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                {selectedMethod === 'paypal' ? (
                  <>Continue to PayPal <ExternalLink className="h-4 w-4 ml-2" /></>
                ) : selectedMethod === 'etransfer' ? (
                  <>Copy Email Address <Copy className="h-4 w-4 ml-2" /></>
                ) : (
                  <>Proceed with Donation <Heart className="h-4 w-4 ml-2" /></>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Donation Content */}
      <div className="py-0">
        <DonationSection />
      </div>

      {/* Impact Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl text-center text-gray-900 mb-12">Your Impact</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl mb-4">🕌</div>
              <h3 className="text-xl text-gray-900 mb-3">Mosque Development</h3>
              <p className="text-gray-600">
                Help us build a permanent worship space for our growing community
              </p>
            </div>
            <div className="text-center bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl mb-4">📚</div>
              <h3 className="text-xl text-gray-900 mb-3">Education Programs</h3>
              <p className="text-gray-600">
                Support Islamic education and Quran learning for all ages
              </p>
            </div>
            <div className="text-center bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl mb-4">🤝</div>
              <h3 className="text-xl text-gray-900 mb-3">Community Support</h3>
              <p className="text-gray-600">
                Provide assistance to families and individuals in need
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Methods Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl text-center text-gray-900 mb-4">Multiple Ways to Give</h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Choose the payment method that works best for you. All donations are secure and tax-deductible.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              return (
                <Card key={method.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-lg ${method.color.split(' ')[0]} ${method.color.split(' ')[1]}`}>
                        <Icon className={`h-6 w-6 ${method.color.split(' ')[2]}`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{method.name}</CardTitle>
                        {method.recommended && (
                          <Badge className="bg-green-600 hover:bg-green-700 text-xs mt-1">
                            Most Popular
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{method.description}</p>
                    <div className="space-y-2">
                      {method.details.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                          <span className="text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tax Information */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl text-gray-900 mb-6">Tax Deductible Donations</h2>
          <p className="text-lg text-gray-600 mb-4">
            New Westminster Islamic Society is a registered charity in Canada.
          </p>
          <p className="text-gray-600">
            All donations are tax-deductible and you will receive an official receipt for your records. 
            Our charitable registration number will be provided with your receipt.
          </p>
        </div>
      </section>
    </div>
  );
}