const FormInput = ({ label, ...otherProps }) => {
    return (
        <div className="form-input">
            <label htmlFor="">{label}</label>
            <input {...otherProps} />
        </div>
    );
};

export default FormInput;
