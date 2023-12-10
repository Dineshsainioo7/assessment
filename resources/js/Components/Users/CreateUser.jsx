import { Formik, Form, Field, ErrorMessage } from "formik";
import TextField from "../Form/TextField";
import TextAreaField from "../Form/TextAreaField";
import axios from "axios";
import * as yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const validationSchemaTeam = yup.object({
    name: yup
        .string()
        .min(2, "Name field must be at least 2 characters")
        .max(50, "Name field must not be greater than 50 characters")
        .required("Name field is required"),
    email: yup
        .string()
        .email("Invalid email address")
        .required("Email address is required"),
    phone_number: yup
        .string()
        .min(10, "Phone Number must be at least 10 digit")
        .matches(/^\+?[0-9]+$/, "Phone Number field is must be a number")
        .required("Phone Number field is required!"),
    description: yup
        .string()
        .min(2, "Description field must be at least 2 characters")
        .max(5000, "Description field must not be greater than 5000 characters")
        .required("Description field is required"),
    avatar: yup.mixed().required("Profile Image field is required"),
});
const CreateUser = () => {
    const [imgError, setImgError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleOnChange = (event, f) => {
        const imageFile = event.target.files[0];
        if (imageFile.name.match(/\.(jpg|jpeg|png|svg)$/)) {
            if (
                event.currentTarget.files &&
                event.currentTarget.files.length > 0
            ) {
                const reader = new FileReader();
                reader.readAsDataURL(event.currentTarget.files[0]);
                reader.onload = function (e) {
                    onImageSelected(reader.result);
                };
            }
            setImgError("");
            f.setFieldValue("avatar", event.currentTarget.files[0]);
        } else {
            setImgError("Please select only jpeg, jpg, png and svg files");
        }
    };

    const storeUser = (fields, resetForm) => {
        let data = new FormData();
        Object.keys(fields).forEach((key) => {
            data.append(key, fields[key]);
        });

        try {
            setIsLoading(true); // loader ster
            axios({
                method: "post",
                url: `/api/V1/users`,
                headers: {
                    Accept: "application/json",
                },
                data: data,
            })
                .then((response) => {
                    let result = response.data;
                    toast.success(result.message);
                    resetForm();
                    if (result.success) {
                        setTimeout(() => {
                            navigate("/");
                            setIsLoading(false); // stop loading spinner
                        }, 2000); // Adjust the delay as needed
                    }
                    if (result.success == false) {
                        toast.error(result.message);
                    }
                })
                .catch((error) => {
                    const err = error.response.data;
                    if (error.response.status) {
                        toast.error(err.message);
                        setIsLoading(false);
                    }
                    setIsLoading(false);
                });
        } catch (error) {
            toast.error(error.response.data.message);
            setIsLoading(false);
        }
    };

    return (
        <>
            <ToastContainer limit={1} hideProgressBar={true} />
            <div className="container mt-3">
                <h2>Create User</h2>
                <Formik
                    initialValues={{
                        name: "",
                        email: "",
                        phone_number: "",
                        description: "",
                        avatar: "",
                    }}
                    validationSchema={validationSchemaTeam}
                    onSubmit={(values, { resetForm }) => {
                        //resetForm();
                        storeUser(values, resetForm); // send to Api
                    }}
                >
                    {({ values, setFieldValue, field, form }) => (
                        <Form>
                            <div className="mb-3 mt-3">
                                <TextField
                                    label="Name"
                                    type="text"
                                    placeholder="Enter your name"
                                    name="name"
                                />
                            </div>
                            <div className="mb-3 mt-3">
                                <TextField
                                    label="Email Address"
                                    type="email"
                                    placeholder="Enter your email address"
                                    name="email"
                                />
                            </div>
                            <div className="mb-3">
                                <TextField
                                    label="Phone Number"
                                    type="text"
                                    placeholder="Enter your phone number"
                                    name="phone_number"
                                />
                            </div>
                            <div className="mb-3">
                                <TextAreaField
                                    label="description"
                                    placeholder="Enter your Description"
                                    name="description"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="file" className="form-label">
                                    Choose a Profile Image
                                </label>
                                <Field name="avatar">
                                    {({ field, form }) => (
                                        <>
                                            <input
                                                type="file"
                                                accept=".jpg, .jpeg, .png, .svg"
                                                className="form-control"
                                                onChange={(event) =>
                                                    handleOnChange(event, form)
                                                }
                                            />
                                        </>
                                    )}
                                </Field>
                                <ErrorMessage
                                    name="avatar"
                                    component="div"
                                    className="text-danger"
                                />
                                {imgError ? (
                                    <label className="text-danger">
                                        {imgError}
                                    </label>
                                ) : (
                                    ""
                                )}
                            </div>
                            {isLoading ? (
                                <button className="btn btn-primary" disabled>
                                    <span className="spinner-grow spinner-grow-sm"></span>
                                    Loading..
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Submit
                                </button>
                            )}
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
};

export default CreateUser;
