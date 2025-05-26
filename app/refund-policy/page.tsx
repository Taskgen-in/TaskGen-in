"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { RefreshCw, CreditCard, AlertTriangle, CheckCircle, Clock, Phone } from "lucide-react"

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <RefreshCw className="h-12 w-12 text-green-600" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900">Cancellation & Refund Policy</CardTitle>
            <p className="text-gray-600 mt-2">Last updated: {new Date().toLocaleDateString()}</p>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-6">
                <section>
                  <h2 className="text-xl font-semibold mb-3 flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2 text-yellow-600" />
                    1. Important Notice
                  </h2>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                    <p className="text-yellow-800 font-medium">
                      TaskGen is a task-based earning platform where users complete tasks to earn rewards. This policy
                      covers cancellations and refunds related to platform services and premium features.
                    </p>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Since TaskGen operates on a task completion model where users earn money rather than pay for
                    services, traditional refund scenarios are limited. However, this policy covers various situations
                    where cancellations or refunds may apply.
                  </p>
                </section>

                <Separator />

                <section>
                  <h2 className="text-xl font-semibold mb-3 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                    2. Task Cancellation Policy
                  </h2>
                  <div className="text-gray-700 leading-relaxed space-y-3">
                    <h3 className="font-medium">2.1 User-Initiated Cancellation</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>
                        <strong>Before Starting:</strong> Users can cancel accepted tasks before beginning work without
                        penalty
                      </li>
                      <li>
                        <strong>During Progress:</strong> Tasks can be cancelled within the first 25% of completion time
                      </li>
                      <li>
                        <strong>After 25% Progress:</strong> Cancellation may result in temporary task restrictions
                      </li>
                      <li>
                        <strong>Near Completion:</strong> Tasks cannot be cancelled after 75% completion
                      </li>
                    </ul>

                    <h3 className="font-medium">2.2 Platform-Initiated Cancellation</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Technical issues or platform maintenance</li>
                      <li>Task requirements changes by the client</li>
                      <li>Insufficient task quality or data</li>
                      <li>Violation of task guidelines</li>
                    </ul>

                    <h3 className="font-medium">2.3 Automatic Cancellation</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Tasks not started within 24 hours of acceptance</li>
                      <li>Exceeding maximum time limits</li>
                      <li>User inactivity for more than 48 hours</li>
                    </ul>
                  </div>
                </section>

                <Separator />

                <section>
                  <h2 className="text-xl font-semibold mb-3 flex items-center">
                    <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
                    3. Premium Services & Subscriptions
                  </h2>
                  <div className="text-gray-700 leading-relaxed space-y-3">
                    <h3 className="font-medium">3.1 Premium Account Features</h3>
                    <p>If TaskGen introduces premium features or subscriptions:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>
                        <strong>7-Day Free Trial:</strong> Cancel anytime during trial period for full refund
                      </li>
                      <li>
                        <strong>Monthly Subscriptions:</strong> Cancel anytime, effective at next billing cycle
                      </li>
                      <li>
                        <strong>Annual Subscriptions:</strong> Pro-rated refund available within 30 days
                      </li>
                      <li>
                        <strong>Feature Purchases:</strong> Non-refundable once activated
                      </li>
                    </ul>

                    <h3 className="font-medium">3.2 Training Courses & Certifications</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>
                        <strong>Before Access:</strong> Full refund within 24 hours of purchase
                      </li>
                      <li>
                        <strong>Partial Completion:</strong> 50% refund if less than 25% completed
                      </li>
                      <li>
                        <strong>Technical Issues:</strong> Full refund if course is inaccessible
                      </li>
                      <li>
                        <strong>After Completion:</strong> No refunds for completed courses
                      </li>
                    </ul>
                  </div>
                </section>

                <Separator />

                <section>
                  <h2 className="text-xl font-semibold mb-3">4. Payment & Withdrawal Issues</h2>
                  <div className="text-gray-700 leading-relaxed space-y-3">
                    <h3 className="font-medium">4.1 Failed Withdrawals</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>
                        <strong>Bank Issues:</strong> Funds returned to TaskGen wallet within 3-5 business days
                      </li>
                      <li>
                        <strong>Incorrect Details:</strong> User can update details and retry withdrawal
                      </li>
                      <li>
                        <strong>Technical Failures:</strong> Automatic retry within 24 hours
                      </li>
                      <li>
                        <strong>Account Closure:</strong> Remaining balance transferred within 30 days
                      </li>
                    </ul>

                    <h3 className="font-medium">4.2 Disputed Payments</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Task payment disputes reviewed within 7 business days</li>
                      <li>Evidence required from both user and task reviewer</li>
                      <li>Final decision made by TaskGen arbitration team</li>
                      <li>Appeals process available for disputed decisions</li>
                    </ul>

                    <h3 className="font-medium">4.3 Accidental Charges</h3>
                    <p>In rare cases of accidental charges:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Report within 48 hours for immediate investigation</li>
                      <li>Full refund processed within 5-7 business days</li>
                      <li>Automatic prevention measures implemented</li>
                    </ul>
                  </div>
                </section>

                <Separator />

                <section>
                  <h2 className="text-xl font-semibold mb-3 flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-purple-600" />
                    5. Refund Processing Timeline
                  </h2>
                  <div className="text-gray-700 leading-relaxed space-y-3">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h3 className="font-medium text-blue-800 mb-2">Standard Processing Times:</h3>
                      <ul className="list-disc pl-6 space-y-1 text-blue-700">
                        <li>
                          <strong>UPI Refunds:</strong> 1-2 business days
                        </li>
                        <li>
                          <strong>Bank Account Refunds:</strong> 3-7 business days
                        </li>
                        <li>
                          <strong>Credit Card Refunds:</strong> 5-10 business days
                        </li>
                        <li>
                          <strong>Digital Wallet Refunds:</strong> 1-3 business days
                        </li>
                      </ul>
                    </div>

                    <h3 className="font-medium">5.1 Refund Status Tracking</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Real-time status updates in your account dashboard</li>
                      <li>Email notifications at each processing stage</li>
                      <li>SMS alerts for successful refund completion</li>
                      <li>Support ticket system for refund inquiries</li>
                    </ul>
                  </div>
                </section>

                <Separator />

                <section>
                  <h2 className="text-xl font-semibold mb-3">6. Non-Refundable Items</h2>
                  <div className="text-gray-700 leading-relaxed">
                    <p className="mb-3">The following items are generally non-refundable:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>
                        <strong>Completed Tasks:</strong> Tasks that have been completed and approved
                      </li>
                      <li>
                        <strong>Earned Rewards:</strong> Legitimately earned task rewards and bonuses
                      </li>
                      <li>
                        <strong>Referral Bonuses:</strong> Bonuses earned through valid referrals
                      </li>
                      <li>
                        <strong>Consumed Services:</strong> Used premium features or consumed credits
                      </li>
                      <li>
                        <strong>Violation Penalties:</strong> Fines or deductions due to policy violations
                      </li>
                      <li>
                        <strong>Processing Fees:</strong> Third-party payment processing charges
                      </li>
                    </ul>
                  </div>
                </section>

                <Separator />

                <section>
                  <h2 className="text-xl font-semibold mb-3">7. Refund Request Process</h2>
                  <div className="text-gray-700 leading-relaxed space-y-3">
                    <h3 className="font-medium">7.1 How to Request a Refund</h3>
                    <ol className="list-decimal pl-6 space-y-1">
                      <li>Log into your TaskGen account</li>
                      <li>Navigate to "Support" or "Help Center"</li>
                      <li>Select "Refund Request" from the category menu</li>
                      <li>Fill out the refund request form with details</li>
                      <li>Attach relevant screenshots or documentation</li>
                      <li>Submit the request for review</li>
                    </ol>

                    <h3 className="font-medium">7.2 Required Information</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Transaction ID or reference number</li>
                      <li>Date and time of the transaction</li>
                      <li>Reason for refund request</li>
                      <li>Supporting evidence (if applicable)</li>
                      <li>Preferred refund method</li>
                    </ul>

                    <h3 className="font-medium">7.3 Review Process</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>
                        <strong>Initial Review:</strong> 24-48 hours
                      </li>
                      <li>
                        <strong>Investigation:</strong> 3-7 business days (if required)
                      </li>
                      <li>
                        <strong>Decision Notification:</strong> Email and in-app notification
                      </li>
                      <li>
                        <strong>Processing:</strong> 1-10 business days (depending on method)
                      </li>
                    </ul>
                  </div>
                </section>

                <Separator />

                <section>
                  <h2 className="text-xl font-semibold mb-3">8. Special Circumstances</h2>
                  <div className="text-gray-700 leading-relaxed space-y-3">
                    <h3 className="font-medium">8.1 Technical Issues</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Platform downtime affecting task completion</li>
                      <li>Data loss due to system failures</li>
                      <li>Payment processing errors</li>
                      <li>Account access issues</li>
                    </ul>

                    <h3 className="font-medium">8.2 Force Majeure</h3>
                    <p>In cases of natural disasters, government regulations, or other uncontrollable events:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Task cancellations without penalty</li>
                      <li>Extended deadlines for ongoing tasks</li>
                      <li>Proportional refunds for affected services</li>
                      <li>Alternative compensation methods</li>
                    </ul>
                  </div>
                </section>

                <Separator />

                <section>
                  <h2 className="text-xl font-semibold mb-3">9. Dispute Resolution</h2>
                  <div className="text-gray-700 leading-relaxed space-y-3">
                    <h3 className="font-medium">9.1 Internal Resolution</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Customer support team handles initial disputes</li>
                      <li>Escalation to senior management if unresolved</li>
                      <li>Independent arbitration panel for complex cases</li>
                      <li>Final appeal to company executives</li>
                    </ul>

                    <h3 className="font-medium">9.2 External Resolution</h3>
                    <p>If internal resolution fails:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Consumer court proceedings</li>
                      <li>Banking ombudsman (for payment issues)</li>
                      <li>Regulatory authority complaints</li>
                      <li>Legal proceedings as last resort</li>
                    </ul>
                  </div>
                </section>

                <Separator />

                <section>
                  <h2 className="text-xl font-semibold mb-3 flex items-center">
                    <Phone className="h-5 w-5 mr-2 text-green-600" />
                    10. Contact Information
                  </h2>
                  <div className="text-gray-700 leading-relaxed">
                    <p className="mb-3">For refund requests and cancellation support:</p>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <ul className="list-none space-y-2">
                        <li>
                          <strong>Refund Support:</strong> info@taskgen.in
                        </li>
                        <li>
                          <strong>Customer Care:</strong> +91 9344759416
                        </li>
                        <li>
                          <strong>WhatsApp Support:</strong> +91 9344759416
                        </li>
                        <li>
                          <strong>Support Hours:</strong> Monday to Saturday, 9 AM to 6 PM IST
                        </li>
                        <li>
                          <strong>Emergency Support:</strong> Available 24/7 for critical payment issues
                        </li>
                        <li>
                          <strong>Address:</strong> SF No. 598/2, 6th Floor, Gautam Complex, Udayampalayam road, Nava
                          India Rd, Coimbatore, Tamil Nadu 641028
                        </li>
                      </ul>
                    </div>
                    <p className="mt-3 text-sm text-gray-600">
                      <strong>Response Time:</strong> We aim to respond to all refund requests within 24 hours. Complex
                      cases may take up to 7 business days for complete resolution.
                    </p>
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
