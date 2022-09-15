// import React from 'react'
import { useForm } from "@mantine/form";
import { TextInput, Button } from "@mantine/core";
import { useContext } from "react";
import { DataContext } from "../../store/globalstate";
import { ACTIONS, subscribe } from "../../store/actions";
import { showNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons";

const Subscribe = () => {
  const { dispatch } = useContext(DataContext);
  const form = useForm({
    initialValues: {
      email: "",
    },

    validate: {
      email: (value) => (/^\S+@\S.\S+$/.test(value) ? null : "Invalid email"),
    },
  });
  const handleSubmit = async (values) => {
    dispatch({ type: ACTIONS.LOADING, payload: true });
    const response = await subscribe(values);
    dispatch({ type: ACTIONS.LOADING, payload: false });
    if (response.success) {
      showNotification({
        title: "Congrats",
        message: response.message,
        color: "teal",
        icon: <IconCheck />,
      });
      form.reset();
    } else {
      showNotification({
        title: "Oops",
        message: response.message,
        color: "red",
        icon: <IconX />,
      });
    }
  };
  return (
    <div
      style={{
        // background:"red",
        justifyContent: "center",
      }}
      className="flex mx-1"
    >
      <form
        onSubmit={form.onSubmit((v) => handleSubmit(v))}
        className="flex"
        style={{ width: "16rem" }}
      >
        <TextInput
          name="email"
          withAsterisk
          placeholder="Subscribe With Email"
          {...form.getInputProps("email")}
          radius="0"
        />
        <div className="flex justifycenter">
          <Button
            type="submit"
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan" }}
            className="sharp-radius"
          >
            Subscribe
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Subscribe;
