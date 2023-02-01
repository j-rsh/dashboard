import {
  Stack,
  Tag,
  Listbox,
  EmptySearchResult,
  Combobox,
} from "@shopify/polaris";
import { useState, useCallback } from "react";
import { SKILLS } from "../graphql/query";
import { useQuery } from "@apollo/client";
import { useField } from "formik";

export function Skill({ label, name }) {
  const [value, setValue] = useState("");
  const [suggestion, setSuggestion] = useState("");

  const { data } = useQuery(SKILLS, {
    variables: {
      title: value,
      limit: 5,
    },
  });

  const [field, meta, helper] = useField(name);
  const { setValue: setSelectedTags } = helper;
  console.log(setValue);

  const handleActiveOptionChange = useCallback(
    (activeOption) => {
      const activeOptionIsAction = activeOption === value;

      if (!activeOptionIsAction && !field.value.includes(activeOption)) {
        setSuggestion(activeOption);
      } else {
        setSuggestion("");
      }
    },
    [value, field.value]
  );
  const updateSelection = useCallback(
    (selected) => {
      const nextSelectedTags = new Set([...field.value]);

      if (nextSelectedTags.has(selected)) {
        nextSelectedTags.delete(selected);
      } else {
        nextSelectedTags.add(selected);
      }
      helper.setValue([...nextSelectedTags]);
      setValue("");
      setSuggestion("");
    },
    [field.value]
  );

  const removeTag = useCallback(
    (tag) => () => {
      updateSelection(tag);
    },
    [updateSelection]
  );

  const getAllTags = useCallback(() => {
    const savedTags = ["Rustic", "Antique", "Vinyl", "Vintage", "Refurbished"];
    return [...new Set([...savedTags, ...field.value].sort())];
  }, [field.value]);

  const verticalContentMarkup =
    field.value.length > 0 ? (
      <Stack spacing="extraTight" alignment="center">
        {field.value.map((tag) => (
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
            selected={field.value.includes(title)}
          >
            {title}
          </Listbox.Option>
        );
      })
    : null;

  const noResults = value && !getAllTags().includes(value);

  const actionMarkup = noResults ? (
    <Listbox.Action value={value}>{`Add "${value}"`}</Listbox.Action>
  ) : null;

  const emptyStateMarkup = optionMarkup ? null : (
    <EmptySearchResult
      title=""
      description={`No tags found matching "${value}"`}
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
            value={value}
            suggestion={suggestion}
            placeholder="Search tags"
            verticalContent={verticalContentMarkup}
            onChange={setValue}
          />
        }
      >
        {listboxMarkup}
      </Combobox>
    </div>
  );
}
