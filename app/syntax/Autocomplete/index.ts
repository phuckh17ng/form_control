export const AutocompleteSyntax = `
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

`;

export const AutoCompleteUsageSyntax = `
import { FormikProvider, useFormik } from "formik";
import { useCallback, useMemo } from "react";
import Autocomplete from "../../components/Inputs/Autocomplete";
import top100Films from "../../database/top100Films";

type FormValues = {
  auto_complete?: string;
};

const AutocompleteUsage = () => {
  const handleSubmit = useCallback((value: FormValues) => {
    console.log("value", value);
  }, []);

  const formikBag = useFormik({
    enableReinitialize: true,
    initialValues: { auto_complete: undefined },
    onSubmit: handleSubmit,
  });

  return useMemo(
    () => (
      <FormikProvider value={formikBag}>
        <Autocomplete data={top100Films} name="auto_complete" />
        {/* <Button onClick={() => formikBag.submitForm()}>Click</Button> */}
      </FormikProvider>
    ),
    [formikBag]
  );
};

export default AutocompleteUsage;

`;

export const top100FilmsSyntax = `
const top100Films = [
  { label: "The Shawshank Redemption", value: 1994 },
  { label: "The Godfather", value: 1972 },
  { label: "The Godfather: Part II", value: 1974 },
  { label: "The Dark Knight", value: 2008 },
  { label: "12 Angry Men", value: 1957 },
  { label: "Schindler's List", value: 1993 },
  { label: "Pulp Fiction", value: 1994 },
  {
    label: "The Lord of the Rings: The Return of the King",
    value: 2003,
  },
  { label: "The Good, the Bad and the Ugly", value: 1966 },
  { label: "Fight Club", value: 1999 },
  {
    label: "The Lord of the Rings: The Fellowship of the Ring",
    value: 2001,
  },
  {
    label: "Star Wars: Episode V - The Empire Strikes Back",
    value: 1980,
  },
  { label: "Forrest Gump", value: 1994 },
  { label: "Inception", value: 2010 },
  {
    label: "The Lord of the Rings: The Two Towers",
    value: 2002,
  },
  { label: "One Flew Over the Cuckoo's Nest", value: 1975 },
  { label: "Goodfellas", value: 1990 },
  { label: "The Matrix", value: 1999 },
  { label: "Seven Samurai", value: 1954 },
  {
    label: "Star Wars: Episode IV - A New Hope",
    value: 1977,
  },
  { label: "City of God", value: 2002 },
  { label: "Se7en", value: 1995 },
  { label: "The Silence of the Lambs", value: 1991 },
  { label: "It's a Wonderful Life", value: 1946 },
  { label: "Life Is Beautiful", value: 1997 },
  { label: "The Usual Suspects", value: 1995 },
  { label: "Léon: The Professional", value: 1994 },
  { label: "Spirited Away", value: 2001 },
  { label: "Saving Private Ryan", value: 1998 },
  { label: "Once Upon a Time in the West", value: 1968 },
  { label: "American History X", value: 1998 },
  { label: "Interstellar", value: 2014 },
  { label: "Casablanca", value: 1942 },
  { label: "City Lights", value: 1931 },
  { label: "Psycho", value: 1960 },
  { label: "The Green Mile", value: 1999 },
  { label: "The Intouchables", value: 2011 },
  { label: "Modern Times", value: 1936 },
  { label: "Raiders of the Lost Ark", value: 1981 },
  { label: "Rear Window", value: 1954 },
  { label: "The Pianist", value: 2002 },
  { label: "The Departed", value: 2006 },
  { label: "Terminator 2: Judgment Day", value: 1991 },
  { label: "Back to the Future", value: 1985 },
  { label: "Whiplash", value: 2014 },
  { label: "Gladiator", value: 2000 },
  { label: "Memento", value: 2000 },
  { label: "The Prestige", value: 2006 },
  { label: "The Lion King", value: 1994 },
  { label: "Apocalypse Now", value: 1979 },
  { label: "Alien", value: 1979 },
  { label: "Sunset Boulevard", value: 1950 },
  {
    label:
      "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
    value: 1964,
  },
  { label: "The Great Dictator", value: 1940 },
  { label: "Cinema Paradiso", value: 1988 },
  { label: "The Lives of Others", value: 2006 },
  { label: "Grave of the Fireflies", value: 1988 },
  { label: "Paths of Glory", value: 1957 },
  { label: "Django Unchained", value: 2012 },
  { label: "The Shining", value: 1980 },
  { label: "WALL·E", value: 2008 },
  { label: "American Beauty", value: 1999 },
  { label: "The Dark Knight Rises", value: 2012 },
  { label: "Princess Mononoke", value: 1997 },
  { label: "Aliens", value: 1986 },
  { label: "Oldboy", value: 2003 },
  { label: "Once Upon a Time in America", value: 1984 },
  { label: "Witness for the Prosecution", value: 1957 },
  { label: "Das Boot", value: 1981 },
  { label: "Citizen Kane", value: 1941 },
  { label: "North by Northwest", value: 1959 },
  { label: "Vertigo", value: 1958 },
  {
    label: "Star Wars: Episode VI - Return of the Jedi",
    value: 1983,
  },
  { label: "Reservoir Dogs", value: 1992 },
  { label: "Braveheart", value: 1995 },
  { label: "M", value: 1931 },
  { label: "Requiem for a Dream", value: 2000 },
  { label: "Amélie", value: 2001 },
  { label: "A Clockwork Orange", value: 1971 },
  { label: "Like Stars on Earth", value: 2007 },
  { label: "Taxi Driver", value: 1976 },
  { label: "Lawrence of Arabia", value: 1962 },
  { label: "Double Indemnity", value: 1944 },
  {
    label: "Eternal Sunshine of the Spotless Mind",
    value: 2004,
  },
  { label: "Amadeus", value: 1984 },
  { label: "To Kill a Mockingbird", value: 1962 },
  { label: "Toy Story 3", value: 2010 },
  { label: "Logan", value: 2017 },
  { label: "Full Metal Jacket", value: 1987 },
  { label: "Dangal", value: 2016 },
  { label: "The Sting", value: 1973 },
  { label: "2001: A Space Odyssey", value: 1968 },
  { label: "Singin' in the Rain", value: 1952 },
  { label: "Toy Story", value: 1995 },
  { label: "Bicycle Thieves", value: 1948 },
  { label: "The Kid", value: 1921 },
  { label: "Inglourious Basterds", value: 2009 },
  { label: "Snatch", value: 2000 },
  { label: "3 Idiots", value: 2009 },
  { label: "Monty Python and the Holy Grail", value: 1975 },
];

export default top100Films;

`;
