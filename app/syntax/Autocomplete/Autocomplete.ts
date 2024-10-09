export const AutocompleteSyntax = `
"use client";

import { CircularProgress, FormControl, TextField } from "@mui/material";
import MUIAutocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";
import { useField } from "formik";
import React, { useCallback, useState } from "react";

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
  const { name, data, autoCompleteProps } = props;
  const [, , helper] = useField(name);
  const [item, setItem] = useState<ItemValue>();
  const [options, setOptions] = useState<readonly ItemValue[]>([]);

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  /**
   * handleOnChange
   */
  const handleOnChange = useCallback(
    (event: never, newVal: ItemValue) => {
      setItem(newVal);
      console.log("newVal.value", newVal);
      helper.setValue(newVal?.label);
    },
    [helper]
  );

  /**
   * handleOpen
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

  const handleClose = useCallback(() => {
    setOpen(false);
    setOptions([]);
  }, []);

  return (
    <FormControl variant="standard">
      <MUIAutocomplete
        {...autoCompleteProps}
        disablePortal
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        onChange={handleOnChange as never}
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
  );
};

export default Autocomplete;
`;
