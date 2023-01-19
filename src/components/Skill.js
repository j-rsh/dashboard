import {
  Stack,
  Tag,
  Listbox,
  EmptySearchResult,
  Combobox,
  Text,
} from "@shopify/polaris";
import { useState, useCallback, useMemo } from "react";
import { SKILLS } from "../graphql/query";
import { useQuery } from "@apollo/client";
import { useField } from "formik";

export function Skill({ label, name }) {
  const [selectedTags, setSelectedTags] = useState([]);
  //   const [value, setValue] = useState("");
  const [suggestion, setSuggestion] = useState("");

  const { data } = useQuery(SKILLS, {
    variables: {
      title: field.value,
      limit: 5,
    },
  });

  const [field, meta, helper] = useField(name);
  //   console.log(field);
  const { setValue } = helper;
  console.log(helper.setValue);

  const handleActiveOptionChange = useCallback(
    (activeOption) => {
      const activeOptionIsAction = activeOption === field.value;

      if (!activeOptionIsAction && !selectedTags.includes(activeOption)) {
        setSuggestion(activeOption);
      } else {
        setSuggestion("");
      }
    },
    [field.value, selectedTags]
  );
  const updateSelection = useCallback(
    (selected) => {
      const nextSelectedTags = new Set([...selectedTags]);

      if (nextSelectedTags.has(selected)) {
        nextSelectedTags.delete(selected);
      } else {
        nextSelectedTags.add(selected);
      }
      setSelectedTags([...nextSelectedTags]);
      helper.setValue("");
      setSuggestion("");
    },
    [selectedTags]
  );

  const removeTag = useCallback(
    (tag) => () => {
      updateSelection(tag);
    },
    [updateSelection]
  );

  const getAllTags = useCallback(() => {
    const savedTags = ["Rustic", "Antique", "Vinyl", "Vintage", "Refurbished"];
    return [...new Set([...savedTags, ...selectedTags].sort())];
  }, [selectedTags]);

  const formatOptionText = useCallback(
    (option) => {
      const trimValue = field.value.trim().toLocaleLowerCase();
      const matchIndex = option.toLocaleLowerCase().indexOf(trimValue);

      if (!field.value || matchIndex === -1) return option;

      const start = option.slice(0, matchIndex);
      const highlight = option.slice(matchIndex, matchIndex + trimValue.length);
      const end = option.slice(matchIndex + trimValue.length, option.length);

      return (
        <p>
          {start}
          <Text variant="bodyMd" fontWeight="bold" as="span">
            {highlight}
          </Text>
          {end}
        </p>
      );
    },
    [field.value]
  );

  const options = useMemo(() => {
    let list;
    const allTags = getAllTags();
    const filterRegex = new RegExp(field.value, "i");

    if (field.value) {
      list = allTags.filter((tag) => tag.match(filterRegex));
    } else {
      list = allTags;
    }

    return [...list];
  }, [field.value, getAllTags]);

  const verticalContentMarkup =
    selectedTags.length > 0 ? (
      <Stack spacing="extraTight" alignment="center">
        {selectedTags.map((tag) => (
          <Tag key={`option-${tag}`} onRemove={removeTag(tag)}>
            {tag}
          </Tag>
        ))}
      </Stack>
    ) : null;

  const optionMarkup = data
    ? data.skills.skills.map((option) => {
        const { title, id } = option;

        return (
          <Listbox.Option
            key={`${title + id}`}
            value={title}
            selected={selectedTags.includes(title)}
            // accessibilityLabel={label}
          >
            {title}
          </Listbox.Option>
        );
      })
    : null;

  const noResults = field.value && !getAllTags().includes(field.value);

  const actionMarkup = noResults ? (
    <Listbox.Action
      value={field.value}
    >{`Add "${field.value}"`}</Listbox.Action>
  ) : null;

  const emptyStateMarkup = optionMarkup ? null : (
    <EmptySearchResult
      title=""
      description={`No tags found matching "${field.value}"`}
    />
  );

  const listboxMarkup =
    optionMarkup || actionMarkup || emptyStateMarkup ? (
      <Listbox
        autoSelection="FIRST"
        onSelect={updateSelection}
        onActiveOptionChange={handleActiveOptionChange}
      >
        {actionMarkup}
        {optionMarkup}
      </Listbox>
    ) : null;

  return (
    <div style={{ height: "225px" }}>
      <Combobox
        allowMultiple
        activator={
          <Combobox.TextField
            autoComplete="off"
            label="Search tags"
            labelHidden
            value={field.value}
            suggestion={suggestion}
            placeholder="Search tags"
            verticalContent={verticalContentMarkup}
            onChange={helper.setValue}
          />
        }
      >
        {listboxMarkup}
      </Combobox>
    </div>
  );
}

// import React from "react";
// import { useField, Form, FormikProps, Formik } from "formik";
// import { Tag, Listbox, Combobox, TextContainer, Stack } from "@shopify/polaris";
// import { useState, useCallback, useMemo } from "react";

// export function MultiManualComboboxExample() {
//   const deselectedOptions = useMemo(
//     () => [
//       { value: "rustic", label: "Rustic" },
//       { value: "antique", label: "Antique" },
//       { value: "vinyl", label: "Vinyl" },
//       { value: "vintage", label: "Vintage" },
//       { value: "refurbished", label: "Refurbished" },
//     ],
//     []
//   );

//   const [selectedOptions, setSelectedOptions] = useState([]);
//   const [inputValue, setInputValue] = useState("");
//   const [options, setOptions] = useState(deselectedOptions);

//   const { data } = useQuery(SKILLS, {
//     variables: {
//       title: inputValue,
//       limit: 5,
//     },
//   });
//   console.log(data);

//   const updateText = useCallback(
//     (value) => {
//       setInputValue(value);

//       if (value === "") {
//         setOptions(deselectedOptions);
//         return;
//       }

//       const filterRegex = new RegExp(value, "i");
//       const resultOptions = deselectedOptions.filter((option) =>
//         option.label.match(filterRegex)
//       );
//       setOptions(resultOptions);
//     },
//     [deselectedOptions]
//   );

//   const updateSelection = useCallback(
//     (selected) => {
//       if (selectedOptions.includes(selected)) {
//         setSelectedOptions(
//           selectedOptions.filter((option) => option !== selected)
//         );
//       } else {
//         setSelectedOptions([...selectedOptions, selected]);
//       }

//       const matchedOption = options.find((option) => {
//         return option.value.match(selected);
//       });

//       updateText("");
//     },
//     [options, selectedOptions, updateText]
//   );

//   const removeTag = useCallback(
//     (tag) => () => {
//       const options = [...selectedOptions];
//       options.splice(options.indexOf(tag), 1);
//       setSelectedOptions(options);
//     },
//     [selectedOptions]
//   );

//   const tagsMarkup = selectedOptions.map((option) => (
//     <Tag key={`option-${option}`} onRemove={removeTag(option)}>
//       {option}
//     </Tag>
//   ));

//   const optionsMarkup = data
//     ? data.skills.skills.map((option) => {
//         const { title, id } = option;

//         return (
//           <Listbox.Option
//             key={`${title + id}`}
//             value={title}
//             selected={selectedOptions.includes(title)}
//             // accessibilityLabel={label}
//           >
//             {title}
//           </Listbox.Option>
//         );
//       })
//     : null;

//   const noResults = !selectedOptions.includes(inputValue);
//   const actionMarkup = noResults ? (
//     <Listbox.Action value={inputValue}>{`Add ${inputValue}`}</Listbox.Action>
//   ) : null;

//   return (
//     <div style={{ height: "225px" }}>
//       <Formik>
//         <Form>
//           <Combobox
//             allowMultiple
//             activator={
//               <Combobox.TextField
//                 // prefix={<Icon source={SearchMinor} />}
//                 onChange={updateText}
//                 label="Search tags"
//                 labelHidden
//                 value={inputValue}
//                 placeholder="Search tags"
//               />
//             }
//           >
//             {optionsMarkup ? (
//               <Listbox autoSelection="NONE" onSelect={updateSelection}>
//                 {optionsMarkup}
//               </Listbox>
//             ) : null}
//           </Combobox>
//           <TextContainer>
//             <Stack>{tagsMarkup}</Stack>
//           </TextContainer>
//         </Form>
//       </Formik>
//     </div>
//   );
// }