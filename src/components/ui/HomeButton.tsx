"use client"; // Required for client-side interaction

import React from "react";
import Link from "next/link";
import { HomeOutlined } from "@ant-design/icons";

const HomeButton = () => {
  return (
    <Link href="/">
      <HomeOutlined style={{ fontSize: "24px", cursor: "pointer" }} />
    </Link>
  );
};

export default HomeButton;
