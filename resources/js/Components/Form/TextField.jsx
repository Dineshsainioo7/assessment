import { ErrorMessage, useField, Field, Formik } from "formik";

const TextField = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <div className="form-group">
                <label htmlFor={field.name} className={props.asterisks || ""}>
                    {label}
                </label>
                <Field
                    className={props.class || `form-control`}
                    {...field}
                    {...props}
                />
                <ErrorMessage
                    name={field.name}
                    render={(msg) => (
                        <>
                            <label htmlFor={field.name} className="text-danger">
                                {msg}
                            </label>
                        </>
                    )}
                />
            </div>
        </>
    );
};

export default TextField;
