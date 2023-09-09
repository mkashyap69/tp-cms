/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
import { Card, Col, Form, Input, Modal, Select } from 'antd';
import Image from 'next/image';
import React, { useState } from 'react';
import { AudioGallery } from './AudioGallery';
// import { DEFAULT_BANNER_AUDIO } from '../../../resources'
// import { AudioGallery } from '../../AudioAssetsView'

const { Option } = Select;

function AddEditTextQuestionForm(props: {
  dontShowAnswer?: any;
  selectedQuestion?: any;
  changeAudioReference?: any;
}) {
  const { selectedQuestion, changeAudioReference } = props;
  const [answerIndex, setanswerIndex] = useState(
    selectedQuestion ? selectedQuestion.answerIndex : null
  );
  const [option1, setOption1] = useState(
    selectedQuestion && selectedQuestion.option && selectedQuestion.option[0]
      ? selectedQuestion.option[0]
      : null
  );
  const [option2, setOption2] = useState(
    selectedQuestion && selectedQuestion.option && selectedQuestion.option[1]
      ? selectedQuestion.option[1]
      : null
  );
  const [option3, setOption3] = useState(
    selectedQuestion && selectedQuestion.option && selectedQuestion.option[2]
      ? selectedQuestion.option[2]
      : null
  );
  const [option4, setOption4] = useState(
    selectedQuestion && selectedQuestion.option && selectedQuestion.option[3]
      ? selectedQuestion.option[3]
      : null
  );

  const [question, setQuestion] = useState();
  const [imageGallery, toggleImageGallery] = useState(false);
  const [imageAsset, setImageAsset] = useState({});
  console.log(imageAsset);

  const [audioReference, setAudioReference] = useState(
    selectedQuestion && selectedQuestion.audioReference
      ? selectedQuestion.audioReference
      : null
  );

  console.log('Audio', audioReference, selectedQuestion);

  const handleQuestionChange = (event: {
    target: { value: React.SetStateAction<undefined> };
  }) => {
    setQuestion(event.target.value);
  };

  const handleanswerIndexChange = (answerIndex: any) => {
    setanswerIndex(answerIndex);
  };
  const handlerOption1Change = (event: { target: { value: any } }) => {
    setOption1(event.target.value);
  };

  const handlerOption2Change = (event: { target: { value: any } }) => {
    setOption2(event.target.value);
  };

  const handlerOption3Change = (event: { target: { value: any } }) => {
    setOption3(event.target.value);
  };

  const handlerOption4Change = (event: { target: { value: any } }) => {
    setOption4(event.target.value);
  };

  return (
    <>
      <Form.Item
        name={['question']}
        label="Question Name"
        rules={[{ required: true }]}
      >
        <Input
          placeholder="Enter the Question here"
          //@ts-ignore

          onChange={handleQuestionChange}
        />
      </Form.Item>
      <Form.Item>
        <Col span={12}>
          <p>Audio reference</p>
          <span
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '200px',
              alignItems: 'center',
            }}
          >
            <Card
              hoverable
              className="asset-card"
              // bodyStyle={{ padding: '0px' }}
              // style={{ height: 175, width: 175, margin: 0 }}
              onClick={() => {
                toggleImageGallery(true);
              }}
              cover={
                <Image
                  className="thumbnail"
                  src={'/DEFAULT_BANNER_AUDIO'}
                  alt="audio"
                  width={100}
                  height={100}
                />
              }
              style={{
                width: '200px',
                height: '210px',
              }}
              bodyStyle={{ padding: '0px' }}
            />
            {audioReference && (
              <audio controls style={{ width: '150px' }}>
                <source src={audioReference} type="audio/ogg" />
                Your browser does not support the audio element.
              </audio>
            )}
          </span>
        </Col>
      </Form.Item>
      <Form.Item
        name={['option1']}
        label="Option 1"
        rules={[{ required: true }]}
      >
        <Input
          placeholder="Enter Option 1 Here"
          onChange={handlerOption1Change}
        />
      </Form.Item>
      <Form.Item
        name={['option2']}
        label="Option 2"
        rules={[{ required: true }]}
      >
        <Input
          placeholder="Enter Option 2 Here"
          onChange={handlerOption2Change}
        />
      </Form.Item>
      <Form.Item name={['option3']} label="Option 3">
        <Input
          placeholder="Enter Option 3 Here"
          onChange={handlerOption3Change}
        />
      </Form.Item>
      <Form.Item name={['option4']} label="Option 4">
        <Input
          placeholder="Enter Option 4 Here"
          onChange={handlerOption4Change}
        />
      </Form.Item>

      {props.dontShowAnswer ? (
        ''
      ) : (
        <Form.Item
          name={['answerIndex']}
          label="Answer"
          rules={[{ required: true }]}
        >
          <Select
            placeholder="Select Answer"
            allowClear
            onChange={handleanswerIndexChange}
          >
            <Option value={0} key={0} disabled={!option1}>
              Option 1
            </Option>
            <Option value={1} key={1} disabled={!(option1 && option2)}>
              Option 2
            </Option>
            {option3 ? (
              <>
                <Option
                  value={2}
                  key={2}
                  disabled={!(option1 && option2 && option3)}
                >
                  Option 3
                </Option>
              </>
            ) : (
              ''
            )}
            {option4 ? (
              <>
                <Option
                  value={3}
                  key={3}
                  disabled={!(option1 && option2 && option3 && option4)}
                >
                  Option 4
                </Option>
              </>
            ) : (
              ''
            )}
          </Select>
        </Form.Item>
      )}
      <Modal
        bodyStyle={{ height: '520px', overflowY: 'scroll' }}
        width={1344}
        title="Assets"
        visible={imageGallery}
        onOk={() => {
          //   setAudioReference(imageAsset.url)
          //   changeAudioReference(imageAsset.url)
          toggleImageGallery(false);
        }}
        onCancel={() => {
          toggleImageGallery(false);
        }}
      >
        <AudioGallery
          //@ts-ignore

          tab="audio"
          isOpen={imageGallery}
          onSelect={(asset: React.SetStateAction<{}>) => {
            setImageAsset(asset);
          }}
          value={audioReference}
        />
      </Modal>
    </>
  );
}

export default AddEditTextQuestionForm;
