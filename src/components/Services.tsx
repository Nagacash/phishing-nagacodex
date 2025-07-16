import React from 'react';
import { motion, Variants } from 'framer-motion';
import { BriefcaseIcon } from './icons/BriefcaseIcon';
import { CheckIcon } from './icons/CheckIcon';
import { EnvelopeIcon } from './icons/EnvelopeIcon';

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

// Re-defining Card and ListItem for this component to maintain styling consistency.
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

const Services: React.FC = () => {
  return (
    <motion.div
      key="services"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <header className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">
          Our Services - Naga Codex
        </h2>
        <p className="mt-2 text-slate-400 max-w-2xl mx-auto">
          Expert cybersecurity training and system hardening to protect your organization.
        </p>
      </header>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <Card title="Corporate Phishing Training" icon={<BriefcaseIcon className="h-6 w-6" />}>
          <p>
            Equip your employees with the skills to identify and report phishing attempts. Our engaging, interactive training sessions are tailored to your organization's specific threat landscape.
          </p>
          <ul className="space-y-3 pt-2">
            <ListItem>Live, simulated phishing campaigns to test and reinforce learning.</ListItem>
            <ListItem>Customized content relevant to your industry and business operations.</ListItem>
            <ListItem>Clear, actionable reporting on employee performance and organizational risk.</ListItem>
            <ListItem>Best practices for creating a culture of security awareness.</ListItem>
          </ul>
        </Card>

        <Card title="Cybersecurity Hardening" icon={<BriefcaseIcon className="h-6 w-6" />}>
          <p>
            Strengthen your defenses from the ground up. We analyze your systems, identify vulnerabilities, and implement robust security controls to minimize your attack surface.
          </p>
          <ul className="space-y-3 pt-2">
            <ListItem>Comprehensive security audits of networks, servers, and applications.</ListItem>
            <ListItem>Implementation of security standards like CIS Benchmarks.</ListItem>
            <ListItem>Configuration of firewalls, email security gateways, and endpoint protection.</ListItem>
            <ListItem>Guidance on implementing DMARC, DKIM, and SPF to prevent email spoofing.</ListItem>
          </ul>
        </Card>

        <Card title="Get a Quote" icon={<EnvelopeIcon className="h-6 w-6" />}>
          <p>
            Ready to enhance your organization's security posture? Contact us today for a consultation and a customized quote tailored to your needs.
          </p>
          <div className="mt-4">
            <a 
              href="mailto:chosenfewrecords@hotmail.de" 
              className="inline-flex items-center gap-2 px-5 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-all"
            >
              Contact Naga Codes
            </a>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Services;