"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-900">Terms & Conditions</CardTitle>
            <p className="text-gray-600 mt-2">Last updated: {new Date().toLocaleDateString()}</p>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-6">
                <section>
                  <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
                  <p className="text-gray-700 leading-relaxed">
                    By accessing and using TaskGen ("the Platform"), you accept and agree to be bound by the terms and
                    provision of this agreement. If you do not agree to abide by the above, please do not use this
                    service.
                  </p>
                </section>

                <Separator />

                <section>
                  <h2 className="text-xl font-semibold mb-3">2. Platform Description</h2>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    TaskGen is a digital platform that connects users with AI training tasks and micro-jobs. Users can:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li>Complete AI training tasks and data annotation projects</li>
                    <li>Participate in surveys and research studies</li>
                    <li>Earn rewards for completed tasks</li>
                    <li>Access educational content and training materials</li>
                  </ul>
                </section>

                <Separator />

                <section>
                  <h2 className="text-xl font-semibold mb-3">3. User Eligibility</h2>
                  <div className="text-gray-700 leading-relaxed space-y-2">
                    <p>To use TaskGen, you must:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Be at least 18 years of age</li>
                      <li>Have legal capacity to enter into binding agreements</li>
                      <li>Provide accurate and complete registration information</li>
                      <li>Complete KYC verification as required</li>
                      <li>Maintain the security of your account credentials</li>
                    </ul>
                  </div>
                </section>

                <Separator />

                <section>
                  <h2 className="text-xl font-semibold mb-3">4. Account Registration & Verification</h2>
                  <div className="text-gray-700 leading-relaxed space-y-3">
                    <p>Users must complete the following verification steps:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>
                        <strong>Email Verification:</strong> Confirm your email address through OTP
                      </li>
                      <li>
                        <strong>Mobile Verification:</strong> Verify your mobile number via SMS
                      </li>
                      <li>
                        <strong>KYC Verification:</strong> Submit valid government-issued ID documents
                      </li>
                      <li>
                        <strong>Payment Setup:</strong> Configure UPI or bank account for payments
                      </li>
                    </ul>
                    <p>Incomplete verification may limit access to certain features and payment processing.</p>
                  </div>
                </section>

                <Separator />

                <section>
                  <h2 className="text-xl font-semibold mb-3">5. Task Participation</h2>
                  <div className="text-gray-700 leading-relaxed space-y-3">
                    <h3 className="font-medium">5.1 Task Availability</h3>
                    <p>Tasks are subject to availability and may have participant limits or time restrictions.</p>

                    <h3 className="font-medium">5.2 Quality Standards</h3>
                    <p>All task submissions must meet specified quality criteria. Poor quality work may result in:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Task rejection without payment</li>
                      <li>Account warnings or restrictions</li>
                      <li>Temporary or permanent suspension</li>
                    </ul>

                    <h3 className="font-medium">5.3 Task Completion</h3>
                    <p>
                      Users must complete tasks within specified timeframes. Incomplete tasks may be reassigned to other
                      users.
                    </p>
                  </div>
                </section>

                <Separator />

                <section>
                  <h2 className="text-xl font-semibold mb-3">6. Payments & Rewards</h2>
                  <div className="text-gray-700 leading-relaxed space-y-3">
                    <h3 className="font-medium">6.1 Payment Processing</h3>
                    <p>
                      Payments are processed after task approval and may take 3-7 business days to reflect in your
                      account.
                    </p>

                    <h3 className="font-medium">6.2 Minimum Withdrawal</h3>
                    <p>
                      Minimum withdrawal amount is ₹100. Withdrawal requests below this amount will not be processed.
                    </p>

                    <h3 className="font-medium">6.3 Tax Compliance</h3>
                    <p>
                      Users are responsible for reporting earnings and paying applicable taxes as per local regulations.
                    </p>
                  </div>
                </section>

                <Separator />

                <section>
                  <h2 className="text-xl font-semibold mb-3">7. Prohibited Activities</h2>
                  <div className="text-gray-700 leading-relaxed">
                    <p>Users are prohibited from:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Creating multiple accounts or using automated tools</li>
                      <li>Submitting false, misleading, or plagiarized content</li>
                      <li>Sharing account credentials or allowing others to use your account</li>
                      <li>Attempting to manipulate or game the platform systems</li>
                      <li>Engaging in any illegal or fraudulent activities</li>
                      <li>Violating intellectual property rights</li>
                    </ul>
                  </div>
                </section>

                <Separator />

                <section>
                  <h2 className="text-xl font-semibold mb-3">8. Intellectual Property</h2>
                  <p className="text-gray-700 leading-relaxed">
                    All content, trademarks, and intellectual property on TaskGen remain the property of their
                    respective owners. Users grant TaskGen a license to use submitted content for platform operations
                    and AI training purposes.
                  </p>
                </section>

                <Separator />

                <section>
                  <h2 className="text-xl font-semibold mb-3">9. Limitation of Liability</h2>
                  <p className="text-gray-700 leading-relaxed">
                    TaskGen shall not be liable for any indirect, incidental, special, consequential, or punitive
                    damages, including without limitation, loss of profits, data, use, goodwill, or other intangible
                    losses.
                  </p>
                </section>

                <Separator />

                <section>
                  <h2 className="text-xl font-semibold mb-3">10. Termination</h2>
                  <p className="text-gray-700 leading-relaxed">
                    TaskGen reserves the right to terminate or suspend accounts at any time for violation of these
                    terms. Users may also terminate their accounts through the platform settings.
                  </p>
                </section>

                <Separator />

                <section>
                  <h2 className="text-xl font-semibold mb-3">11. Governing Law</h2>
                  <p className="text-gray-700 leading-relaxed">
                    These terms shall be governed by and construed in accordance with the laws of India. Any disputes
                    shall be subject to the exclusive jurisdiction of courts in [Your City], India.
                  </p>
                </section>

                <Separator />

                <section>
                  <h2 className="text-xl font-semibold mb-3">12. Contact Information</h2>
                  <div className="text-gray-700 leading-relaxed">
                    <p>For questions about these Terms & Conditions, please contact us:</p>
                    <ul className="list-none space-y-1 mt-2">
                      <li>
                        <strong>Email:</strong> info@taskgen.in
                      </li>
                      <li>
                        <strong>Phone:</strong> +91 9344759416
                      </li>
                      <li>
                        <strong>Address:</strong> SF No. 598/2, 6th Floor, Gautam Complex, Udayampalayam road, Nava
                        India Rd, Coimbatore, Tamil Nadu 641028
                      </li>
                    </ul>
                  </div>
                </section>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
