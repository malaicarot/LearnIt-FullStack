import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { PostContext } from "../../contexts/PostContext";
const AddPostMoDal = () => {
  const { showPostModal, setShowPostModal, addPost, setShowToast } = useContext(PostContext);

  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    url: "",
    status: "TO LEARN",
  });
  const { title, description, url, status } = newPost;

  const onChangeNewPostFrom = (event) => {
    setNewPost({ ...newPost, [event.target.name]: event.target.value });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const { success } = await addPost(newPost);

    resetData();
    setShowToast({
      show: true,
      message: 'Add skill success. LearnIt!!!',
      type: success ? 'success' : 'danger'

    })
  };

  const closeModalHandler = () => {
    resetData();
  };

  // Set lại dữ liệu newPost = rỗng và tắt Modal = false
  const resetData = () => {
    setNewPost({
      title: "",
      description: "",
      url: "",
      status: "TO LEARN",
    });
    setShowPostModal(false);
  };

  return (
    <div>
      <Modal show={showPostModal} onHide={closeModalHandler}>
        <Modal.Header closeButton onHide={closeModalHandler}>
          <Modal.Title>What do you want to learn!</Modal.Title>
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
                onChange={onChangeNewPostFrom}
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
                onChange={onChangeNewPostFrom}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="URL"
                name="url"
                value={url}
                onChange={onChangeNewPostFrom}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModalHandler}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">LearnIt!</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default AddPostMoDal;
