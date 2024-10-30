"use client";

import { CircularProgress, FormControl, TextField } from "@mui/material";
import MUIAutocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";
import { useField } from "formik";
import React, { useCallback, useMemo, useState } from "react";

type Props<T> = {
  name: string;
  data: Array<T>;
  autoCompleteProps?: AutocompleteProps<T, undefined, undefined, undefined>;
};

type ItemValue = { label: string; value: number };

function sleep(duration: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

const Autocomplete = (props: Props<ItemValue>) => {
  // Props
  const { name, data, autoCompleteProps } = props;

  // Formik
  const [, , helper] = useField(name);

  // States
  const [item, setItem] = useState<ItemValue | null>();
  const [options, setOptions] = useState<readonly ItemValue[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  /**
   * handleOnChange
   * @param event: React.SyntheticEvent
   * @param newVal: ItemValue | null
   */
  const handleOnChange = useCallback(
    (event: React.SyntheticEvent, newVal: ItemValue | null) => {
      setItem(newVal);
      console.log("newVal.value", newVal);
      helper.setValue(newVal?.label);
    },
    [helper]
  );

  /**
   * handleOpen open AutoComplete
   */
  const handleOpen = useCallback(() => {
    setOpen(true);
    (async () => {
      setLoading(true);
      await sleep(500); // For demo purposes.
      setLoading(false);

      setOptions([...data]);
    })();
  }, [data]);

  /**
   * handleClose close AutoComplete
   */
  const handleClose = useCallback(() => {
    setOpen(false);
    setOptions([]);
  }, []);

  return useMemo(
    () => (
      <FormControl variant="standard">
        <MUIAutocomplete
          {...autoCompleteProps}
          disablePortal
          open={open}
          onOpen={handleOpen}
          onClose={handleClose}
          onChange={handleOnChange}
          value={item || null}
          options={options}
          isOptionEqualToValue={(option, value) => option.label === value.label}
          getOptionLabel={(option) => option.label}
          loading={loading}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Movie"
              slotProps={{
                input: {
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                },
              }}
            />
          )}
        />
      </FormControl>
    ),
    [
      autoCompleteProps,
      handleClose,
      handleOnChange,
      handleOpen,
      item,
      loading,
      open,
      options,
    ]
  );
};

export default Autocomplete;
