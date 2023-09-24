import { Meta, StoryObj } from "@storybook/react";
import { Router } from "react-router-dom";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Header from "./Header";

export default {
  title: "Components/Header",
  component: Header,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<>{Story()}</>} />
        </Routes>
      </BrowserRouter>
    ),
  ],
} as Meta;

export const Default: StoryObj = {};
