import React from 'react'
import {
  Facebook,
  GooglePlus,
  Instagram,
  Twitter,
  Youtube,
} from '../../common/icons'
import styles from './styles.module.css'

function renderSocialIcon(social, withBg = false) {
  switch (social) {
    case 'facebook':
      return <Facebook withBg={withBg} />
    case 'google+':
      return <GooglePlus withBg={withBg} />
    case 'instagram':
      return <Instagram withBg={withBg} />
    case 'twitter':
      return <Twitter withBg={withBg} />
    case 'youtube':
      return <Youtube withBg={withBg} />
    default:
      return null
  }
}

const Profile = ({ hasSeveralAccounts = false, avatarUrl, social }) =>
  hasSeveralAccounts ? (
    <div className={styles['is-multiple']}>
      <img src={avatarUrl} alt="userpic" />
      {renderSocialIcon(social, true)}
    </div>
  ) : (
    renderSocialIcon(social)
  )

export default Profile
