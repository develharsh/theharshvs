import { useState, useEffect, useContext } from "react";
import RichTextEditor from "../components/custom/richtext";
import { ACTIONS, blogAdd, tagsGet, tagAdd } from "../store/actions";
import { TextInput, Button, MultiSelect } from "@mantine/core";
import { useForm } from "@mantine/form";
import { DataContext } from "../store/globalstate";
import { useRouter } from "next/router";
import { showNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons";

const Compose = () => {
  const { dispatch } = useContext(DataContext);
  const [tags, setTags] = useState([]);
  const router = useRouter();
  useEffect(() => {
    fetchTags(setTags);
  }, []);

  const form = useForm({
    initialValues: {
      topic: "",
      tags: [],
      content: "",
    },

    validate: {
      topic: (value) => (value.length ? null : "Topic can't be empty"),
      tags: (value) => (value.length ? null : "At least 1 Tag is must"),
    },
  });
  const handleSubmit = async (values) => {
    dispatch({ type: ACTIONS.LOADING, payload: true });
    const response = await blogAdd(values);
    dispatch({ type: ACTIONS.LOADING, payload: false });
    if (response.success) {
      showNotification({
        title: "Congrats",
        message: response.message,
        color: "teal",
        icon: <IconCheck />,
      });
      router.push("/");
    } else {
      showNotification({
        title: "Oops",
        message: response.message,
        color: "red",
        icon: <IconX />,
      });
    }
  };
  const handleNewTag = (query) => {
    setTags((current) => [...current, { value: query, label: query }]);
    tagAdd({ title: query });
  };

  return (
    <div className="mx-1">
      <form onSubmit={form.onSubmit((v) => handleSubmit(v))}>
        <TextInput
          name="topic"
          withAsterisk
          label="Topic"
          placeholder="Enter the topic here"
          {...form.getInputProps("topic")}
        />
        <div className="my-1"></div>
        <div>
          <RichTextEditor {...form.getInputProps("content")} />
        </div>
        <div className="my-1">
          <MultiSelect
            data={tags}
            label="Add Tags"
            placeholder="Pick associated ones"
            searchable
            creatable
            clearable
            getCreateLabel={(query) => `+ Create ${query}`}
            onCreate={handleNewTag}
            {...form.getInputProps("tags")}
          />
        </div>
        <div className="flex justifycenter mb-5">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default Compose;

const fetchTags = async (setTags) => {
  const resp = await tagsGet();
  if (resp.success)
    setTags(
      resp.tags.map((each) => Object({ value: each.title, label: each.title }))
    );
};
