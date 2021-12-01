import React, { useEffect, useMemo, useState } from 'react'
import { Button, Checkbox, Form, Input, message, Select, Upload } from 'antd'
// @ts-ignore
import styled from 'styled-components'
import { UploadProps } from 'antd/lib/upload/interface'
import { RcFile } from 'antd/es/upload'
import { LoadingOutlined } from '@ant-design/icons'
import { pinFileToIPFS } from '../../utils/ipfs'
import { useWeb3React } from '@web3-react/core'
import { Wallet } from '../../web3/connectors'
import { useWalletSelectionModal } from '../../hooks/wallet-selection-modal'
import useCreateNft from '../../hooks/contract/service/useNftCreate'
import { useLocationQuery } from '../../hooks/useLocationQuery'

const Wrapper = styled.div`
  width: 100%;
  height: fit-content;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 60px;

  .title {
    font-weight: 550;
    font-size: 46px;

    background-image: -webkit-linear-gradient(left, #00EBA4, #02A6F5);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    padding-bottom: 20px;
  }

  @media screen and ( max-width: 1000px ){
    padding-top: 2rem;
    .title {
      font-weight: 550;
      font-size: 3rem;
      margin-bottom: 0;
    }
  }
`

const NFTForm = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 1200px;
  height: fit-content;
  background: #1D222D;
  border: 2px solid #02A6F5;
  border-radius: 20px;
  padding: 0 20px;
  

  .text-area {
    &::placeholder {
      color: #ccc !important;
    }

    height: 10rem !important;
    background: #305099 !important;
    border-radius: 1rem !important;
    border: none;

    font-size: 1.4rem !important;
    font-weight: 500 !important;
    color: white !important;
    line-height: 2rem !important;
  }

  @media screen and ( max-width: 1000px ) {
    width: 90vw;
    padding: 0 3rem;

    h1 {
      font-size: 1.5rem;
    }

  }
`

const CreatForm = styled.div`
  display: flex;
  justify-content: space-between;
`

const LeftAreaForm = styled.div`
  h1 {
    font-size: 18px;
    font-weight: 500;
    color: #00EBA4;
    line-height: 2.8rem;
  }
`

const RightAreaForm = styled.div`
  h1 {
    text-align: center;
    font-size: 18px;
    font-weight: 500;
    color: #00EBA4;
    line-height: 2.8rem
  }
`

const NFTFormItem = styled(Form.Item)`
  width: 600px;
  margin-top: 20px;
  display: flex; 

  .ant-form-item-label > label {
    font-size: 18px;
    font-weight: 500;
    color: #fff;
  }

  .ant-input {
    &::placeholder {
      color: #ccc;
    }

    height: 36px ;
    background: #2A2E35 !important;
    border-radius: 10px !important;
    border: none;

    font-size: 16px !important;
    font-weight: 500 !important;
    color: white !important;
    line-height: 20px !important;
  }
`

const Selector = styled(Select)`
  width: 200px !important;
  border: none;

  .ant-select-selector {
    width: 200px !important;
    height: 35px !important;
    background: #2A2E35  !important;
    border-radius: 10px !important;
    border: none;
  }

  .ant-select-clear {
    background-color: transparent;
  }

  .ant-select-selection-item {
    display: flex;
    align-items: center !important;
    justify-content: center !important;
    font-size: 16px !important;
    font-weight: 500 !important;
    color: white !important;
    padding-right: 20px !important;
  }
  span {
    color: white;
    position: absolute;
    left: 10px;
  }

`

export const Announcement = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .text {
    height: 70px;
    font-size: 16px;
    font-weight: 500;
    color: #ccc;
  }

  @media screen and ( max-width: 1000px ) {
    .text {
      font-size: 1rem;
      margin-bottom: 2.5rem;
    }

  }
`

const AssetUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: fit-content;

  .upload-border {
    width: 400px;
    height: 540px;
    background: #2A2E35 ;
    border-radius: 1rem;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    img {
      margin-top: 10rem;
      margin-bottom: 4.3rem;
      width: 8.2rem;
    }

    .tip {
      text-align: center;
      width: 100%;
      font-size: 16px;
      font-weight: 500;
      color: #ccc;
      opacity: 0.5;
      filter: alpha(opacity=50); /* IE8 及其更早版本 */
    }

    .tip:nth-of-type(1) {
      margin-bottom: 1.2rem;
    }

    .tip:nth-of-type(2) {
      margin-bottom: 10rem;
    }

    img.pinned {
      width: 300px;
      margin: 25px;
    }

    .loading {
      margin: 100px 100px;
      font-size: 40px;
      color: #4779B5;
    }
  }

  .upload-btn {
    margin-top: 30px;
    width: 135px;
    height: 40px;
    background: #4779B5;
    border-radius: 10px;
    text-align: center;

    font-size: 16px;
    font-weight: 500;
    color: #ffffff;
  }
`

const CreatButton = styled.button`
  width: 200px;
  height: 40px;
  border-radius: 8px;
  margin-left: calc((100% - 200px) / 2);
  background-image: linear-gradient(to right, #00EBA4, #02A6F5);
  border: none;
  color: white;
  font-weight: bolder;
`

export type NFTCreateForm = {
    artworkName: string
    artistName: string
    briefIntroduction: string
    artworkType: string
    socialMedia: string
    assetIpfsHash: string
}

type AssetUploadProps = {
    onUploadSuccess: (_assetIpfsHash: string) => void
}

type MessageHintProps = {
  message?: string,
  type?: 'error' | 'hint' | 'success'
}

const MessageHint: React.FC<MessageHintProps> = ({ message, type }) => {
  const color = type ? {
    'error': 'red',
    'success': 'rgb(82,196,26)',
    'hint': 'red'
  }[type] : ''

  return (
    <p style={{ fontSize: '1.2rem', color }}>
      {message}
    </p>
  )
}

const AssetUpload: React.FC<AssetUploadProps> = ({ onUploadSuccess }) => {
  const aiUri = useLocationQuery('img')

  console.log(aiUri)

  const [fileList, setFileList] = useState<RcFile[]>([])

  const [pinnedFileHash, setPinnedFileHash] = useState<any>()

  const [uploading, setUploading] = useState(false)

  const handleUpload = () => {
    if (!fileList[0]) {
      return
    }

    setUploading(true)
    setPinnedFileHash(undefined)

    pinFileToIPFS(fileList[0])
      .then(r => {
        setPinnedFileHash(r.data.IpfsHash)
        onUploadSuccess(r.data.IpfsHash)
        setUploading(false)

      }).catch(e => {
        setUploading(false)
        message.warn(`Upload failed. [${e}]`)
      })
  }

  const uploadProps: UploadProps = {
    showUploadList: false,
    name: 'file',
    maxCount: 1,
    beforeUpload: async file => {
      setFileList([file])
      return false
    },
    fileList,
    progress: {
      strokeColor: {
        '0%': '#ffabe1',
        '50%': '#a685e2',
        '100%': '#7c6deb'
      },
      strokeWidth: 6,
      format: (percent: any) => `${parseFloat(percent.toFixed(2))}%`
    }
  }

  useEffect(handleUpload,[fileList])

  return (
    <AssetUploadContainer>
      <Upload {...uploadProps}>
        {
          pinnedFileHash ? (
            <div className="upload-border">
              <img className="pinned" src={`https://forart.mypinata.cloud/ipfs/${pinnedFileHash}`} alt="" />
            </div>
          ) : uploading ? (
            <div className="upload-border">
              <LoadingOutlined className="loading" />
            </div>
          ) : (
            <div className="upload-border">
              {/* <img src={UploadBtn} alt="upload-btn" />*/}
              <div className="tip">Support: png / jpg /</div>
              <div className="tip">Size: 10M/</div>
            </div>
          ) ?
            aiUri ? (
              <div className="upload-border">
                <img className="pinned" src={`${aiUri}`} alt="" />
              </div>
            ): (
              <div className="upload-border">
                {/* <img src={UploadBtn} alt="upload-btn" />*/}
                <div className="tip">Support: png / jpg /</div>
                <div className="tip">Size: 10M/</div>
              </div>
            ) :
            (
              <div />
            )
        }
      </Upload>

    </AssetUploadContainer>
  )
}

const NFTCreate: React.FC<{ wallet: Wallet }> = ({ wallet }) => {

  const { account } = useWeb3React()

  const { createNft, hint } = useCreateNft()

  const aiUri = useLocationQuery('img')

  const creating = useMemo(() => !!hint.message && hint.type === 'hint',[hint])

  const [promised, setPromised] = useState(false)

  const [form] = Form.useForm<NFTCreateForm>()

  const formInitialValues: NFTCreateForm = {
    artistName: '',
    artworkName: '',
    artworkType: 'pictures',
    briefIntroduction: '',
    socialMedia: '',
    assetIpfsHash: ''
  }

  const onAssetUploadSuccess = (assetIpfsHash: string) => {
    form.setFieldsValue({ assetIpfsHash })
  }

  useEffect(() => {
    if (aiUri) {
      onAssetUploadSuccess(aiUri.substring(aiUri.lastIndexOf('/') + 1))
    }
  }, [aiUri])

  const { open } = useWalletSelectionModal()

  return (
    <Wrapper >
      <div className="title">NFT Create </div>
      <NFTForm form={form} colon={false} layout="vertical" initialValues={formInitialValues} >
        <CreatForm>
          <LeftAreaForm>
            <h1>1. Artwork Information</h1>
            <NFTFormItem
              name="artworkType"
              label="Artwork Type"
              rules={[{ required: true, message: 'Artwork Type is Required!' }]}
            >
              <Selector
                onChange={(value: any) => {
                  form.setFieldsValue({ artworkType: value })
                }}
              >
                <Select.Option value="pictures">
                  Pictures
                </Select.Option>
                <Select.Option value="gif">GIF</Select.Option>
                <Select.Option value="video">Video</Select.Option>
                <Select.Option value="audio">Audio</Select.Option>
              </Selector>
            </NFTFormItem>

            <NFTFormItem
              name="artworkName"
              label="Artwork Name"
              rules={[{ required: true, message: 'Artwork Name is Required!' }]}
            >
              <Input placeholder="Enter the artwork name" />
            </NFTFormItem>

            <NFTFormItem
              name="artistName"
              label="Artist Name"
              rules={[{ required: true, message: 'Artist Name is Required!' }]}
            >
              <Input placeholder="Enter the artist name" />
            </NFTFormItem>

            <NFTFormItem
              name="socialMedia"
              label="Social Media/Portfolio link"
              rules={[{ required: true, message: 'Social Media/Portfolio link is Required!' }]}
            >
              <Input placeholder="Personal website" />
            </NFTFormItem>

            <NFTFormItem
              name="briefIntroduction"
              label="Brief Introduction"
              rules={[{ required: true, message: 'Brief Introduction is Required!' }]}
            >
              <Input.TextArea rows={4} placeholder="Enter the Brief introduction" className="text-area" />
            </NFTFormItem>
          </LeftAreaForm>

          <RightAreaForm>
            <h1>2. Upload Artwork Image</h1>

            <NFTFormItem
              name="assetIpfsHash"
              rules={[{ required: true }]}
            >
              <AssetUpload onUploadSuccess={onAssetUploadSuccess} />
            </NFTFormItem>
          </RightAreaForm>
        </CreatForm>
        <Announcement>
          <Checkbox checked={promised} onChange={ e => setPromised(e.target.checked)}>
            <div className="text">
              I declare that this is an original artwork. I understand that no plagiarism is allowed, and that the
              artwork can be removed anytime if detected.
            </div>
          </Checkbox>
        </Announcement>
        {
          account === undefined ? (
            <CreatButton onClick={open}>
              Connect
            </CreatButton>
          ) : (
            <CreatButton onClick={ ()=>
              createNft(form, promised)}
            >
              Create
            </CreatButton>
          )
        }

        <MessageHint {...hint} />


      </NFTForm>


    </Wrapper>
  )
}

export default NFTCreate
