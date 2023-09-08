/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable no-template-curly-in-string */
import React, { useEffect, useState } from 'react';
import {
  Card,
  Button,
  Input,
  Row,
  Col,
  Modal,
  Radio,
  Select,
  Form,
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import ReactPlayer from 'react-player';
import { weeksArray } from '@/constants';
import { Gallery } from './Gallery';
import Image from 'next/image';

const { Option } = Select;

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

function VideoForm(props: {
  closeForm?: any;
  selectedVideo?: any;
  addNewVideo?: any;
  mode?: any;
  updateOneVideo?: any;
}) {
  const { selectedVideo, addNewVideo, mode, updateOneVideo } = props;

  const [videoUrl, setVideoUrl] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [week, setWeek] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const [tab, setTab] = useState('');
  const [actionLabel, setActionLabel] = useState('');
  const [actionType, setActionType] = useState('');
  const [actionApp, setActionApp] = useState('');
  const [actionLink, setActionLink] = useState('');
  const [videoAction, setVideoAction] = useState(false);

  useEffect(() => {
    if (selectedVideo) {
      setThumbnail(selectedVideo.thumbnail);
      setWeek(selectedVideo.week);
      setAgeGroup(selectedVideo.ageGroup);
      setTab(selectedVideo.tab);
      setVideoUrl(selectedVideo.videoUrl);
      if (
        selectedVideo.videoAction &&
        selectedVideo.actionApp &&
        selectedVideo.actionLabel &&
        selectedVideo.actionLink &&
        selectedVideo.actionType
      ) {
        setVideoAction(selectedVideo.videoAction);
        setActionLabel(selectedVideo.actionLabel);
        setActionType(selectedVideo.actionType);
        setActionApp(selectedVideo.actionApp);
        setActionLink(selectedVideo.actionLink);
      }
    }
  }, [selectedVideo]);

  const [asset, setAsset] = useState({});
  const [imageAsset, setImageAsset] = useState({});
  const [visible, toggleGallery] = useState(false);
  const [imageGallery, toggelImageGalery] = useState(false);
  const [page, setPage] = useState(1);

  const ageGroupArray = ['3-5', '5-6', '6-7', '7-8'];

  const handleVideoNameChange = () => {};
  const handleDescriptionChange = () => {};
  const handleWeekChange = (week: React.SetStateAction<string>) => {
    setWeek(week);
  };

  const handleAgeGroupChange = (ageGrp: React.SetStateAction<string>) => {
    setAgeGroup(ageGrp);
  };

  const handleTabChange = (tab: React.SetStateAction<string>) => {
    setTab(tab);
  };
  const handleActionLabelChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setActionApp(event.target.value);
  };

  const handleActionTypeChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setActionType(event.target.value);
  };

  const handleActionAppChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setActionApp(event.target.value);
  };

  const handleActionLinkChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setActionLink(event.target.value);
  };

  const onFinish = (values: {
    thumbnail: string;
    videoUrl: string;
    videoAction: boolean;
    actionLabel: string;
    actionType: string;
    actionApp: string;
    actionLink: string;
  }) => {
    values.thumbnail = thumbnail;
    values.videoUrl = videoUrl;
    if (!values.videoAction) {
      values.videoAction = false;
      values.actionLabel = actionLabel;
      values.actionType = actionType;
      values.actionApp = actionApp;
      values.actionLink = actionLink;
    }

    if (mode === 'Create') {
      addNewVideo({
        variables: {
          video: values,
        },
      });
    } else if (mode === 'Edit') {
      updateOneVideo({
        variables: {
          id: selectedVideo._id,
          video: values,
        },
      });
    }
    props.closeForm();
  };

  return (
    <>
      <Form
        layout="vertical"
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
        initialValues={{
          videoName: selectedVideo ? selectedVideo.videoName : '',
          videoDescription: selectedVideo ? selectedVideo.videoDescription : '',
          week: selectedVideo ? selectedVideo.week : '',
          ageGroup: selectedVideo ? selectedVideo.ageGroup : '',
          tab: selectedVideo ? selectedVideo.tab : '',
          videoAction: selectedVideo ? selectedVideo.videoAction : '',
          actionLabel: selectedVideo ? selectedVideo.actionLabel : '',
          actionType: selectedVideo ? selectedVideo.actionType : '',
          actionApp: selectedVideo ? selectedVideo.actionApp : '',
          actionLink: selectedVideo ? selectedVideo.actionLink : '',
        }}
      >
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              name={['videoName']}
              label="Video Name"
              rules={[{ required: true }]}
            >
              <Input
                placeholder="Video Name"
                onChange={handleVideoNameChange}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name={['videoDescription']}
              label="Video Description"
              rules={[{ required: true }]}
            >
              <TextArea
                placeholder="Describe the video in few words..."
                onChange={handleDescriptionChange}
                maxLength={1000}
              />
            </Form.Item>
          </Col>

          <Col span={11}>
            <Form.Item label="Video Url" name={['videoUrl']}>
              <Card
                hoverable
                className="asset-card"
                bodyStyle={{ padding: '0px' }}
                style={{
                  border: 'none',
                  height: 200,
                  width: 200,
                  margin: 0,
                }}
                onClick={() => {
                  toggleGallery(true);
                }}
              >
                {videoUrl ? (
                  <ReactPlayer
                    className="thumbnail"
                    url={videoUrl}
                    controls
                    width="100%"
                    file={{
                      forceHLS: true,
                      hlsOptions: { autoStartLoad: false },
                    }}
                  />
                ) : (
                  <Image
                    src={'PLACEHOLDER_IMAGE'}
                    className="thumbnail"
                    height={100}
                    alt="asset"
                  />
                )}
              </Card>
            </Form.Item>
          </Col>

          <Col span={11} offset={1}>
            <Form.Item name={['thumbnail']} label="Video Thumbnail">
              <Card
                hoverable
                className="asset-card"
                bodyStyle={{ padding: '0px' }}
                style={{ height: 200, width: 200, margin: 0 }}
                onClick={() => {
                  toggelImageGalery(true);
                }}
                cover={
                  <>
                    <Image
                      src={thumbnail || 'DEFAULT_CARD_IMAGE'}
                      className="thumbnail"
                      height={100}
                      alt="asset"
                    />
                  </>
                }
              />
            </Form.Item>
          </Col>

          <Col span={11}>
            <Form.Item
              name={['week']}
              label="Week"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Week"
                allowClear
                onChange={handleWeekChange}
                defaultValue={week}
              >
                {weeksArray.map((week: React.Key | null | undefined) => (
                  <Option value={week} key={week}>{`Week ${week}`}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={11} offset={1}>
            <Form.Item
              name={['ageGroup']}
              label="Age Group"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Age Group"
                allowClear
                onChange={handleAgeGroupChange}
                defaultValue={ageGroup}
              >
                {ageGroupArray.map((ageGrp) => (
                  <Option
                    value={ageGrp}
                    key={ageGrp}
                  >{`Age Group ${ageGrp}`}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item name={['tab']} label="Tab" rules={[{ required: true }]}>
              <Select
                placeholder="Tab"
                allowClear
                onChange={handleTabChange}
                defaultValue={tab}
              >
                <option value="Child">Child videos</option>
                <option value="Parent">Parent videos</option>
                <option value="View and do">View and do videos</option>
                <option value="Testimonial">Testimonial videos</option>
              </Select>
            </Form.Item>
          </Col>
          {videoAction ? (
            <>
              <Col span={24}>
                <Form.Item
                  name={['actionLabel']}
                  label="Action Label"
                  rules={[{ required: true }]}
                >
                  <Input
                    placeholder="Action Label"
                    onChange={handleActionLabelChange}
                    defaultValue={actionLabel}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name={['actionType']}
                  label="Action Type"
                  rules={[{ required: true }]}
                >
                  <Radio.Group
                    //@ts-ignore

                    onChange={handleActionTypeChange}
                    defaultValue={actionType}
                  >
                    <Radio value="deeplink">Deeplinking</Radio>
                    <Radio value="routing">In-App Routing</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name={['actionApp']}
                  label="Action App"
                  rules={[{ required: true }]}
                >
                  <Input
                    placeholder="Action App"
                    onChange={handleActionAppChange}
                    defaultValue={actionApp}
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  name={['actionLink']}
                  label="Play Store Link"
                  rules={[{ required: true }]}
                >
                  <Input
                    placeholder="Action App"
                    onChange={handleActionLinkChange}
                    defaultValue={actionLink}
                  />
                </Form.Item>
              </Col>
            </>
          ) : null}

          <Col span={24} className="mt-5">
            <Form.Item className="items-end">
              <Button htmlType="submit" style={{ marginRight: 10 }}>
                Submit
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <Modal
        bodyStyle={{ height: '520px', overflowY: 'scroll' }}
        width={1344}
        title="Assets"
        visible={visible}
        onOk={() => {
          //@ts-ignore

          setVideoUrl(asset?.url || '');
          toggleGallery(false);
        }}
        onCancel={() => {
          setVideoUrl('');
          toggleGallery(false);
        }}
      >
        <Gallery
          page={page}
          setPage={(e: React.SetStateAction<number>) => setPage(e)}
          //@ts-ignore

          noUploader
          tab="video"
          isOpen={visible}
          onSelect={(asset: React.SetStateAction<{}>) => {
            setAsset(asset);
          }}
          value={videoUrl}
        />
      </Modal>
      <Modal
        bodyStyle={{ height: '520px', overflowY: 'scroll' }}
        width={1344}
        title="Assets"
        visible={imageGallery}
        onOk={() => {
          //@ts-ignore

          setThumbnail(imageAsset?.url ?? '');
          toggelImageGalery(false);
        }}
        onCancel={() => {
          setThumbnail('');
          toggelImageGalery(false);
        }}
      >
        <Gallery
          tab="image"
          //@ts-ignore

          isOpen={visible}
          onSelect={(asset: React.SetStateAction<{}>) => {
            setImageAsset(asset);
          }}
          value={thumbnail}
          page={page}
          setPage={(e: React.SetStateAction<number>) => setPage(e)}
        />
      </Modal>
    </>
  );
}

export default VideoForm;
