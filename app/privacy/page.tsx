"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Shield, Lock, Eye, Database, UserCheck, Bell } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Shield className="h-12 w-12 text-blue-600" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900">Privacy Policy</CardTitle>
            <p className="text-gray-600 mt-2">Last updated: {new Date().toLocaleDateString()}</p>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-6">
                <section>
                  <h2 className="text-xl font-semibold mb-3 flex items-center">
                    <Eye className="h-5 w-5 mr-2 text-blue-600" />
                    1. Information We Collect
                  </h2>
                  <div className="text-gray-700 leading-relaxed space-y-3">
                    <h3 className="font-medium">1.1 Personal Information</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Name, email address, and mobile number</li>
                      <li>Date of birth and gender</li>
                      <li>Government-issued ID documents (PAN, Aadhaar)</li>
                      <li>Bank account and UPI details</li>
                      <li>Profile picture and personal preferences</li>
                    </ul>

                    <h3 className="font-medium">1.2 Usage Information</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Task completion data and performance metrics</li>
                      <li>Login times and platform usage patterns</li>
                      <li>Device information and IP addresses</li>
                      <li>Browser type and operating system</li>
                    </ul>

                    <h3 className="font-medium">1.3 Task-Related Data</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Submitted task responses and annotations</li>
                      <li>Quality scores and feedback</li>
                      <li>Training data contributions</li>
                      <li>Communication with support team</li>
                    </ul>
                  </div>
                </section>

                <Separator />

                <section>
                  <h2 className="text-xl font-semibold mb-3 flex items-center">
                    <Database className="h-5 w-5 mr-2 text-green-600" />
                    2. How We Use Your Information
                  </h2>
                  <div className="text-gray-700 leading-relaxed space-y-3">
                    <h3 className="font-medium">2.1 Platform Operations</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Account creation and user authentication</li>
                      <li>Task assignment and completion tracking</li>
                      <li>Payment processing and fraud prevention</li>
                      <li>Customer support and communication</li>
                    </ul>

                    <h3 className="font-medium">2.2 AI Training & Research</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Training machine learning models</li>
                      <li>Improving AI algorithms and accuracy</li>
                      <li>Research and development purposes</li>
                      <li>Quality assurance and validation</li>
                    </ul>

                    <h3 className="font-medium">2.3 Platform Improvement</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Analytics and usage optimization</li>
                      <li>Feature development and testing</li>
                      <li>Security monitoring and threat detection</li>
                      <li>Performance monitoring and bug fixes</li>
                    </ul>
                  </div>
                </section>

                <Separator />

                <section>
                  <h2 className="text-xl font-semibold mb-3 flex items-center">
                    <UserCheck className="h-5 w-5 mr-2 text-purple-600" />
                    3. Information Sharing
                  </h2>
                  <div className="text-gray-700 leading-relaxed space-y-3">
                    <h3 className="font-medium">3.1 We DO NOT sell your personal information</h3>
                    <p>
                      TaskGen does not sell, rent, or trade your personal information to third parties for marketing
                      purposes.
                    </p>

                    <h3 className="font-medium">3.2 Limited Sharing</h3>
                    <p>We may share information in the following circumstances:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>
                        <strong>Service Providers:</strong> Payment processors, cloud storage, and analytics services
                      </li>
                      <li>
                        <strong>Legal Requirements:</strong> When required by law or to protect our rights
                      </li>
                      <li>
                        <strong>Business Transfers:</strong> In case of merger, acquisition, or asset sale
                      </li>
                      <li>
                        <strong>Consent:</strong> When you explicitly consent to sharing
                      </li>
                    </ul>

                    <h3 className="font-medium">3.3 Anonymized Data</h3>
                    <p>
                      We may share aggregated, anonymized data for research and industry insights without identifying
                      individuals.
                    </p>
                  </div>
                </section>

                <Separator />

                <section>
                  <h2 className="text-xl font-semibold mb-3 flex items-center">
                    <Lock className="h-5 w-5 mr-2 text-red-600" />
                    4. Data Security
                  </h2>
                  <div className="text-gray-700 leading-relaxed space-y-3">
                    <h3 className="font-medium">4.1 Security Measures</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>End-to-end encryption for sensitive data</li>
                      <li>Secure HTTPS connections for all communications</li>
                      <li>Regular security audits and penetration testing</li>
                      <li>Multi-factor authentication options</li>
                      <li>Access controls and employee training</li>
                    </ul>

                    <h3 className="font-medium">4.2 Data Storage</h3>
                    <p>
                      Your data is stored on secure servers with industry-standard protection measures. We use reputable
                      cloud providers with SOC 2 compliance and regular backups.
                    </p>

                    <h3 className="font-medium">4.3 Breach Notification</h3>
                    <p>
                      In the unlikely event of a data breach, we will notify affected users within 72 hours and take
                      immediate steps to secure the platform.
                    </p>
                  </div>
                </section>

                <Separator />

                <section>
                  <h2 className="text-xl font-semibold mb-3">5. Your Rights & Choices</h2>
                  <div className="text-gray-700 leading-relaxed space-y-3">
                    <h3 className="font-medium">5.1 Access & Control</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>
                        <strong>Access:</strong> View and download your personal data
                      </li>
                      <li>
                        <strong>Correction:</strong> Update incorrect or incomplete information
                      </li>
                      <li>
                        <strong>Deletion:</strong> Request deletion of your account and data
                      </li>
                      <li>
                        <strong>Portability:</strong> Export your data in a standard format
                      </li>
                    </ul>

                    <h3 className="font-medium">5.2 Communication Preferences</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Opt-out of marketing emails and SMS</li>
                      <li>Customize notification settings</li>
                      <li>Control data usage for analytics</li>
                    </ul>

                    <h3 className="font-medium">5.3 Account Deletion</h3>
                    <p>
                      You can permanently delete your account through the platform settings. This will remove all
                      personal data within 30 days, except where retention is required by law.
                    </p>
                  </div>
                </section>

                <Separator />

                <section>
                  <h2 className="text-xl font-semibold mb-3">6. Cookies & Tracking</h2>
                  <div className="text-gray-700 leading-relaxed space-y-3">
                    <h3 className="font-medium">6.1 Cookie Usage</h3>
                    <p>We use cookies and similar technologies for:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Authentication and session management</li>
                      <li>Remembering user preferences</li>
                      <li>Analytics and performance monitoring</li>
                      <li>Security and fraud prevention</li>
                    </ul>

                    <h3 className="font-medium">6.2 Cookie Control</h3>
                    <p>
                      You can control cookies through your browser settings. However, disabling certain cookies may
                      affect platform functionality.
                    </p>
                  </div>
                </section>

                <Separator />

                <section>
                  <h2 className="text-xl font-semibold mb-3">7. Children's Privacy</h2>
                  <p className="text-gray-700 leading-relaxed">
                    TaskGen is not intended for users under 18 years of age. We do not knowingly collect personal
                    information from children. If we become aware of such collection, we will delete the information
                    immediately.
                  </p>
                </section>

                <Separator />

                <section>
                  <h2 className="text-xl font-semibold mb-3">8. International Data Transfers</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Your data may be processed in countries other than your residence. We ensure adequate protection
                    through appropriate safeguards and compliance with applicable data protection laws.
                  </p>
                </section>

                <Separator />

                <section>
                  <h2 className="text-xl font-semibold mb-3">9. Policy Updates</h2>
                  <p className="text-gray-700 leading-relaxed">
                    We may update this Privacy Policy periodically. Significant changes will be communicated through
                    email or platform notifications. Continued use constitutes acceptance of the updated policy.
                  </p>
                </section>

                <Separator />

                <section>
                  <h2 className="text-xl font-semibold mb-3 flex items-center">
                    <Bell className="h-5 w-5 mr-2 text-orange-600" />
                    10. Contact Us
                  </h2>
                  <div className="text-gray-700 leading-relaxed">
                    <p>For privacy-related questions or to exercise your rights, contact us:</p>
                    <ul className="list-none space-y-1 mt-2">
                      <li>
                        <strong>Privacy Officer:</strong> info@taskgen.in
                      </li>
                      <li>
                        <strong>Phone:</strong> +91 9344759416
                      </li>
                      <li>
                        <strong>Address:</strong> SF No. 598/2, 6th Floor, Gautam Complex, Udayampalayam road, Nava
                        India Rd, Coimbatore, Tamil Nadu 641028
                      </li>
                      <li>
                        <strong>Response Time:</strong> We respond within 30 days
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
