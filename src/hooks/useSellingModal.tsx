import React, { useState } from 'react'
import { useModal } from './useModal'
// @ts-ignore
import styled from 'styled-components'
import { Button, Checkbox, Form, Input, InputNumber, Modal, Select } from 'antd'
import useNFTSell from './contract/service/useNFTSell'


const SellingModal = styled(Modal)`
  display: flex;
  justify-content: center;
  .ant-modal-close-icon {
    color: white;
  }

  .ant-modal-content {
    border-radius: 10px;
    width: 600px;
    height: 350px;
    background-color: #1D222D; !important;
  }

  .ant-modal-body,
  .ant-modal-header {
    background-color: #1D222D; !important;

  }

  .ant-modal-header {
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    border-bottom: none;
  }

  .ant-modal-header .ant-modal-title { 
    display: flex;
    justify-content: center; 
    color: white;
    font-weight: 550;
    font-size: 28px;
  }
`

const SellMethodContainer = styled.div`
  width: 100%;
  height: 60px;
  
  .border {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .ant-btn:hover, .ant-btn:focus, .ant-btn:active {
      background-color: #00EBA4; !important;
      color: #ffffff;
    }
  }
`


const Line = styled.div`
  position: absolute;
  right: 0;
  top: 50px;
  width: 100%;
  height: 3px;
  background: linear-gradient(to right, #00EBA4, #02A6F5);
`

const Title = styled.div`
  color: #00EBA4;
  font-size: 20px;
  font-weight: bolder;
  margin-bottom: 10px;
`

const MethodButton = styled(Button)`
  background-image: linear-gradient(to right, #00EBA4, #02A6F5);
  border: none;
  color: white;
  font-weight: bolder;
  border-radius: 10px;

  

  .tabs__link {
    background-color: #6974FF; !important;
    color: #ffffff;
  }
`

const StyledForm = styled(Form)`
  width: 100%;

  .price-container {
    width: 100%;

    .ant-input-group {
      width: 100%;
    }
    
    .ant-input-number {
      background-color: #2A2E35;
      width: 150px;
      color: white;
      font-size: 14px;
      border: 1px #00EBA4 solid;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
    }

    .ant-input-number-handler-up,  .ant-input-number-handler-down {
      background-color: #2A2E35;
      border: none;
      
      span {
        color: #fff;
      }
    }
    
    .ant-select-selector {
      width: 100px;
      display: flex;
      align-items: center;
      color: white;
      background: #2A2E35 !important;
      border: 1px #00EBA4 solid;
      
    }

  
    
    .ant-select-arrow > span {
      color: #00EBA4
    }

    .ant-select-selection-item {
      color: white;
      font-weight: 550;
    }

    .ant-input-group.ant-input-group-compact > *:first-child, .ant-input-group.ant-input-group-compact > .ant-select:first-child > .ant-select-selector, .ant-input-group.ant-input-group-compact > .ant-select-auto-complete:first-child .ant-input, .ant-input-group.ant-input-group-compact > .ant-cascader-picker:first-child .ant-input {
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
    }
    .ant-input {
      width: 170px !important;
      color: white;
      font-weight: 550;
      background: #2A2E35 !important;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
      border: 1px #00EBA4 solid;
    }
  }
`

const Announcement = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;


  .text {
    width: 100%;
    font-size: 15px;
    color: #ffffff;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
`

export const StyledButton = styled(Button)`
  width: 100%;
  background-image: linear-gradient(to right, #00EBA4, #02A6F5);
  border: none;
  color: white;
  font-weight: bolder;
  border-radius: 10px;
`

type SellingModalProps = {
  nftDetail: any
  onSellingConfirmed: () => void
  onStart: () => void
}

type MessageHintProps = {
  message?: string,
  type?: 'error' | 'hint' | 'success'
}


const MessageHint: React.FC<MessageHintProps> = ({ message, type }) => {
  const color = type ? {
    'error': '#CD1818',
    'success': '#B4FE98',
    'hint': '#94B3FD'
  }[type] : ''

  return (
    <p style={{ fontSize: '14px', fontWeight: 'bold', color }}>
      {message}
    </p>
  )
}

export type NFTSellForm = {
  price: string
}


export const useSellingModal = ({ nftDetail, onSellingConfirmed, onStart } :SellingModalProps) => {

  const formInitialValues: NFTSellForm = {
    price: ''
  }


  const { sellNFT, hint } = useNFTSell()

  const [form] = Form.useForm<NFTSellForm>()

  const [ checked, setChecked] = useState(false)



  const checkCheckbox = () => new Promise<void>((resolve, reject) => {
    if (!checked) {
      reject()
    }
    resolve()
  })



  const handleListing = async (values: typeof formInitialValues) => {
    onStart()
    await sellNFT(nftDetail, form, checked)
    onSellingConfirmed()
  }

  const onListingButtonClicked = async () => {
    checkCheckbox()
      .then(() => form.validateFields())
      .then(handleListing)
  }


  const { modal, open, close } = useModal((_open, close, visible) => (
    <SellingModal
      title="Selling"
      visible={visible}
      onCancel={close}
      footer={null}
    >
      <Line />

      <SellMethodContainer>
        {/*<Title>Sell Method</Title>*/}
        {/*<div className="border" >*/}
        {/*  {*/}
        {/*    AVAILABLE_SELLING_METHODS.map((item:string, index: number) => (*/}
        {/*      <MethodButton*/}
        {/*        className={clsx(index === current && 'tabs__link')}*/}
        {/*        onClick={() => setCurrent(index)}*/}
        {/*        key={index}*/}
        {/*      >*/}
        {/*        {item}*/}
        {/*      </MethodButton>*/}
        {/*    ))*/}
        {/*  }*/}
        {/*</div>*/}
        <Title>Set Price</Title>
        <StyledForm form= {form} initialValues= {formInitialValues}>
          <div className="price-container">
            <Input.Group compact>
              <Select defaultValue="Celo">
                <Select.Option value= "Celo"> Celo </Select.Option>
              </Select>
              <Form.Item name="price">
                <InputNumber
                  formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
                />
              </Form.Item>
            </Input.Group>
          </div>
        </StyledForm>
        <Announcement>
          <Checkbox
            checked={checked}
            onChange={e => setChecked(e.target.checked)}
          >
            <div className="text">
              Listing is free! At the time of the sale, the following fees will be decucted.
            </div>
            <div className="text">
              <div>Total fees</div>
              <div> 2%</div>

            </div>
          </Checkbox>
          <StyledButton onClick={ onListingButtonClicked }>Listing</StyledButton>
        </Announcement>

        <MessageHint {...hint} />
      </SellMethodContainer>


    </SellingModal>
  ))


  return {
    sellingModal: modal,
    openSellingModal: open,
    closeSellingModal: close
  }

}
