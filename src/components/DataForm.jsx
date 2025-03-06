import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const DataForm = ({ addData, updateData, editData, closeForm }) => {
  const initialValues = {
    title: editData ? editData.title : "",
    body: editData ? editData.body : "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    body: Yup.string().required("Body is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    if (editData) {
      updateData({ ...editData, ...values });
    } else {
      addData({ id: Date.now(), ...values });
    }
    resetForm();
    closeForm();
  };

  return (
    <div className="form-popup">
      <div className="form-container">
        <h2>{editData ? "Edit Post" : "Create New Post"}</h2>
        <Formik
          initialValues={initialValues}
          enableReinitialize={true} // ✅ Ensures form updates when switching edit mode
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            {/* Title Field */}
            <label htmlFor="title">Title:</label>
            <Field type="text" name="title" id="title" placeholder="Enter title" />
            <ErrorMessage name="title" component="div" className="error" />

            {/* Body Field */}
            <label htmlFor="body">Body:</label>
            <Field type="text" name="body" id="body" placeholder="Enter body text" />
            <ErrorMessage name="body" component="div" className="error" />

            {/* Buttons */}
            <button type="submit" className="submit-btn">
              {editData ? "Update" : "Add"}
            </button>
            <button type="button" className="cancel-btn" onClick={closeForm}>
              Cancel
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default DataForm;
