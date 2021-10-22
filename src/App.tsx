import React from "react";
import SingleCombobox from "./components/SingleCombobox";
import MultipleCombobox from "./components/MultipleCombobox";

export default function App() {
  return (
    <div className={'app'}>
      <h2>Single</h2>
      <SingleCombobox />
      <h2>Multiple</h2>
      <MultipleCombobox />
    </div>
  );
}
