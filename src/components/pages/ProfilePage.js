import React from 'react'
import { Container, Row } from 'react-bootstrap'
import Tabs from '../Tabs'
import ProfileDetailsPage from './ProfileDetailsPage'
import UpdateProfilePage from './UpdateProfilePage'
// --------------------------------------------------------------------

const myTabs = [
    {href: "profile", title: "Profile Details",active: '' , component:<ProfileDetailsPage />},
    {href: "update-account", title: "Update Account",active: '' , component: <UpdateProfilePage /> },
 
]
// --------------------------------------------------------------------



export default function ProfilePage() {
  return (
    <Container>
        <Row  className='mt-6'>
            <Tabs myTabs={myTabs} />
        </Row>
    </Container>
  )
}
