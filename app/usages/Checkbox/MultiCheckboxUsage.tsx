"use client";

import { Checkbox } from "@/app/components/Inputs/Checkbox";
import { FormikProvider, useFormik } from "formik";
import { useCallback, useEffect, useRef, useState } from "react";

const checkboxList = [
  {
    name: "item1",
    label: "Item 1",
    value: "Item 1",
  },
  {
    name: "item2",
    label: "Item 2",
    value: "Item 2",
  },
  {
    name: "item3",
    label: "Item 3",
    value: "Item 3",
  },
  {
    name: "item4",
    label: "Item 4",
    value: "Item 4",
  },
  {
    name: "item5",
    label: "Item 5",
    value: "Item 5",
  },
];

type FormValues = {
  check_all?: string;
};

const MultiCheckboxUsage = () => {
  // Ref
  const checkedItems = useRef(new Map());
  // State
  const [, setFormValues] = useState<FormValues>();

  /**
   * Handle form submit
   * @param values: FormValues
   */
  const handleSubmit = useCallback((values: FormValues) => {
    // Convert the object to an array of key-value pairs
    const objectEntries = Object.entries(values);
    // Sort the array based on the keys (ascending order)
    const sortedEntries = objectEntries.sort((a, b) =>
      a[0].localeCompare(b[0])
    );
    // Convert the sorted array back to an object
    const sortedObject = Object.fromEntries(sortedEntries);
    // Set form values
    setFormValues(sortedObject);
  }, []);

  const formikBag = useFormik({
    enableReinitialize: true,
    initialValues: {},
    onSubmit: handleSubmit,
  });

  const isIndeterminate = checkboxList.some(
    (item) => item.value !== checkedItems.current.get(item.name)
  );

  /**
   * return true when all checkbox items is checked
   */
  const isAllChecked = checkboxList.every(
    (item) => item.value === checkedItems.current.get(item.name)
  );

  /**
   * return false when all checkbox items is checked
   */
  const isAllUnChecked = checkboxList.every(
    (item) => item.value !== checkedItems.current.get(item.name)
  );

  /**
   * Handle when Checkbox All onChange
   * @param event: React.ChangeEvent<HTMLInputElement>
   */
  const handleCheckboxAllOnchange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        checkboxList.forEach((item) => {
          formikBag.setFieldValue(item.name, item.value);
          checkedItems.current.set(item.name, item.value);
        });
      } else {
        checkboxList.forEach((item) => {
          formikBag.setFieldValue(item.name, undefined);
          checkedItems.current.set(item.name, "");
        });
      }
    },
    [formikBag]
  );

  /**
   * Handle when Checkbox Item onChange
   * @param item: { name: string; label: string; value: string }
   * @param event: React.ChangeEvent<HTMLInputElement>
   */
  const handleCheckboxItemOnchange = useCallback(
    (item: { name: string; label: string; value: string }) =>
      (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
          formikBag.setFieldValue(item.name, item.value);
          checkedItems.current.set(item.name, item.value);
        } else {
          formikBag.setFieldValue(item.name, undefined);
          checkedItems.current.set(item.name, "");
        }
      },
    [formikBag]
  );

  /**
   * Initial set checkbox items to map
   */
  useEffect(() => {
    checkboxList.map((item) => {
      checkedItems.current.set(item.name, "");
    });
  }, []);

  return (
    <FormikProvider value={formikBag}>
      {/* <div className="text-black">{JSON.stringify(formValues)}</div> */}
      <div className="flex flex-col">
        <Checkbox
          name="check_all"
          label="Check All"
          checked={isAllChecked}
          indeterminate={isAllUnChecked ? false : isIndeterminate}
          onChange={handleCheckboxAllOnchange}
        />
        <>
          {checkboxList.map((item) => (
            <Checkbox
              key={item.name}
              name={item.name}
              value={item.value}
              label={item.label}
              checked={item.value === checkedItems.current.get(item.name)}
              onChange={handleCheckboxItemOnchange(item)}
            />
          ))}
        </>
      </div>

      {/* <Button onClick={() => formikBag.submitForm()}>Submit</Button> */}
    </FormikProvider>
  );
};

export default MultiCheckboxUsage;
