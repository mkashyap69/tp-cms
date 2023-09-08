/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import { Col, Input, Card, Row, Form, Modal, Select, Alert } from 'antd';
import { AudioGallery } from './AudioGallery';
import { Gallery } from './Gallery';
import Image from 'next/image';

const { Option } = Select;

function AddImageQuestionForm(props: {
  dontShowAnswer?: any;
  selectedQuestion?: any;
  setImageUrls?: any;
  changeAudioReference?: any;
}) {
  const { selectedQuestion, setImageUrls, changeAudioReference } = props;

  const [question, setQuestion] = useState();
  const [option1, setOption1] = useState(
    selectedQuestion && selectedQuestion?.option && selectedQuestion?.option[0]
      ? selectedQuestion?.option[0]
      : null
  );
  const [option2, setOption2] = useState(
    selectedQuestion && selectedQuestion?.option && selectedQuestion?.option[1]
      ? selectedQuestion?.option[1]
      : null
  );
  const [option3, setOption3] = useState(
    selectedQuestion && selectedQuestion?.option && selectedQuestion?.option[2]
      ? selectedQuestion?.option[2]
      : null
  );
  const [option4, setOption4] = useState(
    selectedQuestion && selectedQuestion?.option && selectedQuestion?.option[3]
      ? selectedQuestion?.option[3]
      : null
  );
  const [answerIndex, setanswerIndex] = useState();
  const [imageGallery, toggleImageGallery] = useState(false);
  const [audioGallery, toggleAudioGallery] = useState(false);
  const [imageAsset, setImageAsset] = useState<any>({});
  const [optionIndex, setOptionIndex] = useState(1);
  const [page, setPage] = useState(1);

  const [audioReference, setAudioReference] = useState(
    selectedQuestion && selectedQuestion?.audioReference
      ? selectedQuestion?.audioReference
      : null
  );

  const handleQuestionChange = (event: {
    target: { value: React.SetStateAction<undefined> };
  }) => {
    setQuestion(event.target.value);
  };

  const handleanswerIndexChange = (
    answerIndex: React.SetStateAction<undefined>
  ) => {
    setanswerIndex(answerIndex);
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
          defaultValue={question}
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
              bodyStyle={{ padding: '0px' }}
              style={{ height: 175, width: 175, margin: 0 }}
              onClick={() => {
                toggleAudioGallery(true);
              }}
              cover={<Image className="thumbnail" src={''} alt="audio" />}
              // style={{
              //   width: '200px',
              //   height: '210px',
              // }}
              // bodyStyle={{ padding: '0px' }}
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
      <div style={{ marginBottom: '20px' }}>
        <Alert
          message="You must select Option 1 and Option 2"
          type="info"
          showIcon
          banner
        />
      </div>
      <Row>
        <Col span={12}>
          <p>
            <span style={{ color: 'red' }}>* </span>
            Option 1
          </p>

          <Card
            hoverable
            className="asset-card"
            bodyStyle={{ padding: '0px' }}
            style={{ height: 175, width: 175, margin: 0 }}
            onClick={() => {
              setOptionIndex(1);
              toggleImageGallery(true);
            }}
            cover={
              <>
                <Image
                  src={option1 || ''}
                  className="thumbnail"
                  //@ts-ignore

                  height={100}
                  alt="option1 comes here"
                />
              </>
            }
          >
            <h5 style={{ textAlign: 'center', marginBottom: '0px' }}>
              Change Option
            </h5>
          </Card>
        </Col>
        <Col span={12}>
          <p>
            <span style={{ color: 'red' }}>* </span>
            Option 2
          </p>

          <Card
            hoverable
            className="asset-card"
            bodyStyle={{ padding: '0px' }}
            style={{ height: 175, width: 175, margin: 0 }}
            onClick={() => {
              setOptionIndex(2);
              toggleImageGallery(true);
            }}
            cover={
              <>
                <Image
                  src={option2 || ''}
                  className="thumbnail"
                  height={100}
                  alt="option2 comes here"
                />
              </>
            }
          >
            <h5 style={{ textAlign: 'center', marginBottom: '0px' }}>
              Change Option
            </h5>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col span={12}>
          <p>Option 3</p>
          <Card
            hoverable
            className="asset-card"
            bodyStyle={{ padding: '0px' }}
            style={{ height: 175, width: 175, margin: 0 }}
            onClick={() => {
              setOptionIndex(3);
              toggleImageGallery(true);
            }}
            cover={
              <>
                <Image
                  src={option3 || ''}
                  className="thumbnail"
                  height={100}
                  alt="asset"
                />
              </>
            }
          >
            <h5 style={{ textAlign: 'center', marginBottom: '0px' }}>
              Change Option
            </h5>
          </Card>
        </Col>
        <Col span={12}>
          <p>Option 4</p>
          <Card
            hoverable
            className="asset-card"
            bodyStyle={{ padding: '0px' }}
            style={{ height: 175, width: 175, margin: 0 }}
            onClick={() => {
              setOptionIndex(4);
              toggleImageGallery(true);
            }}
            cover={
              <>
                <Image
                  src={option4 || ''}
                  className="thumbnail"
                  height={60}
                  alt="asset"
                />
              </>
            }
          >
            <h5 style={{ textAlign: 'center', marginBottom: '0px' }}>
              Change Option
            </h5>
          </Card>
        </Col>
      </Row>
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
            defaultValue={answerIndex}
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
          if (optionIndex === 1) {
            //@ts-ignore

            setOption1(imageAsset?.url);
          } else if (optionIndex === 2) {
            //@ts-ignore

            setOption2(imageAsset?.url);
          } else if (optionIndex === 3) {
            //@ts-ignore

            setOption3(imageAsset?.url);
          } else if (optionIndex === 4) {
            //@ts-ignore

            setOption4(imageAsset?.url);
          }
          //@ts-ignore

          setImageUrls(imageAsset?.url, optionIndex);
          toggleImageGallery(false);
        }}
        onCancel={() => {
          toggleImageGallery(false);
        }}
      >
        <Gallery
          tab="image"
          //@ts-ignore

          isOpen={imageGallery}
          onSelect={(asset: React.SetStateAction<{}>) => {
            setImageAsset(asset);
          }}
          value={option1 || option2 || option3 || option4}
          page={page}
          setPage={(e: React.SetStateAction<number>) => setPage(e)}
        />
      </Modal>
      <Modal
        bodyStyle={{ height: '520px', overflowY: 'scroll' }}
        width={1344}
        title="Assets"
        visible={audioGallery}
        onOk={() => {
          setAudioReference(imageAsset?.url);
          changeAudioReference(imageAsset?.url);
          toggleAudioGallery(false);
        }}
        onCancel={() => {
          toggleAudioGallery(false);
        }}
      >
        <AudioGallery
          //@ts-ignore

          tab="audio"
          isOpen={audioGallery}
          onSelect={(asset: React.SetStateAction<{}>) => {
            setImageAsset(asset);
          }}
          value={audioReference}
        />
      </Modal>
    </>
  );
}

export default AddImageQuestionForm;
