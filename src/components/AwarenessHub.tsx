import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ShieldIcon } from './icons/ShieldIcon';
import { WarningIcon } from './icons/WarningIcon';
import { CheckIcon } from './icons/CheckIcon';
import { ToolboxIcon } from './icons/ToolboxIcon';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100 },
  },
};

const Card: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <motion.div variants={itemVariants} className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700">
    <div className="flex items-center gap-3 mb-4">
      <div className="text-blue-400">{icon}</div>
      <h3 className="text-xl font-semibold text-slate-100">{title}</h3>
    </div>
    <div className="text-slate-300 space-y-3">{children}</div>
  </motion.div>
);

const ListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex items-start gap-3">
    <CheckIcon className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
    <p>{children}</p>
  </div>
);

const AwarenessHub: React.FC = () => {
  return (
    <motion.div
      key="awareness-hub"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <header className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">Welcome to the Awareness Hub</h2>
        <p className="mt-2 text-slate-400 max-w-2xl mx-auto">
          Knowledge is your best defense. Learn to spot and avoid phishing attacks.
        </p>
      </header>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <Card title="What is Phishing?" icon={<WarningIcon className="h-6 w-6" />}>
          <p>
            Phishing is a fraudulent attempt to obtain sensitive information such as usernames, passwords, and credit card details by disguising as a trustworthy entity in an electronic communication.
          </p>
        </Card>

        <Card title="Common Red Flags" icon={<WarningIcon className="h-6 w-6" />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ListItem><strong>Urgent or Threatening Language:</strong> Creates a sense of panic to rush you into action.</ListItem>
            <ListItem><strong>Spelling & Grammar Errors:</strong> Professional companies usually proofread their emails.</ListItem>
            <ListItem><strong>Mismatched Links:</strong> Hover over links before clicking. The destination URL should match the context.</ListItem>
            <ListItem><strong>Generic Greetings:</strong> "Dear Valued Customer" instead of your name can be a warning sign.</ListItem>
            <ListItem><strong>Unexpected Attachments:</strong> Be wary of unsolicited files, as they can contain malware.</ListItem>
            <ListItem><strong>Suspicious Sender Address:</strong> Look for slight misspellings or unusual domains.</ListItem>
          </div>
        </Card>

        <Card title="Your Defense Strategy" icon={<ShieldIcon className="h-6 w-6" />}>
          <ul className="space-y-3">
            <ListItem><strong>Think Before You Click:</strong> Always be skeptical of unsolicited emails. If it seems too good to be true, it probably is.</ListItem>
            <ListItem><strong>Verify the Sender:</strong> Check the sender's email address carefully. If in doubt, contact the company through an official channel.</ListItem>
            <ListItem><strong>Use Multi-Factor Authentication (MFA):</strong> MFA adds an extra layer of security, making it harder for attackers to access your accounts.</ListItem>
            <ListItem><strong>Report Suspicious Emails:</strong> Use your email client's "Report Phishing" feature to help protect others.</ListItem>
          </ul>
        </Card>

        <Card title="Analyst Toolkit: Proactive Defense" icon={<ToolboxIcon className="h-6 w-6" />}>
           <p className="text-slate-400 mb-4">For cybersecurity professionals, here are key technologies and standards to implement for robust organizational defense:</p>
            <ul className="space-y-3">
                <ListItem><strong>Email Security Gateways (ESGs):</strong> Deploy advanced ESGs with sandboxing and threat intelligence to filter malicious emails before they reach inboxes.</ListItem>
                <ListItem><strong>DMARC, DKIM, & SPF:</strong> Implement and enforce these email authentication standards to prevent domain spoofing and improve email deliverability.</ListItem>
                <ListItem><strong>SIEM & SOAR Platforms:</strong> Integrate email security logs with a SIEM for centralized monitoring and use SOAR playbooks to automate incident response for phishing attacks.</ListItem>
                <ListItem><strong>User & Entity Behavior Analytics (UEBA):</strong> Use UEBA to detect anomalous activity that could indicate a compromised account resulting from a successful phish.</ListItem>
                <ListItem><strong>Advanced Threat Protection (ATP):</strong> Leverage ATP services that scan attachments and links in real-time to block zero-day threats.</ListItem>
            </ul>
        </Card>

      </motion.div>
    </motion.div>
  );
};

export default AwarenessHub;