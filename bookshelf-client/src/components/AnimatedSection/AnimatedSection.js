import React from "react";
import { motion } from "framer-motion";

const AnimatedSection = ({ children }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, translateX: "200px" },
        visible: { opacity: 1, translateX: 0 }
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
