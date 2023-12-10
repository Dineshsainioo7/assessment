import { ErrorMessage, useField, Field } from "formik";
const TextAreaField = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <div className="form-group ">
                <label htmlFor={field.name}>{label}</label>
                <textarea
                    className={props.class || `form-control`}
                    {...field}
                    {...props}
                />
                {meta.touched && meta.error ? (
                    <ErrorMessage
                        name={field.name}
                        render={(msg) => (
                            <>
                                <label
                                    htmlFor={field.name}
                                    className="text-danger"
                                >
                                    {msg}
                                </label>
                            </>
                        )}
                    />
                ) : null}
            </div>
        </>
    );
};

export default TextAreaField;
