import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

export default function HeroHeading() {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-3 text-5xl font-bold text-gray-900"
    >
      <Sparkles className="size-10 text-yellow-400" />
      Hello, world!
    </motion.h1>
  );
}
