import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import allActions from '../../../actions'

const TutorialInitial = () => {
  const [tutorial] = useState(window.localStorage.getItem('tutorial'))
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(allActions.tutorialActions.setTutorial(JSON.parse(tutorial)))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <></>
}

export default TutorialInitial
