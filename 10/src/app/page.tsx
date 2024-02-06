"use client";

import Home from "@/components/Home";
import About from "@/components/About";
import Contact from "@/components/Contact";
import { motion } from "framer-motion";
import { useState } from "react";
import "@/styles/page.css";

export default function Top() {
  const [activeTab, setActiveTab] = useState<string>("Home");

  const tabContent: { [key: string]: JSX.Element } = {
    Home: <Home />,
    About: <About />,
    Contact: <Contact />,
  };

  return (
    <main className="h-[100vh] flex items-center justify-center bg-gray-400">
      <div className="card h-[700px] w-[500px] bg-white p-1 rounded-[10px]">
        <div className="flex">
          {Object.keys(tabContent).map((tab) => (
            <div
              key={tab}
              className={`w-[33%] h-[50px] mx-auto flex items-center p-1 rounded-[5px] relative ${
                activeTab === tab ? "bg-gray-300" : ""
              }`}
              style={{ userSelect: "none" }}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
              {activeTab === tab ? (
                <motion.div className="underline" layoutId="underline" />
              ) : null}
            </div>
          ))}
        </div>
        <motion.div
          className="card-body"
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          {tabContent[activeTab]}
        </motion.div>
      </div>
    </main>
  );
}
