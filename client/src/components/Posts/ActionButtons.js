import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faYoutube } from '@fortawesome/free-brands-svg-icons'
import  {faCirclePlay, faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { PostContext } from '../../contexts/PostContext'


const ActionButtons = ({_id, url}) => {
  const {deletePost, findPost, setShowUpdatePostModal} = useContext(PostContext);


  const onFindPostHandler = (postId) => {
    findPost(postId);
    setShowUpdatePostModal(true);
  }

  return (
    <div className='func-button'>
    <Button className='post-button' href={url} target='_blank'>
      <FontAwesomeIcon icon={faCirclePlay} alt='play'/>
    </Button>
    <Button className='post-button' onClick={onFindPostHandler.bind(this, _id)}>
      <FontAwesomeIcon icon={faPenToSquare} alt='edit'/>
    </Button>
    <Button className='post-button' onClick={deletePost.bind(this, _id)}>
      <FontAwesomeIcon icon={faTrashCan} alt='delete'/>
    </Button>
    </div>
  )
}

export default ActionButtons