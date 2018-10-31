import React from 'react'
import { OPEN_MODAL, CLOSE_MODAL } from '../../../constants/action-types'
import styles from './styles.module.css'

function withModal(Component) {
  return class ComponentWithModal extends React.Component {
    state = {
      trigger: null,
    }

    showModal = (trigger, modal) => {
      this.setState({ trigger }, () => this.makeDiv(this.state.trigger, modal))
    }

    makeDiv = (trigger, modal) => {
      const fakediv = document.getElementById('modal__temp')
      if (fakediv === null) {
        const div = document.createElement('div')
        div.id = 'modal__temp'
        trigger.appendChild(div)
        this.moveTrig(trigger, modal, div)
      }
    }

    moveTrig = (trig, modal, div) => {
      const trigProps = trig.getBoundingClientRect()
      const m = modal
      const mProps = m
        .querySelector('.' + styles['modal-content'])
        .getBoundingClientRect()
      let transX, transY, scaleX, scaleY
      const xc = window.innerWidth / 2
      const yc = window.innerHeight / 2
      trig.classList.add(styles['trigger-is-active'])
      scaleX = mProps.width / trigProps.width
      scaleY = mProps.height / trigProps.height
      scaleX = scaleX.toFixed(3)
      scaleY = scaleY.toFixed(3)
      transX = Math.round(xc - trigProps.left - trigProps.width / 2)
      transY = Math.round(yc - trigProps.top - trigProps.height / 2)
      if (m.classList.contains(styles['modal-align-top'])) {
        transY = Math.round(
          mProps.height / 2 + mProps.top - trigProps.top - trigProps.height / 2
        )
      }
      trig.style.transform = `translate(${transX}px, ${transY}px)`
      div.style.transform = `scale(${scaleX}, ${scaleY})`
      window.requestAnimationFrame(() => {
        this.open(m, div)
      })
    }

    open = (m, div) => {
      const { isOpenModal, dispatch } = this.props
      let content
      function hideDiv() {
        div.style.opacity = '0'
        content.removeEventListener('transitionend', hideDiv, false)
      }
      if (!isOpenModal) {
        content = m.querySelector('.' + styles['modal-content'])
        m.classList.add(styles['modal-is-active'])
        content.classList.add(styles['modal-content-is-active'])
        content.addEventListener('transitionend', hideDiv, false)
        dispatch({ type: OPEN_MODAL })
      }
    }

    hideModal = (modal, content) => {
      const { trigger } = this.state
      function removeDiv() {
        setTimeout(function() {
          window.requestAnimationFrame(function() {
            div.remove()
          })
        }, 150)
      }
      const { isOpenModal, dispatch } = this.props
      const div = document.getElementById('modal__temp')

      if (isOpenModal) {
        div.style.opacity = '1'
        div.removeAttribute('style')
        modal.classList.remove(styles['modal-is-active'])
        content.classList.remove(styles['modal-content-is-active'])
        trigger.style.transform = 'translate(0)'
        trigger.classList.remove(styles['trigger-is-active'])
        div.addEventListener('transitionend', removeDiv, false)
        this.setState({ trigger: null })
        dispatch({ type: CLOSE_MODAL })
      }
    }

    render() {
      return (
        <Component
          {...this.props}
          {...this.state}
          showModal={this.showModal}
          hideModal={this.hideModal}
        />
      )
    }
  }
}

export default withModal
