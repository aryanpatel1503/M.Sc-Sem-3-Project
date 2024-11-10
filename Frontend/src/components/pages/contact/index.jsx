import React from "react";
import Layout from "../../app/Layout";
import { Button, Input, Textarea } from "@material-tailwind/react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { API_URL } from "../../lib/constant";
import contactImg from "../../../assets/Contact.jpg";

const Contact = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmitData = (values) => {
    axios
      .post(`${API_URL}/contact/add`, {
        ...values,
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success(
            response.data.message || "Feedback added Successfully",
            {
              position: "top-center",
            }
          );
          reset();
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: "top-center",
        });
        // alert(response.data.message);
      });
  };

  const onSubmitError = (error) => {
    Object.values(error).forEach((item, index) => {
      if (index === 0) {
        toast.error(item.message, {
          position: "top-center",
        });
      }
    });
  };

  return (
    <Layout>
      <div className="flex my-14">
        <div className="w-5/12 h-[428px] rounded-tl-md rounded-bl-md">
          <img
            src={contactImg}
            className="object-cover w-full h-full rounded-tl-md rounded-bl-md"
            alt="Contact Image"
          />
        </div>
        <div className="w-7/12 px-5 py-3 bg-[#f2f2f2] rounded-tr-md rounded-br-md">
          <h3 className="text-2xl font-medium">Get In Touch</h3>
          <p className="text-lg py-2">
            Your Gateway to Excellence: Contact Us and Unlock a World of
            Possibilities
          </p>

          <div className="space-y-6 pt-2">
            <div className="flex gap-x-2">
              <Controller
                control={control}
                name="username"
                rules={{ required: "Name is required" }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    size="lg"
                    label="Name"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />

              <Controller
                control={control}
                name="email"
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Enter a valid email address",
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    type="email"
                    size="lg"
                    label="Email"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </div>
            <Controller
              control={control}
              name="subject"
              rules={{ required: "Subject is required" }}
              render={({ field: { onChange, value } }) => (
                <Input
                  size="lg"
                  label="Subject"
                  value={value}
                  onChange={onChange}
                />
              )}
            />

            <Controller
              control={control}
              name="message"
              rules={{ required: "Message is required" }}
              render={({ field: { onChange, value } }) => (
                <Textarea
                  size="lg"
                  rows={4}
                  label="Message"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            <Button
              variant="filled"
              className="bg-[#F7931E]"
              type="submit"
              onClick={() => handleSubmit(onSubmitData, onSubmitError)()}
            >
              Submit Now
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
