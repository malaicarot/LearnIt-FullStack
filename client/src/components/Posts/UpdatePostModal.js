import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { PostContext } from "../../contexts/PostContext";
const UpdatePostModal = () => {
  const {
    showUpdatePostModal,
    setShowUpdatePostModal,
    updatePost,
    setShowToast,
    postsState: { post },
  } = useContext(PostContext);

  const [updateValue, setUpdateValue] = useState(post);

  useEffect(() => setUpdateValue(post), [post]);

  const { title, description, url, status } = updateValue;

  const onChangeUpdatePost = (event) => {
    setUpdateValue({ ...updateValue, [event.target.name]: event.target.value });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const { success } = await updatePost(post._id, updateValue);
    setShowUpdatePostModal(false);
    setShowToast({
      show: true,
      message: "Update skill success. LearnIt!!!",
      type: success ? "success" : "danger",
    });
  };

  const closeModalHandler = () => {
    setUpdateValue(post);
    setShowUpdatePostModal(false);
  };

  return (
    <div>
      <Modal show={showUpdatePostModal} onHide={closeModalHandler}>
        <Modal.Header closeButton onHide={closeModalHandler}>
          <Modal.Title>Making progress!!!</Modal.Title>
        </Modal.Header>
        <Form onSubmit={onSubmitHandler}>
          <Modal.Body>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Title"
                name="title"
                required
                aria-describedby="title-help"
                value={title}
                onChange={onChangeUpdatePost}
              />
              <Form.Text id="title-help" muted>
                Required
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Description"
                name="description"
                value={description}
                onChange={onChangeUpdatePost}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="URL"
                name="url"
                value={url}
                onChange={onChangeUpdatePost}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                as="select"
                name="status"
                value={status}
                onChange={onChangeUpdatePost}
              >
                <option value="TO LEARN">TO LEARN</option>
                <option value="LEARNING">LEARNING</option>
                <option value="LEARNED">LEARNED</option>
              </Form.Control>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModalHandler}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              LearnIt!
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default UpdatePostModal;
