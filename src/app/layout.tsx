"use client"; // Required for client-side UI components

import React from "react";
import { ConfigProvider, App as AntdApp } from "antd";
import "antd/dist/reset.css";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import CartIcon from "@/components/CartIcon";
import HomeButton from "@/components/ui/HomeButton";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Change primary color
    <ConfigProvider theme={{ token: { colorPrimary: "#1890ff" } }}>
      <html lang="en">
        <body>
          <Provider store={store}>
            <AntdApp>
              <header
                style={{
                  padding: "16px",
                  backgroundColor: "#f0f2f5",
                  textAlign: "right",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <HomeButton />
                  <CartIcon />
                </div>
              </header>
              {children}
            </AntdApp>
          </Provider>
        </body>
      </html>
    </ConfigProvider>
  );
}
