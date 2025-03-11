import React from "react";
import { motion } from "framer-motion";

const Kontakt = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.2 },
    },
  };

  const contactGroups = [
    {
      title: "Hlavní sídlo",
      icon: "🏫",
      color: "from-blue-400 to-blue-300",
      items: [
        { text: "Základní umělecká škola Heřmanův Městec" },
        { text: "Jarkovského 47" },
        { text: "538 03 Heřmanův Městec" },
      ],
    },
    {
      title: "Kontaktní údaje",
      icon: "📞",
      color: "from-green-400 to-green-300",
      items: [
        { text: "Základní umělecká škola Heřmanův Městec" },
        { text: "Jarkovského 47" },
        { text: "538 03 Heřmanův Městec" },
        { text: "IČO: 691 70 207" },
        { text: "IZO: 117" },
        { text: "" },
        { text: "" },
        { text: "" },
      ],
    },
    {
      title: "Vedení školy",
      icon: "👥",
      color: "from-purple-400 to-purple-300",
      items: [
        { text: "MgA. Štěpán Křováček - ředitel školy" },
        { text: "Miluše Kratochvílová - zástupce ředitele a ekonom" },
        { text: "Lukáš Kyncl - zástupce ředitele" },
      ],
    },
    {
      title: "Platební údaje",
      icon: "💳",
      color: "from-yellow-400 to-yellow-300",
      items: [
        { text: "Číslo účtu: 1141833369/0800" },
        { text: "Banka: Česká spořitelna a.s." },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6 flex items-center">
      <motion.div
      className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      >
      {contactGroups.map((group, index) => (
        <motion.div
        key={index}
        variants={itemVariants}
        className="bg-white rounded-xl shadow-md overflow-hidden"
        >
        <div className={`bg-gradient-to-r ${group.color} p-4`}>
          <div className="flex items-center">
          <span className="text-3xl mr-3">{group.icon}</span>
          <h2 className="text-white font-bold text-xl">{group.title}</h2>
          </div>
        </div>
        <div className="p-4">
          {group.items.map((item, idx) => (
          <motion.div
            key={idx}
            className="py-2"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            {item.text}
          </motion.div>
          ))}
        </div>
        </motion.div>
      ))}
      </motion.div>
    </div>
  );
};

export default Kontakt;
