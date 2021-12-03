import nftDetail from '../../pages/marketplace/nftDetail'
import React, { useCallback, useState } from 'react'
import { Button, Checkbox, Divider, message, Modal } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

// @ts-ignore
import styled from 'styled-components'
import { useModal } from '../useModal'
import useCheckBalance from '../contract/service/useCheckBalance'

const PurchaseCheckoutModal = styled(Modal)`
  display: flex;
  justify-content: center;

  .ant-modal-close-icon {
    color: white;
  }

  .ant-modal-content {
    border-radius: 10px;

  }

  .ant-modal-body,
  .ant-modal-header{
    background-color: #2A2E35; !important;
    width: 900px;

  }
  .ant-modal-header {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom: none;
  }

  .ant-modal-header .ant-modal-title {
    display: flex;
    justify-content: center;
    font-weight: 550;
    color: white;
    font-size: 28px;
  }

  .checkout-list {
    display: flex;
    justify-content: space-between;
    color: #00EBA4;
    p {
      font-size: 24px;
      font-weight: 550;
    }
  }

  .checkout-detail {
    display: flex;
    justify-content: space-between;
    width: 100%;
    flex-direction: row;

    .ntf-info {
      display: flex;
      width: 100%;



      .nft-image {
        object-fit: contain;
        width: 120px;
        height: 120px;
        border-radius: 10px;
      }

      .nft-detail {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-left: 20px;
        align-self: center;

        .artist-name {
          font-size: 22px;
          font-weight: bolder;
          color: #00EBA4;
        }

        .nft-name {
          font-size: 18px;
          font-weight: 550;
          line-height: 2.5rem;
          color: #00EBA4;

        }
      }
    }

    .nft-value {
      flex-direction: column;
      align-self: center;
      width: 200px;
      text-align: right;


      .nft-price {
        color: #00EBA4;
        font-size: 26px;
        font-weight: 500;

      }

      .nft-price-dollar {
        color: #00EBA4;
        font-size: 22px;
        font-weight: bolder;
      }
    }
  }

  .total-price {
    display: flex;
    justify-content: space-between;
    margin-top: 40px;

    .total {
      font-size: 24px;
      font-weight: 550;
      color: #00EBA4;
    }

    .nft-value {
      display: flex;
      flex-direction: column;
      align-self: center;
      text-align: right;

      .nft-price {
        display: flex;
        justify-content: flex-end;
        font-size: 26px;
        font-weight: bolder;
        color: #00EBA4;
      }

      .nft-price-dollar {
        display: flex;
        justify-content: flex-end;
        font-size: 22px;
        font-weight: bolder;
        color: #00EBA4;
      }
    }
  }

  .footer {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    

    .ant-btn > span {
      font-weight: bolder;
    }
  }
`

const Announcement = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 40px;
  width: 100%;

  .ant-checkbox + span {
    color: #00EBA4;
    font-size: 18px;
  }
`

const Line = styled.div`
  position: absolute;
  right: 0;
  top: 50px;
  width: 100%;
  height: 2px;
  background-image: linear-gradient(to right, #00EBA4, #02A6F5);
`

const StyledButton = styled(Button)`
  font-size: 20px;
  background-image: linear-gradient(to right, #00EBA4, #02A6F5);
  border: none;
  color: white;
  font-weight: bolder;
  border-radius: 10px;
  height: 40px;
`

export const usePurchaseCheckoutModal = (nftDetail: any, checkoutPassed: () => void, checkoutFailed: () => void) => {

  const  [ allChecked, setAllChecked ] = useState(false)

  const [checking, setChecking] = useState(false)

  const checkboxOptions = [
    'By checking this box. I acknowledge that this item has not been reviewed or approved by Forart',
    'By checking this box. I agree to Forart\'s Terms of Services'
  ]

  const onChange = (e: any) => setAllChecked(e.length === checkboxOptions.length)

  const { checkBalance }  = useCheckBalance()

  const handleCheckout = async () => {
    setChecking(true)
    await checkBalance(nftDetail)

  }


  const buildModalByNftDetail = useCallback((close: () => void, visible: boolean) => (
    <PurchaseCheckoutModal
      title="Checkout"
      visible={visible}
      onCancel={close}
      footer={null}
    >
      <Line />
      <div className="checkout-list">
        <p>Item</p>
        <p>Subtotal</p>
      </div>
      <Line />
      <div className="checkout-detail">
        <div className="ntf-info">
          <img className="nft-image" src={nftDetail?.image} alt="" />
          <div className="nft-detail">
            <div className="artist-name">{nftDetail?.name}</div>
            <div className="nft-name">{nftDetail?.description}</div>
          </div>
        </div>
        <div className="nft-value">
          <div className="nft-price">
            {/*<ETHIcon />*/}
            {nftDetail?.price ? nftDetail?.price : '---'}
          </div>
          <div className="nft-price-dollar">( $ - )</div>
        </div>
      </div>
      <Line  />
      <div className="total-price">
        <div className="total">Total</div>
        <div className="nft-value">
          <div className="nft-price">
            {/*<ETHIcon />*/}
            {nftDetail?.price ? nftDetail?.price : '- - -'}
          </div>
          <div className="nft-price-dollar">( $ - )</div>
        </div>
      </div>

      <Announcement>
        <Checkbox.Group options={checkboxOptions} onChange={onChange} />
      </Announcement>

      <div className="footer">
        <StyledButton disabled={!allChecked || checking} onClick={ handleCheckout } >
          {
            checking ? (<><LoadingOutlined />&nbsp;Checking...</>) : 'Checkout'
          }
        </StyledButton>
      </div>
    </PurchaseCheckoutModal>
  ), [nftDetail, allChecked, onChange])

  const { modal, open, close } = useModal((_open, close, visible) => buildModalByNftDetail(close, visible))


  return {
    purchaseCheckoutModal: modal,
    openPurchaseCheckoutModal: open,
    closePurchaseCheckoutModal: close
  }
}
